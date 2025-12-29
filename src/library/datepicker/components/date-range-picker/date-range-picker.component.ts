/**
 * DateRangePicker Component
 *
 * Start and end date selection with preset shortcuts.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * Features:
 * - Two-month calendar view
 * - Preset date ranges (last 7 days, this month, etc.)
 * - Range highlighting
 * - Day count display
 * - Working days calculation
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <lib-date-range-picker [(value)]="dateRange" />
 * <lib-date-range-picker [formControl]="rangeControl" [showPresets]="true" />
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
  DateRange,
  RangePreset,
  WeekStart,
  CalendarLocale,
  DatePickerSize,
  WorkingDaysConfig,
} from '../../types/datepicker.types';
import { DEFAULT_CALENDAR_LOCALE, DEFAULT_WORKING_DAYS } from '../../types/datepicker.types';
import {
  getDaysBetween,
  getWorkingDaysBetween,
  formatDate,
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
} from '../../utils/date-utils';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'lib-date-range-picker',
  standalone: true,
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-date-range-picker',
    '[class.lib-date-range-picker--open]': 'isOpen()',
    '[class.lib-date-range-picker--disabled]': 'disabled()',
  },
  template: `
    <!-- Input Field -->
    <div class="lib-date-range-picker__input-wrapper">
      <input
        type="text"
        class="lib-date-range-picker__input"
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
        class="lib-date-range-picker__toggle"
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
        class="lib-date-range-picker__dropdown"
        role="dialog"
        aria-modal="true"
        aria-label="Choose date range"
        (keydown.escape)="closeDropdown()"
      >
        <div class="lib-date-range-picker__content">
          <!-- Presets Panel -->
          @if (showPresets()) {
            <div class="lib-date-range-picker__presets">
              <div class="lib-date-range-picker__presets-title">Quick Select</div>
              @for (preset of builtInPresets(); track preset.label) {
                <button
                  type="button"
                  class="lib-date-range-picker__preset-btn"
                  (click)="applyPreset(preset)"
                >
                  {{ preset.label }}
                </button>
              }
            </div>
          }

          <!-- Calendars -->
          <div 
            class="lib-date-range-picker__calendars"
            (mouseleave)="onCalendarLeave()"
          >
            <lib-calendar
              [selected]="null"
              [range]="tempRange()"
              [hoveredDate]="hoveredDate()"
              [isSelectingRangeEnd]="isSelectingRangeEnd()"
              [minDate]="minDate()"
              [maxDate]="maxDate()"
              [weekStart]="weekStart()"
              [locale]="locale()"
              [showTodayButton]="false"
              (dateSelect)="onDateSelect($event)"
              (dateHover)="onDateHover($event)"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="lib-date-range-picker__footer">
          @if (showDayCount() && tempRange().start && tempRange().end) {
            <span class="lib-date-range-picker__day-count">
              {{ dayCountDisplay() }}
            </span>
          }
          <div class="lib-date-range-picker__actions">
            <button
              type="button"
              class="lib-date-range-picker__cancel-btn"
              (click)="cancelSelection()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="lib-date-range-picker__apply-btn"
              [disabled]="!tempRange().start || !tempRange().end"
              (click)="applySelection()"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      --picker-width: 320px;
      display: inline-block;
      position: relative;
      width: var(--picker-width);
      font-family: var(--lib-font-family-base, system-ui, sans-serif);
    }

    .lib-date-range-picker__input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .lib-date-range-picker__input {
      width: 100%;
      height: 40px;
      padding: 0 var(--lib-spacing-3, 12px);
      padding-right: calc(var(--lib-spacing-3, 12px) * 2 + 16px);
      border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
      border-radius: var(--lib-border-radius-md, 6px);
      background: var(--lib-color-neutral-0, #ffffff);
      color: var(--lib-color-neutral-900, #18181b);
      font-size: var(--lib-font-size-sm, 14px);
      font-weight: var(--lib-font-weight-medium, 500);
      letter-spacing: 0.02em;
      cursor: pointer;
      outline: none;
      transition: border-color var(--lib-transition-fast, 150ms ease);
    }

    .lib-date-range-picker__input:focus {
      border-color: var(--lib-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 3px var(--lib-color-primary-100, #dbeafe);
    }

    .lib-date-range-picker__toggle {
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

    .lib-date-range-picker__toggle svg {
      width: 16px;
      height: 16px;
    }

    .lib-date-range-picker__dropdown {
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

    .lib-date-range-picker__content {
      display: flex;
    }

    .lib-date-range-picker__presets {
      width: 140px;
      padding: var(--lib-spacing-3, 12px);
      border-right: 1px solid var(--lib-color-neutral-200, #e4e4e7);
    }

    .lib-date-range-picker__presets-title {
      font-size: var(--lib-font-size-xs, 12px);
      font-weight: var(--lib-font-weight-semibold, 600);
      color: var(--lib-color-neutral-500, #71717a);
      text-transform: uppercase;
      margin-bottom: var(--lib-spacing-2, 8px);
    }

    .lib-date-range-picker__preset-btn {
      display: block;
      width: 100%;
      padding: var(--lib-spacing-2, 8px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      background: transparent;
      color: var(--lib-color-neutral-700, #3f3f46);
      font-size: var(--lib-font-size-sm, 14px);
      text-align: left;
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-date-range-picker__preset-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-date-range-picker__calendars {
      padding: var(--lib-spacing-2, 8px);
    }

    .lib-date-range-picker__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--lib-spacing-3, 12px);
      border-top: 1px solid var(--lib-color-neutral-200, #e4e4e7);
    }

    .lib-date-range-picker__day-count {
      font-size: var(--lib-font-size-sm, 14px);
      color: var(--lib-color-neutral-600, #52525b);
    }

    .lib-date-range-picker__actions {
      display: flex;
      gap: var(--lib-spacing-2, 8px);
    }

    .lib-date-range-picker__cancel-btn,
    .lib-date-range-picker__apply-btn {
      padding: var(--lib-spacing-2, 8px) var(--lib-spacing-4, 16px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-date-range-picker__cancel-btn {
      background: transparent;
      color: var(--lib-color-neutral-600, #52525b);
    }

    .lib-date-range-picker__cancel-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-date-range-picker__apply-btn {
      background: var(--lib-color-primary-500, #3b82f6);
      color: var(--lib-color-neutral-0, #ffffff);
    }

    .lib-date-range-picker__apply-btn:hover:not(:disabled) {
      background: var(--lib-color-primary-600, #2563eb);
    }

    .lib-date-range-picker__apply-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (prefers-reduced-motion: reduce) {
      .lib-date-range-picker__dropdown { animation: none; }
    }
  `,
})
export class DateRangePickerComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected date range */
  readonly value = model<DateRange | null>(null);

  /** Minimum selectable date */
  readonly minDate = input<Date | undefined>();

  /** Maximum selectable date */
  readonly maxDate = input<Date | undefined>();

  /** First day of week */
  readonly weekStart = input<WeekStart>(0);

  /** Size variant */
  readonly size = input<DatePickerSize>('md');

  /** Locale configuration */
  readonly locale = input<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);

  /** Placeholder text */
  readonly placeholder = input<string>('Select date range');

  /** Aria label for input */
  readonly ariaLabel = input<string>('Date range');

  /** Show preset shortcuts */
  readonly showPresets = input<boolean>(true);

  /** Show day count badge */
  readonly showDayCount = input<boolean>(true);

  /** Working days configuration */
  readonly workingDays = input<WorkingDaysConfig>(DEFAULT_WORKING_DAYS);

  /** Dates to exclude from working days */
  readonly excludeDates = input<Date[]>([]);

  /** Show working days count instead of total */
  readonly showWorkingDaysCount = input<boolean>(false);

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  readonly valueChange = output<DateRange | null>();

  // ============================================================================
  // STATE
  // ============================================================================

  readonly isOpen = signal<boolean>(false);
  readonly tempRange = signal<DateRange>({ start: null, end: null });
  
  /** Currently hovered date for preview */
  readonly hoveredDate = signal<Date | null>(null);
  
  /** Whether selecting start (true) or end (false) of range */
  private readonly selectingStart = signal<boolean>(true);
  
  /** Computed: whether we're selecting range end (for hover preview) */
  readonly isSelectingRangeEnd = computed(() => 
    !this.selectingStart() && this.tempRange().start !== null
  );

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  private onChange: (value: DateRange | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DateRange | null): void {
    this.value.set(value);
    if (value) {
      this.tempRange.set({ ...value });
    } else {
      this.tempRange.set({ start: null, end: null });
    }
  }

  registerOnChange(fn: (value: DateRange | null) => void): void {
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
    if (!val?.start || !val?.end) return '';

    const format = this.locale().dateFormat;
    return `${formatDate(val.start, format)} - ${formatDate(val.end, format)}`;
  });

  readonly dayCountDisplay = computed(() => {
    const range = this.tempRange();
    if (!range.start || !range.end) return '';

    if (this.showWorkingDaysCount()) {
      const workingDays = getWorkingDaysBetween(
        range.start,
        range.end,
        this.workingDays(),
        this.excludeDates()
      );
      return `${workingDays} working day${workingDays !== 1 ? 's' : ''}`;
    }

    const days = getDaysBetween(range.start, range.end);
    return `${days} day${days !== 1 ? 's' : ''} selected`;
  });

  readonly builtInPresets = computed<RangePreset[]>(() => {
    const today = new Date();
    return [
      {
        label: 'Today',
        getValue: () => ({ start: today, end: today }),
      },
      {
        label: 'Yesterday',
        getValue: () => {
          const yesterday = addDays(today, -1);
          return { start: yesterday, end: yesterday };
        },
      },
      {
        label: 'Last 7 days',
        getValue: () => ({
          start: addDays(today, -6),
          end: today,
        }),
      },
      {
        label: 'Last 30 days',
        getValue: () => ({
          start: addDays(today, -29),
          end: today,
        }),
      },
      {
        label: 'This month',
        getValue: () => ({
          start: startOfMonth(today),
          end: endOfMonth(today),
        }),
      },
      {
        label: 'Last month',
        getValue: () => {
          const lastMonth = addMonths(today, -1);
          return {
            start: startOfMonth(lastMonth),
            end: endOfMonth(lastMonth),
          };
        },
      },
    ];
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
    const current = this.tempRange();

    if (this.selectingStart()) {
      // Start new selection
      this.tempRange.set({ start: date, end: null });
      this.selectingStart.set(false);
      this.hoveredDate.set(null);
    } else {
      // Complete selection - auto-swap to ensure chronological order
      const start = current.start!;
      const selectedStart = date < start ? date : start;
      const selectedEnd = date < start ? start : date;
      
      this.tempRange.set({ start: selectedStart, end: selectedEnd });
      this.selectingStart.set(true);
      this.hoveredDate.set(null);
    }
  }

  /** Handle date hover for range preview */
  onDateHover(date: Date | null): void {
    this.hoveredDate.set(date);
  }

  /** Clear hover when mouse leaves calendar area */
  onCalendarLeave(): void {
    this.hoveredDate.set(null);
  }

  applyPreset(preset: RangePreset): void {
    const range = preset.getValue();
    this.tempRange.set(range);
  }

  applySelection(): void {
    const range = this.tempRange();
    if (range.start && range.end) {
      this.setValue(range);
      this.closeDropdown();
    }
  }

  cancelSelection(): void {
    // Reset to current value
    const current = this.value();
    this.tempRange.set(current ? { ...current } : { start: null, end: null });
    this.selectingStart.set(true);
    this.hoveredDate.set(null);
    this.closeDropdown();
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  toggleDropdown(): void {
    if (this.disabled()) return;
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      // Re-open with current value
      const current = this.value();
      this.tempRange.set(current ? { ...current } : { start: null, end: null });
      this.selectingStart.set(true);
      this.hoveredDate.set(null);
      this.isOpen.set(true);
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

  private setValue(range: DateRange | null): void {
    this.value.set(range);
    this.onChange(range);
    this.valueChange.emit(range);
  }
}
