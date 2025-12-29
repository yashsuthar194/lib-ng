/**
 * DateTimePicker Component
 *
 * Combined date and time selection.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * Features:
 * - Calendar for date selection
 * - Time picker for time selection
 * - 12h/24h format support
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <lib-datetime-picker [(value)]="dateTime" />
 * <lib-datetime-picker [formControl]="dateTimeControl" format="24h" />
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
  TimeFormat,
  WeekStart,
  CalendarLocale,
  DatePickerSize,
} from '../../types/datepicker.types';
import { DEFAULT_CALENDAR_LOCALE } from '../../types/datepicker.types';
import { isValidDate, formatDate } from '../../utils/date-utils';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'lib-datetime-picker',
  standalone: true,
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-datetime-picker',
    '[class.lib-datetime-picker--open]': 'isOpen()',
    '[class.lib-datetime-picker--disabled]': 'disabled()',
  },
  template: `
    <!-- Input Field -->
    <div class="lib-datetime-picker__input-wrapper">
      <input
        type="text"
        class="lib-datetime-picker__input"
        [value]="displayValue()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'dialog'"
        readonly
        (click)="toggleDropdown()"
        (keydown)="onInputKeyDown($event)"
      />
      
      <button
        type="button"
        class="lib-datetime-picker__toggle"
        [disabled]="disabled()"
        (click)="toggleDropdown()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </div>

    <!-- Dropdown -->
    @if (isOpen()) {
      <div
        class="lib-datetime-picker__dropdown"
        role="dialog"
        aria-modal="true"
        aria-label="Choose date and time"
        (keydown.escape)="closeDropdown()"
      >
        <!-- Calendar -->
        <lib-calendar
          [selected]="selectedDate()"
          [minDate]="minDate()"
          [maxDate]="maxDate()"
          [weekStart]="weekStart()"
          [locale]="locale()"
          [showTodayButton]="false"
          (dateSelect)="onDateSelect($event)"
        />

        <!-- Time Selection -->
        <div class="lib-datetime-picker__time-section">
          <label class="lib-datetime-picker__time-label">Time</label>
          <div class="lib-datetime-picker__time-inputs">
            <select
              class="lib-datetime-picker__time-select"
              [value]="selectedHour()"
              (change)="onHourChange($event)"
              aria-label="Hour"
            >
              @for (hour of hours(); track hour) {
                <option [value]="hour">{{ formatHour(hour) }}</option>
              }
            </select>
            <span class="lib-datetime-picker__time-separator">:</span>
            <select
              class="lib-datetime-picker__time-select"
              [value]="selectedMinute()"
              (change)="onMinuteChange($event)"
              aria-label="Minute"
            >
              @for (minute of minutes(); track minute) {
                <option [value]="minute">{{ minute.toString().padStart(2, '0') }}</option>
              }
            </select>
            @if (format() === '12h') {
              <select
                class="lib-datetime-picker__time-select lib-datetime-picker__time-select--period"
                [value]="period()"
                (change)="onPeriodChange($event)"
                aria-label="AM/PM"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            }
          </div>
        </div>

        <!-- Footer -->
        <div class="lib-datetime-picker__footer">
          <button
            type="button"
            class="lib-datetime-picker__now-btn"
            (click)="selectNow()"
          >
            Now
          </button>
          <button
            type="button"
            class="lib-datetime-picker__ok-btn"
            (click)="confirmSelection()"
          >
            OK
          </button>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      --picker-width: 300px;
      display: inline-block;
      position: relative;
      width: var(--picker-width);
      font-family: var(--lib-font-family-base, system-ui, sans-serif);
    }

    .lib-datetime-picker__input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .lib-datetime-picker__input {
      width: 100%;
      height: 40px;
      padding: 0 var(--lib-spacing-3, 12px);
      padding-right: calc(var(--lib-spacing-3, 12px) * 2 + 16px);
      border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
      border-radius: var(--lib-border-radius-md, 6px);
      background: var(--lib-color-neutral-0, #ffffff);
      color: var(--lib-color-neutral-900, #18181b);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
      outline: none;
      transition: border-color var(--lib-transition-fast, 150ms ease);
    }

    .lib-datetime-picker__input:focus {
      border-color: var(--lib-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 3px var(--lib-color-primary-100, #dbeafe);
    }

    .lib-datetime-picker__toggle {
      position: absolute;
      right: var(--lib-spacing-3, 12px);
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--lib-color-neutral-500, #71717a);
      cursor: pointer;
    }

    .lib-datetime-picker__toggle svg {
      width: 16px;
      height: 16px;
    }

    .lib-datetime-picker__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--lib-z-index-dropdown, 1000);
      margin-top: var(--lib-spacing-1, 4px);
      background: var(--lib-color-neutral-0, #ffffff);
      border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      border-radius: var(--lib-border-radius-lg, 8px);
      box-shadow: var(--lib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
      animation: fadeIn 200ms ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lib-datetime-picker__time-section {
      padding: var(--lib-spacing-3, 12px);
      border-top: 1px solid var(--lib-color-neutral-200, #e4e4e7);
    }

    .lib-datetime-picker__time-label {
      display: block;
      margin-bottom: var(--lib-spacing-2, 8px);
      font-size: var(--lib-font-size-sm, 14px);
      font-weight: var(--lib-font-weight-medium, 500);
      color: var(--lib-color-neutral-700, #3f3f46);
    }

    .lib-datetime-picker__time-inputs {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2, 8px);
    }

    .lib-datetime-picker__time-select {
      padding: var(--lib-spacing-2, 8px);
      border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
      border-radius: var(--lib-border-radius-md, 6px);
      background: var(--lib-color-neutral-0, #ffffff);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
    }

    .lib-datetime-picker__time-select--period {
      width: 60px;
    }

    .lib-datetime-picker__time-separator {
      font-weight: var(--lib-font-weight-bold, 700);
      color: var(--lib-color-neutral-500, #71717a);
    }

    .lib-datetime-picker__footer {
      display: flex;
      justify-content: space-between;
      padding: var(--lib-spacing-3, 12px);
      border-top: 1px solid var(--lib-color-neutral-200, #e4e4e7);
    }

    .lib-datetime-picker__now-btn,
    .lib-datetime-picker__ok-btn {
      padding: var(--lib-spacing-2, 8px) var(--lib-spacing-4, 16px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-datetime-picker__now-btn {
      background: transparent;
      color: var(--lib-color-primary-500, #3b82f6);
    }

    .lib-datetime-picker__now-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-datetime-picker__ok-btn {
      background: var(--lib-color-primary-500, #3b82f6);
      color: var(--lib-color-neutral-0, #ffffff);
    }

    .lib-datetime-picker__ok-btn:hover {
      background: var(--lib-color-primary-600, #2563eb);
    }

    @media (prefers-reduced-motion: reduce) {
      .lib-datetime-picker__dropdown { animation: none; }
    }
  `,
})
export class DateTimePickerComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected datetime value */
  readonly value = model<Date | null>(null);

  /** Minimum selectable date */
  readonly minDate = input<Date | undefined>();

  /** Maximum selectable date */
  readonly maxDate = input<Date | undefined>();

  /** Time format: 12h or 24h */
  readonly format = input<TimeFormat>('12h');

  /** Minute step */
  readonly minuteStep = input<number>(1);

  /** First day of week */
  readonly weekStart = input<WeekStart>(0);

  /** Size variant */
  readonly size = input<DatePickerSize>('md');

  /** Locale configuration */
  readonly locale = input<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);

  /** Placeholder text */
  readonly placeholder = input<string>('Select date and time');

  /** Aria label for input */
  readonly ariaLabel = input<string>('Date and time');

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  readonly valueChange = output<Date | null>();

  // ============================================================================
  // STATE
  // ============================================================================

  readonly isOpen = signal<boolean>(false);
  readonly selectedDate = signal<Date | null>(null);
  readonly selectedHour = signal<number>(12);
  readonly selectedMinute = signal<number>(0);
  readonly period = signal<'AM' | 'PM'>('AM');

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | null): void {
    if (value && isValidDate(value)) {
      this.value.set(value);
      this.selectedDate.set(value);
      const hours = value.getHours();
      const minutes = value.getMinutes();

      if (this.format() === '12h') {
        this.selectedHour.set(hours % 12 || 12);
        this.period.set(hours >= 12 ? 'PM' : 'AM');
      } else {
        this.selectedHour.set(hours);
      }
      this.selectedMinute.set(minutes);
    } else {
      this.value.set(null);
      this.selectedDate.set(null);
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

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';

    const dateStr = formatDate(val, this.locale().dateFormat);
    const hours = val.getHours();
    const minutes = val.getMinutes();

    let timeStr: string;
    if (this.format() === '12h') {
      const hour12 = hours % 12 || 12;
      const periodStr = hours >= 12 ? 'PM' : 'AM';
      timeStr = `${hour12}:${minutes.toString().padStart(2, '0')} ${periodStr}`;
    } else {
      timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return `${dateStr} ${timeStr}`;
  });

  readonly hours = computed(() => {
    if (this.format() === '12h') {
      return Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    }
    return Array.from({ length: 24 }, (_, i) => i);
  });

  readonly minutes = computed(() => {
    const step = this.minuteStep();
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  });

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    this.setupClickOutsideListener();
  }

  private setupClickOutsideListener(): void {
    const handler = (event: MouseEvent) => {
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

  onDateSelect(date: Date): void {
    this.selectedDate.set(date);
  }

  onHourChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    this.selectedHour.set(value);
  }

  onMinuteChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    this.selectedMinute.set(value);
  }

  onPeriodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as 'AM' | 'PM';
    this.period.set(value);
  }

  selectNow(): void {
    const now = new Date();
    this.selectedDate.set(now);
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (this.format() === '12h') {
      this.selectedHour.set(hours % 12 || 12);
      this.period.set(hours >= 12 ? 'PM' : 'AM');
    } else {
      this.selectedHour.set(hours);
    }
    this.selectedMinute.set(minutes);
  }

  confirmSelection(): void {
    const date = this.selectedDate();
    if (!date) return;

    let hours = this.selectedHour();
    const minutes = this.selectedMinute();

    if (this.format() === '12h') {
      if (this.period() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (this.period() === 'AM' && hours === 12) {
        hours = 0;
      }
    }

    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    this.setValue(dateTime);
    this.closeDropdown();
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  formatHour(hour: number): string {
    if (this.format() === '12h') {
      return hour.toString();
    }
    return hour.toString().padStart(2, '0');
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.onTouched();
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  private setValue(date: Date | null): void {
    this.value.set(date);
    this.onChange(date);
    this.valueChange.emit(date);
  }
}
