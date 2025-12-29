/**
 * MonthYearPicker Component
 *
 * Month and year selection picker.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * Features:
 * - Month grid view
 * - Year navigation
 * - Full keyboard navigation
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <lib-month-year-picker [(value)]="selectedMonth" />
 * <lib-month-year-picker [formControl]="monthControl" view="year" />
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
import type { DatePickerSize, CalendarLocale } from '../../types/datepicker.types';
import { DEFAULT_CALENDAR_LOCALE } from '../../types/datepicker.types';
import { isValidDate } from '../../utils/date-utils';

export type MonthYearView = 'months' | 'years';

@Component({
  selector: 'lib-month-year-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-month-year-picker',
    '[class.lib-month-year-picker--open]': 'isOpen()',
    '[class.lib-month-year-picker--disabled]': 'disabled()',
  },
  template: `
    <!-- Input Field -->
    <div class="lib-month-year-picker__input-wrapper">
      <input
        type="text"
        class="lib-month-year-picker__input"
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
        class="lib-month-year-picker__toggle"
        [disabled]="disabled()"
        [attr.aria-label]="isOpen() ? 'Close picker' : 'Open picker'"
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
        class="lib-month-year-picker__dropdown"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="view() === 'months' ? 'Choose month' : 'Choose year'"
        (keydown.escape)="closeDropdown()"
      >
        <!-- Header -->
        <div class="lib-month-year-picker__header">
          <button
            type="button"
            class="lib-month-year-picker__nav-btn"
            [attr.aria-label]="'Previous ' + (view() === 'months' ? 'year' : 'decade')"
            (click)="navigatePrev()"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button type="button" class="lib-month-year-picker__title-btn" (click)="toggleView()">
            @if (view() === 'months') {
              {{ viewYear() }}
            } @else {
              {{ yearRangeLabel() }}
            }
          </button>

          <button
            type="button"
            class="lib-month-year-picker__nav-btn"
            [attr.aria-label]="'Next ' + (view() === 'months' ? 'year' : 'decade')"
            (click)="navigateNext()"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <!-- Months Grid -->
        @if (view() === 'months') {
          <div class="lib-month-year-picker__grid" role="grid">
            @for (month of months(); track $index) {
              <button
                type="button"
                class="lib-month-year-picker__cell"
                role="gridcell"
                [class.lib-month-year-picker__cell--selected]="isSelectedMonth($index)"
                [class.lib-month-year-picker__cell--current]="isCurrentMonth($index)"
                [class.lib-month-year-picker__cell--disabled]="isMonthDisabled($index)"
                [attr.aria-selected]="isSelectedMonth($index)"
                [disabled]="isMonthDisabled($index)"
                (click)="selectMonth($index)"
              >
                {{ month }}
              </button>
            }
          </div>
        }

        <!-- Years Grid -->
        @if (view() === 'years') {
          <div class="lib-month-year-picker__grid" role="grid">
            @for (year of yearRange(); track year) {
              <button
                type="button"
                class="lib-month-year-picker__cell"
                role="gridcell"
                [class.lib-month-year-picker__cell--selected]="isSelectedYear(year)"
                [class.lib-month-year-picker__cell--current]="isCurrentYear(year)"
                [class.lib-month-year-picker__cell--disabled]="isYearDisabled(year)"
                [attr.aria-selected]="isSelectedYear(year)"
                [disabled]="isYearDisabled(year)"
                (click)="selectYear(year)"
              >
                {{ year }}
              </button>
            }
          </div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      --picker-width: 280px;
      display: inline-block;
      position: relative;
      width: var(--picker-width);
      font-family: var(--lib-font-family-base, system-ui, sans-serif);
    }

    .lib-month-year-picker__input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .lib-month-year-picker__input {
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

    .lib-month-year-picker__input:focus {
      border-color: var(--lib-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 3px var(--lib-color-primary-100, #dbeafe);
    }

    .lib-month-year-picker__input:disabled {
      background: var(--lib-color-neutral-100, #f4f4f5);
      cursor: not-allowed;
    }

    .lib-month-year-picker__toggle {
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

    .lib-month-year-picker__toggle svg {
      width: 16px;
      height: 16px;
    }

    .lib-month-year-picker__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--lib-z-index-dropdown, 1000);
      margin-top: var(--lib-spacing-1, 4px);
      width: var(--picker-width);
      padding: var(--lib-spacing-3, 12px);
      background: var(--lib-color-neutral-0, #ffffff);
      border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      border-radius: var(--lib-border-radius-lg, 8px);
      box-shadow: var(--lib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
      animation: fadeIn 200ms ease forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .lib-month-year-picker__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--lib-spacing-3, 12px);
    }

    .lib-month-year-picker__nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      background: transparent;
      color: var(--lib-color-neutral-700, #3f3f46);
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-month-year-picker__nav-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-month-year-picker__nav-btn svg {
      width: 16px;
      height: 16px;
    }

    .lib-month-year-picker__title-btn {
      flex: 1;
      padding: var(--lib-spacing-2, 8px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      background: transparent;
      color: var(--lib-color-neutral-900, #18181b);
      font-size: var(--lib-font-size-base, 16px);
      font-weight: var(--lib-font-weight-semibold, 600);
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-month-year-picker__title-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-month-year-picker__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--lib-spacing-2, 8px);
    }

    .lib-month-year-picker__cell {
      padding: var(--lib-spacing-3, 12px) var(--lib-spacing-2, 8px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      background: transparent;
      color: var(--lib-color-neutral-700, #3f3f46);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
      transition:
        background var(--lib-transition-fast, 150ms ease),
        transform var(--lib-transition-fast, 150ms ease);
    }

    .lib-month-year-picker__cell:hover:not(:disabled) {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-month-year-picker__cell:active:not(:disabled) {
      transform: scale(0.98);
    }

    .lib-month-year-picker__cell--current {
      font-weight: var(--lib-font-weight-semibold, 600);
    }

    .lib-month-year-picker__cell--selected {
      background: var(--lib-color-primary-500, #3b82f6);
      color: var(--lib-color-neutral-0, #ffffff);
    }

    .lib-month-year-picker__cell--selected:hover {
      background: var(--lib-color-primary-600, #2563eb);
    }

    .lib-month-year-picker__cell--disabled {
      color: var(--lib-color-neutral-300, #d4d4d8);
      cursor: not-allowed;
    }

    @media (prefers-reduced-motion: reduce) {
      .lib-month-year-picker__dropdown {
        animation: none;
      }
      .lib-month-year-picker__cell {
        transition: none;
      }
    }
  `,
})
export class MonthYearPickerComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected date value */
  readonly value = model<Date | null>(null);

  /** Initial view: months or years */
  readonly initialView = input<MonthYearView>('months');

  /** Minimum selectable date */
  readonly minDate = input<Date | undefined>();

  /** Maximum selectable date */
  readonly maxDate = input<Date | undefined>();

  /** Size variant */
  readonly size = input<DatePickerSize>('md');

  /** Locale configuration */
  readonly locale = input<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);

  /** Placeholder text */
  readonly placeholder = input<string>('Select month');

  /** Aria label for input */
  readonly ariaLabel = input<string>('Month');

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  /** Emitted when value changes */
  readonly valueChange = output<Date | null>();

  // ============================================================================
  // STATE
  // ============================================================================

  readonly isOpen = signal<boolean>(false);
  readonly view = signal<MonthYearView>('months');
  readonly viewYear = signal<number>(new Date().getFullYear());

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | null): void {
    if (value && isValidDate(value)) {
      this.value.set(value);
      this.viewYear.set(value.getFullYear());
    } else {
      this.value.set(null);
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
    const date = this.value();
    if (!date) return '';
    const locale = this.locale();
    return `${locale.months[date.getMonth()]} ${date.getFullYear()}`;
  });

  readonly months = computed(() => this.locale().monthsShort);

  readonly yearRange = computed(() => {
    const year = this.viewYear();
    const startYear = Math.floor(year / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  });

  readonly yearRangeLabel = computed(() => {
    const year = this.viewYear();
    const startYear = Math.floor(year / 12) * 12;
    return `${startYear} - ${startYear + 11}`;
  });

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    this.view.set(this.initialView());
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
  // NAVIGATION
  // ============================================================================

  navigatePrev(): void {
    if (this.view() === 'months') {
      this.viewYear.update(y => y - 1);
    } else {
      this.viewYear.update(y => y - 12);
    }
  }

  navigateNext(): void {
    if (this.view() === 'months') {
      this.viewYear.update(y => y + 1);
    } else {
      this.viewYear.update(y => y + 12);
    }
  }

  toggleView(): void {
    this.view.update(v => (v === 'months' ? 'years' : 'months'));
  }

  // ============================================================================
  // SELECTION
  // ============================================================================

  selectMonth(monthIndex: number): void {
    const newDate = new Date(this.viewYear(), monthIndex, 1);
    this.setValue(newDate);
    this.closeDropdown();
  }

  selectYear(year: number): void {
    this.viewYear.set(year);
    this.view.set('months');
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  isSelectedMonth(monthIndex: number): boolean {
    const value = this.value();
    if (!value) return false;
    return value.getMonth() === monthIndex && value.getFullYear() === this.viewYear();
  }

  isCurrentMonth(monthIndex: number): boolean {
    const today = new Date();
    return today.getMonth() === monthIndex && today.getFullYear() === this.viewYear();
  }

  isMonthDisabled(monthIndex: number): boolean {
    const date = new Date(this.viewYear(), monthIndex, 1);
    const min = this.minDate();
    const max = this.maxDate();
    if (min && date < new Date(min.getFullYear(), min.getMonth(), 1)) return true;
    if (max && date > new Date(max.getFullYear(), max.getMonth(), 1)) return true;
    return false;
  }

  isSelectedYear(year: number): boolean {
    const value = this.value();
    return value ? value.getFullYear() === year : false;
  }

  isCurrentYear(year: number): boolean {
    return new Date().getFullYear() === year;
  }

  isYearDisabled(year: number): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    if (min && year < min.getFullYear()) return true;
    if (max && year > max.getFullYear()) return true;
    return false;
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
