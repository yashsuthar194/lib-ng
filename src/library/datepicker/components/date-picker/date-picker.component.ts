/**
 * DatePicker Component
 *
 * Full-featured date picker with input field and calendar dropdown.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * Features:
 * - Manual date input with validation
 * - Calendar dropdown with smooth animations
 * - Inline mode (no dropdown)
 * - Smart date parsing (optional)
 * - Relative date display (optional)
 * - Full keyboard navigation
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <!-- Basic usage -->
 * <lib-date-picker [(value)]="date" />
 *
 * <!-- With FormControl -->
 * <lib-date-picker [formControl]="dateControl" />
 *
 * <!-- Inline calendar -->
 * <lib-date-picker mode="inline" />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  model,
  forwardRef,
  ElementRef,
  inject,
  DestroyRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type {
  DatePickerMode,
  DatePickerSize,
  WeekStart,
  CalendarLocale,
  DateSelectionEvent,
} from '../../types/datepicker.types';
import {
  DEFAULT_CALENDAR_LOCALE,
  DEFAULT_DATEPICKER_CONFIG,
} from '../../types/datepicker.types';
import {
  formatDate,
  parseDate,
  getRelativeDateLabel,
  isValidDate,
  clampDate,
} from '../../utils/date-utils';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-date-picker',
    '[class.lib-date-picker--open]': 'isOpen()',
    '[class.lib-date-picker--disabled]': 'disabled()',
    '[class.lib-date-picker--inline]': 'mode() === "inline"',
    '[class.lib-date-picker--sm]': 'size() === "sm"',
    '[class.lib-date-picker--lg]': 'size() === "lg"',
  },
  template: `
    @if (mode() !== 'inline') {
      <!-- Input Field -->
      <div class="lib-date-picker__input-wrapper">
        <input
          #inputEl
          type="text"
          class="lib-date-picker__input"
          [value]="displayValue()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-haspopup]="'dialog'"
          [attr.aria-describedby]="inputDescribedBy()"
          (click)="onInputClick($event)"
          (input)="onInputChange($event)"
          (blur)="onInputBlur()"
          (keydown)="onInputKeyDown($event)"
        />
        
        <button
          type="button"
          class="lib-date-picker__toggle"
          [disabled]="disabled()"
          [attr.aria-label]="isOpen() ? 'Close calendar' : 'Open calendar'"
          (click)="onToggleClick($event)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>

        @if (showClear() && value() && !disabled()) {
          <button
            type="button"
            class="lib-date-picker__clear"
            aria-label="Clear date"
            (click)="clearValue($event)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        }
      </div>

      <!-- Dropdown Calendar -->
      @if (isOpen()) {
        <div
          class="lib-date-picker__dropdown"
          role="dialog"
          aria-modal="true"
          aria-label="Choose date"
          (keydown.escape)="closeDropdown()"
        >
          <lib-calendar
            [selected]="value()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [disabledDates]="disabledDates()"
            [dateFilter]="dateFilter()"
            [weekStart]="weekStart()"
            [showWeekNumbers]="showWeekNumbers()"
            [showTodayButton]="showTodayButton()"
            [locale]="locale()"
            (dateSelect)="onDateSelect($event)"
          />
        </div>
      }
    } @else {
      <!-- Inline Calendar -->
      <lib-calendar
        [selected]="value()"
        [minDate]="minDate()"
        [maxDate]="maxDate()"
        [disabledDates]="disabledDates()"
        [dateFilter]="dateFilter()"
        [weekStart]="weekStart()"
        [showWeekNumbers]="showWeekNumbers()"
        [showTodayButton]="showTodayButton()"
        [locale]="locale()"
        (dateSelect)="onDateSelect($event)"
      />
    }

    <!-- Hidden description for screen readers -->
    <span id="date-picker-format-hint" class="lib-date-picker__sr-only">
      Date format: {{ locale().dateFormat }}
    </span>
  `,
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected date value (two-way binding) */
  readonly value = model<Date | null>(null);

  /** Minimum selectable date */
  readonly minDate = input<Date | undefined>();

  /** Maximum selectable date */
  readonly maxDate = input<Date | undefined>();

  /** Disabled dates array */
  readonly disabledDates = input<Date[]>([]);

  /** Custom date filter function */
  readonly dateFilter = input<((date: Date) => boolean) | undefined>();

  /** Display mode: dropdown, inline, modal */
  readonly mode = input<DatePickerMode>(DEFAULT_DATEPICKER_CONFIG.mode!);

  /** Size variant */
  readonly size = input<DatePickerSize>(DEFAULT_DATEPICKER_CONFIG.size!);

  /** First day of week */
  readonly weekStart = input<WeekStart>(DEFAULT_DATEPICKER_CONFIG.weekStart!);

  /** Show week numbers */
  readonly showWeekNumbers = input<boolean>(DEFAULT_DATEPICKER_CONFIG.showWeekNumbers!);

  /** Show today button */
  readonly showTodayButton = input<boolean>(DEFAULT_DATEPICKER_CONFIG.showTodayButton!);

  /** Show clear button */
  readonly showClear = input<boolean>(DEFAULT_DATEPICKER_CONFIG.showClearButton!);

  /** Close on date select */
  readonly closeOnSelect = input<boolean>(DEFAULT_DATEPICKER_CONFIG.closeOnSelect!);

  /** Locale configuration */
  readonly locale = input<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);

  /** Placeholder text */
  readonly placeholder = input<string>('Select date');

  /** Aria label for input */
  readonly ariaLabel = input<string>('Date');

  /** Show relative date display */
  readonly relativeDisplay = input<boolean>(false);

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  /** Emitted when date changes */
  readonly dateChange = output<DateSelectionEvent>();

  /** Emitted when dropdown opens/closes */
  readonly openChange = output<boolean>();

  // ============================================================================
  // STATE
  // ============================================================================

  readonly isOpen = signal<boolean>(false);
  private inputValue = signal<string>('');

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | null): void {
    if (value && isValidDate(value)) {
      this.value.set(value);
      this.inputValue.set(this.formatDisplayValue(value));
    } else {
      this.value.set(null);
      this.inputValue.set('');
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /** Display value for input field */
  readonly displayValue = computed(() => {
    const date = this.value();
    if (!date) return '';

    if (this.relativeDisplay()) {
      const relative = getRelativeDateLabel(date);
      if (relative) return relative;
    }

    return this.formatDisplayValue(date);
  });

  /** Input described by for accessibility */
  readonly inputDescribedBy = computed(() => {
    return 'date-picker-format-hint';
  });

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    // Close dropdown when clicking outside
    this.setupClickOutsideListener();
  }

  private setupClickOutsideListener(): void {
    const handler = (event: MouseEvent) => {
      // Only close if open and click is outside the component
      if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
        this.closeDropdown();
      }
    };

    document.addEventListener('click', handler);
    
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('click', handler);
    });
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputVal = input.value;
    this.inputValue.set(inputVal);

    if (!inputVal) {
      this.setValue(null, 'input');
      return;
    }

    // Try standard parsing
    const parsed = parseDate(inputVal, this.locale().dateFormat);
    if (parsed) {
      const clamped = clampDate(parsed, this.minDate(), this.maxDate());
      this.setValue(clamped, 'input');
    }
  }

  /** Handle input click - toggle dropdown with stopPropagation */
  onInputClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.toggleDropdown();
    }
  }

  onInputBlur(): void {
    this.onTouched();
    
    // Validate input on blur
    const inputVal = this.inputValue();
    if (inputVal && !this.value()) {
      // Invalid input, reset to last valid value or empty
      this.inputValue.set(this.displayValue());
    }
  }

  onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        if (this.isOpen()) {
          event.preventDefault();
          // Confirm current input
          this.closeDropdown();
        } else {
          this.openDropdown();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;
      case 'ArrowDown':
        if (!this.isOpen()) {
          event.preventDefault();
          this.openDropdown();
        }
        break;
    }
  }

  onDateSelect(date: Date): void {
    this.setValue(date, 'calendar');
    
    if (this.closeOnSelect() && this.mode() !== 'inline') {
      this.closeDropdown();
    }
  }

  /** Toggle button click handler */
  onToggleClick(event: MouseEvent): void {
    event.stopPropagation(); // Prevent click-outside handler from interfering
    this.toggleDropdown();
  }

  toggleDropdown(): void {
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    if (this.disabled() || this.mode() === 'inline' || this.isOpen()) return;
    this.isOpen.set(true);
    this.openChange.emit(true);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  clearValue(event: MouseEvent): void {
    event.stopPropagation();
    this.setValue(null, 'clear');
    this.inputValue.set('');
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  private setValue(date: Date | null, source: 'calendar' | 'input' | 'clear'): void {
    this.value.set(date);
    this.onChange(date);
    
    if (date) {
      this.inputValue.set(this.formatDisplayValue(date));
    }

    this.dateChange.emit({ date, source });
  }

  private formatDisplayValue(date: Date): string {
    return formatDate(date, this.locale().dateFormat);
  }
}
