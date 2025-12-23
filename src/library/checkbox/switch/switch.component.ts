/**
 * Switch Component
 * 
 * @description
 * A toggle switch component for on/off settings.
 * Implements ControlValueAccessor for Angular Forms integration.
 * Supports optional icons for checked/unchecked states.
 * 
 * @example
 * ```html
 * <!-- Basic switch -->
 * <lib-switch [(ngModel)]="darkMode">Dark Mode</lib-switch>
 * 
 * <!-- With dynamic labels -->
 * <lib-switch 
 *   [(ngModel)]="enabled"
 *   checkedLabel="ON"
 *   uncheckedLabel="OFF">
 * </lib-switch>
 * 
 * <!-- With icons -->
 * <lib-switch [(ngModel)]="theme">
 *   <ng-template libSwitchCheckedIcon>🌙</ng-template>
 *   <ng-template libSwitchUncheckedIcon>☀️</ng-template>
 *   Theme
 * </lib-switch>
 * 
 * <!-- With FormControl -->
 * <lib-switch [formControl]="notificationsControl">Notifications</lib-switch>
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
  ContentChild,
  TemplateRef,
  Directive,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** Switch sizes */
export type SwitchSize = 'sm' | 'md' | 'lg';

/** Label position */
export type SwitchLabelPosition = 'before' | 'after';

/** Switch change event */
export interface SwitchChangeEvent {
  checked: boolean;
  source: unknown;
}

// ============================================
// Icon Directive Markers
// ============================================

/**
 * Directive marker for the checked state icon template.
 * Use with ng-template to provide custom icon content.
 * 
 * @example
 * ```html
 * <lib-switch>
 *   <ng-template libSwitchCheckedIcon>🌙</ng-template>
 * </lib-switch>
 * ```
 */
@Directive({ 
  selector: '[libSwitchCheckedIcon]', 
  standalone: true 
})
export class SwitchCheckedIconDirective {}

/**
 * Directive marker for the unchecked state icon template.
 * Use with ng-template to provide custom icon content.
 * 
 * @example
 * ```html
 * <lib-switch>
 *   <ng-template libSwitchUncheckedIcon>☀️</ng-template>
 * </lib-switch>
 * ```
 */
@Directive({ 
  selector: '[libSwitchUncheckedIcon]', 
  standalone: true 
})
export class SwitchUncheckedIconDirective {}

@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  host: {
    'class': 'lib-switch',
    '[class.lib-switch--sm]': 'size() === "sm"',
    '[class.lib-switch--md]': 'size() === "md"',
    '[class.lib-switch--lg]': 'size() === "lg"',
    '[class.lib-switch--checked]': 'isChecked()',
    '[class.lib-switch--disabled]': 'isDisabled()',
    '[class.lib-switch--label-before]': 'labelPosition() === "before"',
    '[class.lib-switch--has-icons]': 'hasCustomIcons()',
    '[attr.role]': '"switch"',
    '[attr.aria-checked]': 'isChecked() ? "true" : "false"',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'toggle($event)',
    '(keydown.space)': 'onSpace($event)',
    '(blur)': 'markAsTouched()',
  },
})
export class SwitchComponent implements ControlValueAccessor, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  // ============================================
  // Inputs
  // ============================================

  /** Size of the switch */
  readonly size = input<SwitchSize>('md');

  /** Position of the label */
  readonly labelPosition = input<SwitchLabelPosition>('after');

  /** External checked state */
  readonly checked = input<boolean>(false);

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  /** Required validation */
  readonly required = input<boolean>(false);

  /** Enable ripple effect (opt-in) */
  readonly ripple = input<boolean>(false);

  /** Label for checked state */
  readonly checkedLabel = input<string>('');

  /** Label for unchecked state */
  readonly uncheckedLabel = input<string>('');

  // ============================================
  // Content Children (Icon Templates)
  // ============================================

  /** Template for the checked state icon */
  @ContentChild(SwitchCheckedIconDirective, { read: TemplateRef })
  checkedIconTemplate?: TemplateRef<unknown>;

  /** Template for the unchecked state icon */
  @ContentChild(SwitchUncheckedIconDirective, { read: TemplateRef })
  uncheckedIconTemplate?: TemplateRef<unknown>;

  // ============================================
  // Outputs
  // ============================================

  /** Emits when checked state changes */
  readonly checkedChange = output<boolean>();

  /** Emits detailed change event */
  readonly change = output<SwitchChangeEvent>();

  // ============================================
  // Internal State
  // ============================================

  private readonly internalChecked = signal(false);
  private readonly internalDisabled = signal(false);

  /** 
   * Track ripple elements for cleanup - prevents memory leaks
   */
  private readonly rippleCleanups: Array<{ element: HTMLElement; timeoutId: number | undefined }> = [];

  // ============================================
  // Computed
  // ============================================

  readonly isChecked = computed(() => this.checked() || this.internalChecked());
  readonly isDisabled = computed(() => this.disabled() || this.internalDisabled());

  readonly currentLabel = computed(() => {
    if (this.isChecked() && this.checkedLabel()) {
      return this.checkedLabel();
    }
    if (!this.isChecked() && this.uncheckedLabel()) {
      return this.uncheckedLabel();
    }
    return '';
  });

  /** Whether custom icons are provided */
  hasCustomIcons(): boolean {
    return !!(this.checkedIconTemplate || this.uncheckedIconTemplate);
  }

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

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled()) return;

    const newValue = !this.isChecked();
    this.internalChecked.set(newValue);
    
    this.onChange?.(newValue);
    this.checkedChange.emit(newValue);
    this.change.emit({
      checked: newValue,
      source: this,
    });

    if (this.ripple() && isPlatformBrowser(this.platformId)) {
      this.createRipple(event as MouseEvent);
    }
  }

  onSpace(event: KeyboardEvent): void {
    event.preventDefault();
    this.toggle(event);
  }

  markAsTouched(): void {
    this.onTouched?.();
  }

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

  private createRipple(event: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const host = this.elementRef.nativeElement;
      const track = host.querySelector('.lib-switch__track') as HTMLElement;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = (event.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
      const y = (event.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

      const ripple = this.renderer.createElement('span') as HTMLElement;
      this.renderer.addClass(ripple, 'lib-switch__ripple');
      this.renderer.setStyle(ripple, 'width', `${size}px`);
      this.renderer.setStyle(ripple, 'height', `${size}px`);
      this.renderer.setStyle(ripple, 'left', `${x}px`);
      this.renderer.setStyle(ripple, 'top', `${y}px`);

      this.renderer.appendChild(track, ripple);

      const cleanupEntry: { element: HTMLElement; timeoutId: number | undefined } = { 
        element: ripple, 
        timeoutId: undefined 
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
