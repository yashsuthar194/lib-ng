/**
 * Checkbox Group Component
 *
 * @description
 * Groups multiple checkboxes together for managing array values.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * @example
 * ```html
 * <!-- With options array -->
 * <lib-checkbox-group
 *   [(ngModel)]="selectedFruits"
 *   [options]="fruits"
 *   orientation="vertical">
 * </lib-checkbox-group>
 *
 * <!-- With content projection -->
 * <lib-checkbox-group [(ngModel)]="selected">
 *   <lib-checkbox value="apple">Apple</lib-checkbox>
 *   <lib-checkbox value="banana">Banana</lib-checkbox>
 * </lib-checkbox-group>
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
  contentChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxComponent } from '../core/checkbox.component';
import { CheckboxOption, CheckboxSize } from '../types/checkbox.types';

@Component({
  selector: 'lib-checkbox-group',
  standalone: true,
  imports: [CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="lib-checkbox-group"
      [class.lib-checkbox-group--horizontal]="orientation() === 'horizontal'"
      [class.lib-checkbox-group--vertical]="orientation() === 'vertical'"
      role="group"
      [attr.aria-label]="label()"
    >
      @if (options().length > 0) {
        @for (option of options(); track option.value) {
          <lib-checkbox
            [value]="option.value"
            [checked]="isSelected(option.value)"
            [disabled]="option.disabled || isDisabled()"
            [size]="size()"
            (checkedChange)="onOptionChange(option.value, $event)"
          >
            {{ option.label }}
          </lib-checkbox>
        }
      } @else {
        <ng-content></ng-content>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .lib-checkbox-group {
        display: flex;
        gap: var(--lib-spacing-3, 12px);
      }

      .lib-checkbox-group--vertical {
        flex-direction: column;
      }

      .lib-checkbox-group--horizontal {
        flex-direction: row;
        flex-wrap: wrap;
      }
    `,
  ],
  host: {
    class: 'lib-checkbox-group-host',
  },
})
export class CheckboxGroupComponent<T = unknown> implements ControlValueAccessor {
  // ============================================
  // Inputs
  // ============================================

  /** Options array for generating checkboxes */
  readonly options = input<CheckboxOption<T>[]>([]);

  /** Orientation of the group */
  readonly orientation = input<'horizontal' | 'vertical'>('vertical');

  /** Size for all checkboxes in the group */
  readonly size = input<CheckboxSize>('md');

  /** ARIA label for the group */
  readonly label = input<string>('');

  /** Disabled state for all checkboxes */
  readonly disabled = input<boolean>(false);

  // ============================================
  // Outputs
  // ============================================

  /** Emits when selection changes */
  readonly selectionChange = output<T[]>();

  // ============================================
  // Internal State
  // ============================================

  private readonly internalValue = signal<T[]>([]);
  private readonly internalDisabled = signal(false);

  /** Content-projected checkboxes */
  private readonly projectedCheckboxes = contentChildren(CheckboxComponent);

  // ============================================
  // Computed
  // ============================================

  readonly isDisabled = computed(() => this.disabled() || this.internalDisabled());

  // ============================================
  // CVA Callbacks
  // ============================================

  private onChange?: (value: T[]) => void;
  private onTouched?: () => void;

  // ============================================
  // Public Methods
  // ============================================

  /** Check if a value is selected */
  isSelected(value: T): boolean {
    return this.internalValue().includes(value);
  }

  /** Handle option checkbox change */
  onOptionChange(value: T, checked: boolean): void {
    const current = [...this.internalValue()];

    if (checked) {
      if (!current.includes(value)) {
        current.push(value);
      }
    } else {
      const index = current.indexOf(value);
      if (index > -1) {
        current.splice(index, 1);
      }
    }

    this.internalValue.set(current);
    this.onChange?.(current);
    this.selectionChange.emit(current);
    this.onTouched?.();
  }

  // ============================================
  // ControlValueAccessor
  // ============================================

  writeValue(value: T[]): void {
    this.internalValue.set(Array.isArray(value) ? value : []);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
