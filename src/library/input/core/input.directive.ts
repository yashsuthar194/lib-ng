import {
  Directive,
  ElementRef,
  inject,
  input,
  output,
  signal,
  computed,
  effect,
  HostListener,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
  DestroyRef,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  InputSize, 
  InputVariant, 
  InputAutocomplete,
  DEFAULT_INPUT_CONFIG 
} from '../types/input.types';

/**
 * Input Directive - Enhances native input elements with styling and state management.
 * 
 * Works standalone or with lib-form-field wrapper.
 * Handles edge cases: autofill, IME composition, form reset, SSR.
 * 
 * @example
 * ```html
 * <!-- Standalone -->
 * <input libInput type="search" size="md" variant="filled" />
 * 
 * <!-- With form-field wrapper -->
 * <lib-form-field label="Email">
 *   <input libInput type="email" formControlName="email" />
 * </lib-form-field>
 * ```
 */
@Directive({
  selector: 'input[libInput], textarea[libInput]',
  standalone: true,
  exportAs: 'libInput',
  host: {
    'class': 'lib-input',
    '[class.lib-input--sm]': 'size() === "sm"',
    '[class.lib-input--md]': 'size() === "md"',
    '[class.lib-input--lg]': 'size() === "lg"',
    '[class.lib-input--outline]': 'variant() === "outline"',
    '[class.lib-input--filled]': 'variant() === "filled"',
    '[class.lib-input--underline]': 'variant() === "underline"',
    '[class.lib-input--focused]': 'isFocused()',
    '[class.lib-input--disabled]': 'isDisabled()',
    '[class.lib-input--invalid]': 'isInvalid()',
    '[class.lib-input--readonly]': 'readonly()',
    '[class.lib-input--has-value]': 'hasValue()',
    '[class.lib-input--auto-resize]': 'autoResize()',
    '[attr.aria-invalid]': 'isInvalid() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
    '[attr.data-lpignore]': 'ignorePasswordManagers() ? "true" : null',
    '[attr.data-auto-resize]': 'autoResize() ? "true" : null',
  },
})
export class InputDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  // ============================================
  // Inputs
  // ============================================
  
  /** Size variant */
  readonly size = input<InputSize>(DEFAULT_INPUT_CONFIG.size);
  
  /** Style variant */
  readonly variant = input<InputVariant>(DEFAULT_INPUT_CONFIG.variant);
  
  /** Readonly state */
  readonly readonly = input(false);
  
  /** ID for associating with label */
  readonly id = input<string>();
  
  /** ARIA describedby for accessibility */
  readonly ariaDescribedBy = input<string>();
  
  /** Autocomplete attribute for security */
  readonly autocomplete = input<InputAutocomplete>();
  
  /** Ignore password managers (for sensitive non-password fields) */
  readonly ignorePasswordManagers = input(false);
  
  /** Debounce time for valueChange output (ms) */
  readonly debounce = input(DEFAULT_INPUT_CONFIG.debounce);
  
  /** Enable auto-resize for textarea elements - expands as content grows */
  readonly autoResize = input(false);
  
  /** Minimum rows for auto-resize textarea (default: 2) */
  readonly minRows = input(2);
  
  /** Maximum rows for auto-resize textarea (optional - unlimited if not set) */
  readonly maxRows = input<number | undefined>(undefined);

  // ============================================
  // Outputs
  // ============================================
  
  /** Debounced value change event */
  readonly valueChange = output<string>();
  
  /** Focus event */
  readonly inputFocus = output<FocusEvent>();
  
  /** Blur event */
  readonly inputBlur = output<FocusEvent>();

  // ============================================
  // State Signals
  // ============================================
  
  /** Whether input is currently focused */
  readonly isFocused = signal(false);
  
  /** Whether input has a value */
  readonly hasValue = signal(false);
  
  /** 
   * Current value as a reactive signal - enables reactive character counting
   * Updated on every input event for real-time reactivity
   */
  readonly currentValue = signal('');
  
  /** Internal invalid state signal */
  private readonly _isInvalid = signal(false);
  
  /** Readonly invalid state */
  readonly isInvalid = this._isInvalid.asReadonly();

  // ============================================
  // Computed
  // ============================================
  
  /** Disabled state from form control or attribute */
  readonly isDisabled = computed(() => {
    return this.ngControl?.disabled ?? 
           this.elementRef.nativeElement.disabled;
  });

  // ============================================
  // Internal State
  // ============================================
  
  private isComposing = false;
  private debounceTimer?: ReturnType<typeof setTimeout>;
  private formResetListener?: () => void;
  private mutationObserver?: MutationObserver;
  private autofillListener?: (event: AnimationEvent) => void;
  
  /** Cached line height for auto-resize calculations (performance optimization) */
  private cachedLineHeight?: number;

  // ============================================
  // Validation State Effect
  // ============================================
  
  constructor() {
    // Watch NgControl status changes reactively
    effect(() => {
      const control = this.ngControl?.control;
      if (control) {
        untracked(() => {
          this._isInvalid.set(control.invalid && control.touched);
        });
      }
    });
  }

  // ============================================
  // Lifecycle Hooks
  // ============================================
  
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Initial value check and sync currentValue signal
    const initialValue = this.elementRef.nativeElement.value || '';
    this.currentValue.set(initialValue);
    this.updateHasValue();
    
    // Watch form control status changes
    this.ngControl?.statusChanges?.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.updateValidationState();
    });
    
    // Setup autofill detection
    this.setupAutofillDetection();
    
    // Setup disabled attribute observer
    this.setupDisabledObserver();
    
    // Fallback: re-check value after short delay (for autofill)
    setTimeout(() => {
      this.currentValue.set(this.elementRef.nativeElement.value || '');
      this.updateHasValue();
    }, 100);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Setup form reset listener
    this.setupFormResetListener();
    
    // Initial auto-resize for pre-populated textareas
    this.adjustTextareaHeight();
  }

  ngOnDestroy(): void {
    clearTimeout(this.debounceTimer);
    this.mutationObserver?.disconnect();
    
    // Cleanup autofill listener
    if (this.autofillListener) {
      this.elementRef.nativeElement.removeEventListener(
        'animationstart', 
        this.autofillListener as EventListener
      );
    }
    
    // Cleanup form reset listener
    const form = this.elementRef.nativeElement.closest('form');
    if (form && this.formResetListener) {
      form.removeEventListener('reset', this.formResetListener);
    }
  }

  // ============================================
  // Host Listeners
  // ============================================
  
  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.inputBlur.emit(event);
    this.updateValidationState();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    // Skip updates during IME composition
    if (this.isComposing) return;
    
    // Update reactive value signal for character counting
    this.currentValue.set(value);
    this.updateHasValue();
    this.emitValueChange(value);
    
    // Trigger auto-resize for textareas
    this.adjustTextareaHeight();
  }

  @HostListener('change')
  onChange(): void {
    // Fallback for programmatic value changes
    const value = this.elementRef.nativeElement.value;
    this.currentValue.set(value);
    this.updateHasValue();
    this.adjustTextareaHeight();
  }

  @HostListener('compositionstart')
  onCompositionStart(): void {
    this.isComposing = true;
  }

  @HostListener('compositionend', ['$event.target.value'])
  onCompositionEnd(value: string): void {
    this.isComposing = false;
    this.currentValue.set(value);
    this.updateHasValue();
    this.emitValueChange(value);
    this.adjustTextareaHeight();
  }

  // ============================================
  // Public Methods
  // ============================================
  
  /** Focus the input programmatically */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /** Blur the input programmatically */
  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  /** Select all text */
  selectAll(): void {
    this.elementRef.nativeElement.select();
  }

  /** Set value programmatically (triggers events properly) */
  setValue(value: string): void {
    this.elementRef.nativeElement.value = value;
    this.updateHasValue();
    
    // Dispatch event for form control
    this.elementRef.nativeElement.dispatchEvent(
      new Event('input', { bubbles: true })
    );
  }

  /** Get current value */
  getValue(): string {
    return this.elementRef.nativeElement.value;
  }

  /** Get native element reference */
  get nativeElement(): HTMLInputElement | HTMLTextAreaElement {
    return this.elementRef.nativeElement;
  }

  // ============================================
  // Private Methods
  // ============================================
  
  private updateHasValue(): void {
    const value = this.elementRef.nativeElement.value;
    this.hasValue.set(!!value && value.length > 0);
  }

  private updateValidationState(): void {
    const control = this.ngControl?.control;
    if (control) {
      this._isInvalid.set(control.invalid && control.touched);
    }
  }

  private emitValueChange(value: string): void {
    const debounceMs = this.debounce();
    
    if (debounceMs > 0) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.valueChange.emit(value);
      }, debounceMs);
    } else {
      this.valueChange.emit(value);
    }
  }

  private setupAutofillDetection(): void {
    this.autofillListener = (event: AnimationEvent) => {
      if (event.animationName === 'libInputAutoFillStart') {
        this.ngZone.run(() => this.hasValue.set(true));
      } else if (event.animationName === 'libInputAutoFillEnd') {
        this.ngZone.run(() => this.updateHasValue());
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener(
        'animationstart', 
        this.autofillListener as EventListener
      );
    });
  }

  private setupFormResetListener(): void {
    const form = this.elementRef.nativeElement.closest('form');
    if (form) {
      this.formResetListener = () => {
        // Use setTimeout to run after form reset completes
        setTimeout(() => {
          this.currentValue.set('');
          this.hasValue.set(false);
          this.isFocused.set(false);
          this._isInvalid.set(false);
          this.adjustTextareaHeight();
        });
      };
      form.addEventListener('reset', this.formResetListener);
    }
  }

  private setupDisabledObserver(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'disabled') {
          this.cdr.markForCheck();
        }
      }
    });
    
    this.mutationObserver.observe(this.elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['disabled']
    });
  }

  /**
   * Adjusts textarea height based on content for auto-resize feature.
   * Performance optimized with cached line height calculations.
   * 
   * Edge cases handled:
   * - Non-textarea elements (early return)
   * - autoResize disabled (early return)
   * - SSR (guard in caller via isPlatformBrowser)
   * - maxRows overflow (switches to scrollable)
   */
  private adjustTextareaHeight(): void {
    // Guard: only for textareas with autoResize enabled
    const element = this.elementRef.nativeElement;
    if (!(element instanceof HTMLTextAreaElement)) return;
    if (!this.autoResize()) return;
    
    // Run outside Angular zone for performance (no change detection during measurement)
    this.ngZone.runOutsideAngular(() => {
      // Get or calculate line height (cached for performance)
      if (!this.cachedLineHeight) {
        const computedStyle = getComputedStyle(element);
        const lineHeightValue = computedStyle.lineHeight;
        // Handle 'normal' line-height by using fontSize * 1.2
        if (lineHeightValue === 'normal') {
          this.cachedLineHeight = parseFloat(computedStyle.fontSize) * 1.2;
        } else {
          this.cachedLineHeight = parseFloat(lineHeightValue);
        }
        // Fallback to reasonable default
        if (!this.cachedLineHeight || isNaN(this.cachedLineHeight)) {
          this.cachedLineHeight = 20;
        }
      }
      
      const lineHeight = this.cachedLineHeight;
      const minRows = this.minRows();
      const maxRowsValue = this.maxRows();
      
      // Calculate height boundaries
      const paddingTop = parseFloat(getComputedStyle(element).paddingTop) || 0;
      const paddingBottom = parseFloat(getComputedStyle(element).paddingBottom) || 0;
      const verticalPadding = paddingTop + paddingBottom;
      
      const minHeight = (minRows * lineHeight) + verticalPadding;
      const maxHeight = maxRowsValue 
        ? (maxRowsValue * lineHeight) + verticalPadding 
        : Infinity;
      
      // Reset height to measure true scrollHeight
      element.style.height = 'auto';
      
      // Calculate new height within constraints
      const scrollHeight = element.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      
      // Apply new height
      element.style.height = `${newHeight}px`;
      
      // Handle overflow for max rows constraint
      element.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    });
  }
}
