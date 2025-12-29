import {
  Component,
  input,
  signal,
  computed,
  contentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
} from '@angular/core';
import { InputDirective } from '../core/input.directive';

/** Counter for unique IDs */
let nextId = 0;

/**
 * Form Field Wrapper Component
 *
 * Provides label, hint, error display, and prefix/suffix slots.
 *
 * @example
 * ```html
 * <lib-form-field label="Email" required [error]="emailError()">
 *   <svg libPrefix><!-- icon --></svg>
 *   <input libInput type="email" formControlName="email" />
 * </lib-form-field>
 * ```
 */
@Component({
  selector: 'lib-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-form-field',
    '[class.lib-form-field--focused]': 'inputDirective()?.isFocused()',
    '[class.lib-form-field--invalid]': 'inputDirective()?.isInvalid()',
    '[class.lib-form-field--disabled]': 'inputDirective()?.isDisabled()',
    '[class.lib-form-field--has-value]': 'inputDirective()?.hasValue()',
    '[class.lib-form-field--floating-label]': 'floatingLabel()',
    '[class.lib-form-field--label-active]': 'isLabelActive()',
  },
})
export class FormFieldComponent implements AfterContentInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // ============================================
  // Inputs
  // ============================================

  /** Label text */
  readonly label = input<string>();

  /** Whether field is required (shows asterisk) */
  readonly required = input(false);

  /** Hint text displayed below input */
  readonly hint = input<string>();

  /** Error message (overrides hint when invalid) */
  readonly error = input<string>();

  /** Use floating label style (default: false for standard labels) */
  readonly floatingLabel = input(false);

  /** Character counter (for textarea) */
  readonly showCharCount = input(false);

  /** Max character count (for counter) */
  readonly maxLength = input<number>();

  // ============================================
  // Content Queries
  // ============================================

  /** The input directive inside this wrapper */
  readonly inputDirective = contentChild(InputDirective);

  // ============================================
  // State
  // ============================================

  private readonly _inputId = signal<string>('');
  private readonly _hintId = signal<string>('');
  private readonly _errorId = signal<string>('');

  readonly inputId = computed(() => this._inputId() || `lib-input-${nextId++}`);

  readonly hintId = computed(() => this._hintId() || `lib-hint-${this.inputId()}`);

  readonly errorId = computed(() => this._errorId() || `lib-error-${this.inputId()}`);

  // ============================================
  // Computed
  // ============================================

  /** Whether floating label should be in active (raised) position */
  readonly isLabelActive = computed(() => {
    const directive = this.inputDirective();
    if (!directive) return false;
    return directive.isFocused() || directive.hasValue();
  });

  /**
   * Current character count - uses reactive signal for real-time updates
   * The currentValue signal updates on every input event
   */
  readonly charCount = computed(() => {
    const directive = this.inputDirective();
    if (!directive) return 0;
    // Using reactive currentValue signal instead of non-reactive getValue()
    return directive.currentValue()?.length ?? 0;
  });

  // ============================================
  // Lifecycle
  // ============================================

  ngAfterContentInit(): void {
    const directive = this.inputDirective();
    if (directive) {
      // Get ID from directive if provided
      const id = directive.id();
      if (id) {
        this._inputId.set(id);
      }

      // Set aria-describedby for accessibility
      // This connects input to hint/error messages
      this.updateAriaDescribedBy();
    }
  }

  // ============================================
  // Private Methods
  // ============================================

  private updateAriaDescribedBy(): void {
    // Will be connected when we implement full aria support
    // For now, the input's ariaDescribedBy input can be used manually
  }
}
