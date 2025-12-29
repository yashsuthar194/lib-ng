/**
 * Checkbox Component
 *
 * @description
 * A standard checkbox component.
 * Implements ControlValueAccessor for full Angular Forms integration.
 * For toggle switches, use the SwitchComponent instead.
 *
 * @example
 * ```html
 * <!-- Basic checkbox -->
 * <lib-checkbox [(ngModel)]="accepted">I accept the terms</lib-checkbox>
 *
 * <!-- With FormControl -->
 * <lib-checkbox [formControl]="termsControl">Terms</lib-checkbox>
 *
 * <!-- Indeterminate (for Select All) -->
 * <lib-checkbox [indeterminate]="someSelected">Select All</lib-checkbox>
 *
 * <!-- With ripple -->
 * <lib-checkbox [ripple]="true">With Ripple</lib-checkbox>
 * ```
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  forwardRef,
  ElementRef,
  inject,
  Renderer2,
  PLATFORM_ID,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CheckboxSize,
  LabelPosition,
  CheckboxChangeEvent,
  DEFAULT_CHECKBOX_CONFIG,
} from '../types/checkbox.types';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-checkbox',
    // Size classes
    '[class.lib-checkbox--sm]': 'size() === "sm"',
    '[class.lib-checkbox--md]': 'size() === "md"',
    '[class.lib-checkbox--lg]': 'size() === "lg"',
    // State classes
    '[class.lib-checkbox--checked]': 'isChecked()',
    '[class.lib-checkbox--indeterminate]': 'indeterminate()',
    '[class.lib-checkbox--disabled]': 'isDisabled()',
    '[class.lib-checkbox--label-before]': 'labelPosition() === "before"',
    // ARIA
    '[attr.role]': '"checkbox"',
    '[attr.aria-checked]': 'getAriaChecked()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    // Events
    '(click)': 'toggle($event)',
    '(keydown.space)': 'onSpace($event)',
    '(blur)': 'markAsTouched()',
  },
})
export class CheckboxComponent implements ControlValueAccessor, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  // ============================================
  // Inputs
  // ============================================

  /** Value associated with this checkbox */
  readonly value = input<unknown>();

  /** Size of the checkbox */
  readonly size = input<CheckboxSize>(DEFAULT_CHECKBOX_CONFIG.size);

  /** Position of the label relative to the box */
  readonly labelPosition = input<LabelPosition>(DEFAULT_CHECKBOX_CONFIG.labelPosition);

  /** External checked state (for controlled mode) */
  readonly checked = input<boolean>(DEFAULT_CHECKBOX_CONFIG.checked);

  /** Indeterminate state (for parent "Select All" checkboxes) */
  readonly indeterminate = input<boolean>(DEFAULT_CHECKBOX_CONFIG.indeterminate);

  /** Disabled state */
  readonly disabled = input<boolean>(DEFAULT_CHECKBOX_CONFIG.disabled);

  /** Required validation */
  readonly required = input<boolean>(DEFAULT_CHECKBOX_CONFIG.required);

  /** Enable ripple effect (opt-in) */
  readonly ripple = input<boolean>(DEFAULT_CHECKBOX_CONFIG.ripple);

  // ============================================
  // Outputs
  // ============================================

  /** Emits when checked state changes */
  readonly checkedChange = output<boolean>();

  /** Emits detailed change event (use this for full event details) */
  readonly changed = output<CheckboxChangeEvent>();

  // ============================================
  // Internal State
  // ============================================

  private readonly internalChecked = signal(false);
  private readonly internalDisabled = signal(false);

  /**
   * Track ripple elements for cleanup - prevents memory leaks
   */
  private readonly rippleCleanups: Array<{ element: HTMLElement; timeoutId: number | undefined }> =
    [];

  // ============================================
  // Computed
  // ============================================

  /** Whether the checkbox is checked */
  readonly isChecked = computed(() => this.checked() || this.internalChecked());

  /** Whether the checkbox is disabled */
  readonly isDisabled = computed(() => this.disabled() || this.internalDisabled());

  // ============================================
  // CVA Callbacks
  // ============================================

  private onChange?: (value: boolean) => void;
  private onTouched?: () => void;

  // ============================================
  // Lifecycle
  // ============================================

  ngOnDestroy(): void {
    // MEMORY LEAK PREVENTION: Clean up all ripple elements and timeouts
    this.rippleCleanups.forEach(({ element, timeoutId }) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      element.remove();
    });
    this.rippleCleanups.length = 0;
  }

  // ============================================
  // Public Methods
  // ============================================

  /** Get ARIA checked value */
  getAriaChecked(): string {
    if (this.indeterminate()) return 'mixed';
    return this.isChecked() ? 'true' : 'false';
  }

  /** Toggle the checkbox state */
  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled()) return;

    const newValue = !this.isChecked();
    this.internalChecked.set(newValue);

    // Emit events
    this.onChange?.(newValue);
    this.checkedChange.emit(newValue);
    this.changed.emit({
      checked: newValue,
      value: this.value(),
      source: this,
    });

    // Create ripple if enabled
    if (this.ripple() && isPlatformBrowser(this.platformId)) {
      this.createRipple(event as MouseEvent);
    }
  }

  /** Handle space key */
  onSpace(event: KeyboardEvent | Event): void {
    event.preventDefault();
    this.toggle(event);
  }

  /** Mark as touched for form validation */
  markAsTouched(): void {
    this.onTouched?.();
  }

  /** Focus the checkbox */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  // ============================================
  // ControlValueAccessor
  // ============================================

  writeValue(value: boolean): void {
    this.internalChecked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  // ============================================
  // Private Methods
  // ============================================

  /** Create ripple effect at click position */
  private createRipple(event: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const host = this.elementRef.nativeElement;
      const box = host.querySelector('.lib-checkbox__box') as HTMLElement;
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = (event.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
      const y = (event.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

      const ripple = this.renderer.createElement('span') as HTMLElement;
      this.renderer.addClass(ripple, 'lib-checkbox__ripple');
      this.renderer.setStyle(ripple, 'width', `${size}px`);
      this.renderer.setStyle(ripple, 'height', `${size}px`);
      this.renderer.setStyle(ripple, 'left', `${x}px`);
      this.renderer.setStyle(ripple, 'top', `${y}px`);

      this.renderer.appendChild(box, ripple);

      const cleanupEntry: { element: HTMLElement; timeoutId: number | undefined } = {
        element: ripple,
        timeoutId: undefined,
      };

      cleanupEntry.timeoutId = window.setTimeout(() => {
        ripple.remove();
        const index = this.rippleCleanups.indexOf(cleanupEntry);
        if (index > -1) {
          this.rippleCleanups.splice(index, 1);
        }
      }, 400);

      this.rippleCleanups.push(cleanupEntry);
    });
  }
}
