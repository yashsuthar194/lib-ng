/**
 * Calendar Component
 *
 * Standalone calendar display component with month navigation.
 * Used as the core building block for all date picker variants.
 *
 * Features:
 * - Month/year navigation with smooth animations
 * - Week number display (optional)
 * - Date range highlighting
 * - Disabled dates support
 * - Full keyboard navigation
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <lib-calendar
 *   [selected]="selectedDate"
 *   (dateSelect)="onDateSelect($event)"
 *   [minDate]="minDate"
 *   [maxDate]="maxDate"
 * />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  untracked,
  ElementRef,
  inject,
  DestroyRef,
} from '@angular/core';
import type {
  CalendarDay,
  DateRange,
  CalendarView,
  WeekStart,
  SlideDirection,
  CalendarNavigationEvent,
} from '../../types/datepicker.types';
import { DEFAULT_CALENDAR_LOCALE, CalendarLocale } from '../../types/datepicker.types';
import {
  getCalendarDays,
  getWeekdayHeaders,
  addMonths,
  addYears,
  isSameMonth,
  getWeekNumber,
  startOfMonth,
} from '../../utils/date-utils';

@Component({
  selector: 'lib-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-calendar',
    '[class.lib-calendar--loading]': 'loading()',
    '[attr.role]': '"grid"',
    '[attr.aria-label]': 'ariaLabel()',
    '(keydown)': 'onKeyDown($event)',
  },
  template: `
    <!-- Calendar Header -->
    <div class="lib-calendar__header">
      <button
        type="button"
        class="lib-calendar__nav-btn lib-calendar__nav-btn--prev"
        [disabled]="!canNavigatePrev()"
        [attr.aria-label]="'Previous ' + (view() === 'days' ? 'month' : 'year')"
        (click)="navigatePrev()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        class="lib-calendar__title-btn"
        [attr.aria-label]="'Change view'"
        (click)="toggleView()"
      >
        @if (view() === 'days') {
          <span id="calendar-month-year">{{ monthYearLabel() }}</span>
        } @else if (view() === 'months') {
          <span>{{ viewDate().getFullYear() }}</span>
        } @else {
          <span>{{ yearRangeLabel() }}</span>
        }
      </button>

      <button
        type="button"
        class="lib-calendar__nav-btn lib-calendar__nav-btn--next"
        [disabled]="!canNavigateNext()"
        [attr.aria-label]="'Next ' + (view() === 'days' ? 'month' : 'year')"
        (click)="navigateNext()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

    <!-- Days View -->
    @if (view() === 'days') {
      <div
        class="lib-calendar__grid"
        [class.lib-calendar__grid--slide-next]="slideDirection() === 'next'"
        [class.lib-calendar__grid--slide-prev]="slideDirection() === 'prev'"
        role="rowgroup"
      >
        <!-- Weekday Headers -->
        <div class="lib-calendar__weekdays" role="row">
          @if (showWeekNumbers()) {
            <div class="lib-calendar__weekday lib-calendar__week-number-header" role="columnheader">
              <span aria-hidden="true">#</span>
            </div>
          }
          @for (day of weekdayHeaders(); track day) {
            <div class="lib-calendar__weekday" role="columnheader">
              <abbr [title]="day">{{ day }}</abbr>
            </div>
          }
        </div>

        <!-- Calendar Days -->
        @for (week of calendarWeeks(); track $index) {
          <div class="lib-calendar__week" role="row">
            @if (showWeekNumbers()) {
              <div class="lib-calendar__week-number" role="rowheader">
                {{ getWeekNumber(week[0].date) }}
              </div>
            }
            @for (day of week; track day.date.getTime()) {
              <button
                type="button"
                class="lib-calendar__day"
                role="gridcell"
                [class.lib-calendar__day--today]="day.isToday"
                [class.lib-calendar__day--selected]="day.isSelected"
                [class.lib-calendar__day--disabled]="day.isDisabled"
                [class.lib-calendar__day--outside]="!day.isCurrentMonth"
                [class.lib-calendar__day--in-range]="day.isInRange"
                [class.lib-calendar__day--range-start]="day.isRangeStart"
                [class.lib-calendar__day--range-end]="day.isRangeEnd"
                [class.lib-calendar__day--weekend]="day.isWeekend"
                [class.lib-calendar__day--in-preview]="isInPreviewRange(day)"
                [class.lib-calendar__day--preview-start]="isPreviewStart(day)"
                [class.lib-calendar__day--preview-end]="isPreviewEnd(day)"
                [attr.aria-selected]="day.isSelected"
                [attr.aria-disabled]="day.isDisabled"
                [attr.aria-label]="getDayAriaLabel(day)"
                [attr.tabindex]="day.isSelected || (day.isToday && !selected()) ? 0 : -1"
                [disabled]="day.isDisabled"
                (click)="selectDate(day)"
                (focus)="onDayFocus(day)"
                (mouseenter)="onDayHover(day)"
              >
                <span class="lib-calendar__day-number">{{ day.day }}</span>
              </button>
            }
          </div>
        }
      </div>
    }

    <!-- Months View -->
    @if (view() === 'months') {
      <div class="lib-calendar__months" role="grid">
        @for (month of months(); track $index) {
          <button
            type="button"
            class="lib-calendar__month"
            role="gridcell"
            [class.lib-calendar__month--selected]="isSelectedMonth($index)"
            [class.lib-calendar__month--current]="isCurrentMonth($index)"
            [attr.aria-selected]="isSelectedMonth($index)"
            (click)="selectMonth($index)"
          >
            {{ month }}
          </button>
        }
      </div>
    }

    <!-- Years View -->
    @if (view() === 'years') {
      <div class="lib-calendar__years" role="grid">
        @for (year of yearRange(); track year) {
          <button
            type="button"
            class="lib-calendar__year"
            role="gridcell"
            [class.lib-calendar__year--selected]="isSelectedYear(year)"
            [class.lib-calendar__year--current]="isCurrentYear(year)"
            [attr.aria-selected]="isSelectedYear(year)"
            (click)="selectYear(year)"
          >
            {{ year }}
          </button>
        }
      </div>
    }

    <!-- Footer -->
    @if (showTodayButton()) {
      <div class="lib-calendar__footer">
        <button type="button" class="lib-calendar__today-btn" (click)="goToToday()">
          {{ locale().today }}
        </button>
      </div>
    }

    <!-- Screen reader live region -->
    <div class="lib-calendar__sr-only" role="status" aria-live="polite" aria-atomic="true">
      {{ screenReaderAnnouncement() }}
    </div>
  `,
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Timeout ID for animation cleanup */
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Currently selected date */
  readonly selected = input<Date | null>(null);

  /** Date range selection (for range picker) */
  readonly range = input<DateRange | null>(null);

  /** Currently hovered date for range preview */
  readonly hoveredDate = input<Date | null>(null);

  /** Whether user is selecting end of range (enables hover preview) */
  readonly isSelectingRangeEnd = input<boolean>(false);

  /** Minimum selectable date */
  readonly minDate = input<Date | undefined>();

  /** Maximum selectable date */
  readonly maxDate = input<Date | undefined>();

  /** Disabled dates array */
  readonly disabledDates = input<Date[]>([]);

  /** Custom date filter function */
  readonly dateFilter = input<((date: Date) => boolean) | undefined>();

  /** First day of week (0=Sunday, 1=Monday, 6=Saturday) */
  readonly weekStart = input<WeekStart>(0);

  /** Show week numbers */
  readonly showWeekNumbers = input<boolean>(false);

  /** Show today button */
  readonly showTodayButton = input<boolean>(true);

  /** Locale configuration */
  readonly locale = input<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);

  /** Loading state */
  readonly loading = input<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  /** Emitted when a date is selected */
  readonly dateSelect = output<Date>();

  /** Emitted when calendar navigates */
  readonly navigate = output<CalendarNavigationEvent>();

  /** Emitted when hovering over a date (for range preview) */
  readonly dateHover = output<Date | null>();

  // ============================================================================
  // STATE
  // ============================================================================

  /** Current view (days, months, years) */
  readonly view = signal<CalendarView>('days');

  /** Currently displayed date (for navigation) */
  readonly viewDate = signal<Date>(new Date());

  /** Animation direction */
  readonly slideDirection = signal<SlideDirection>('none');

  /** Screen reader announcement */
  readonly screenReaderAnnouncement = signal<string>('');

  /** Focused day for keyboard navigation */
  private focusedDate = signal<Date>(new Date());

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /** Weekday headers based on locale and week start */
  readonly weekdayHeaders = computed(() =>
    getWeekdayHeaders(this.locale().weekdays, this.weekStart())
  );

  /** Calendar days organized by weeks */
  readonly calendarWeeks = computed(() => {
    const days = getCalendarDays(
      this.viewDate(),
      this.selected(),
      this.range(),
      this.weekStart(),
      this.minDate(),
      this.maxDate(),
      this.disabledDates(),
      this.dateFilter()
    );

    // Split into weeks (7 days each)
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  });

  /** Month/year label for header */
  readonly monthYearLabel = computed(() => {
    const date = this.viewDate();
    const locale = this.locale();
    return `${locale.months[date.getMonth()]} ${date.getFullYear()}`;
  });

  /** Year range label for years view */
  readonly yearRangeLabel = computed(() => {
    const year = this.viewDate().getFullYear();
    const startYear = Math.floor(year / 12) * 12;
    return `${startYear} - ${startYear + 11}`;
  });

  /** Months array from locale */
  readonly months = computed(() => this.locale().monthsShort);

  /** Year range for years view (12 years) */
  readonly yearRange = computed(() => {
    const year = this.viewDate().getFullYear();
    const startYear = Math.floor(year / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  });

  /** Can navigate to previous month/year */
  readonly canNavigatePrev = computed(() => {
    const min = this.minDate();
    if (!min) return true;
    const viewStart = startOfMonth(this.viewDate());
    return viewStart > min;
  });

  /** Can navigate to next month/year */
  readonly canNavigateNext = computed(() => {
    const max = this.maxDate();
    if (!max) return true;
    const viewStart = startOfMonth(this.viewDate());
    const nextMonth = addMonths(viewStart, 1);
    return nextMonth <= max;
  });

  /** Aria label for the calendar */
  readonly ariaLabel = computed(() => {
    return `Calendar, ${this.monthYearLabel()}`;
  });

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    // Sync focusedDate with selected date and initially jump to selected month
    // Use untracked for viewDate to prevent navigation being reset
    effect(() => {
      const selected = this.selected();
      if (selected) {
        this.focusedDate.set(selected);
        // Only jump to selected month if we're not currently viewing the same month
        // Use untracked to prevent this effect from running when viewDate changes
        const currentViewDate = untracked(() => this.viewDate());
        if (!isSameMonth(selected, currentViewDate)) {
          this.viewDate.set(startOfMonth(selected));
        }
      }
    });

    // Sync viewDate with range.start (for range picker presets)
    // Use untracked to prevent navigation being reset
    effect(() => {
      const range = this.range();
      if (range?.start) {
        const currentViewDate = untracked(() => this.viewDate());
        if (!isSameMonth(range.start, currentViewDate)) {
          this.viewDate.set(startOfMonth(range.start));
        }
      }
    });

    // Clean up animation timeout on destroy
    this.destroyRef.onDestroy(() => {
      if (this.animationTimeoutId) {
        clearTimeout(this.animationTimeoutId);
      }
    });
  }

  // ============================================================================
  // NAVIGATION
  // ============================================================================

  navigatePrev(): void {
    this.slideDirection.set('prev');

    if (this.view() === 'days') {
      this.viewDate.update(date => addMonths(date, -1));
    } else if (this.view() === 'months') {
      this.viewDate.update(date => addYears(date, -1));
    } else {
      this.viewDate.update(date => addYears(date, -12));
    }

    this.announceNavigation();
    this.emitNavigationEvent('prev');

    // Reset animation after transition (with cleanup)
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
    }
    this.animationTimeoutId = setTimeout(() => this.slideDirection.set('none'), 200);
  }

  navigateNext(): void {
    this.slideDirection.set('next');

    if (this.view() === 'days') {
      this.viewDate.update(date => addMonths(date, 1));
    } else if (this.view() === 'months') {
      this.viewDate.update(date => addYears(date, 1));
    } else {
      this.viewDate.update(date => addYears(date, 12));
    }

    this.announceNavigation();
    this.emitNavigationEvent('next');

    // Reset animation after transition (with cleanup)
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
    }
    this.animationTimeoutId = setTimeout(() => this.slideDirection.set('none'), 200);
  }

  toggleView(): void {
    const currentView = this.view();
    if (currentView === 'days') {
      this.view.set('months');
    } else if (currentView === 'months') {
      this.view.set('years');
    } else {
      this.view.set('days');
    }
  }

  goToToday(): void {
    const today = new Date();
    this.viewDate.set(startOfMonth(today));
    this.view.set('days');
    // Also select today's date
    this.dateSelect.emit(today);
    this.screenReaderAnnouncement.set('Selected today');
  }

  // ============================================================================
  // SELECTION
  // ============================================================================

  selectDate(day: CalendarDay): void {
    if (day.isDisabled) return;
    this.dateSelect.emit(day.date);
    this.screenReaderAnnouncement.set(`Selected ${this.getDayAriaLabel(day)}`);
  }

  // ============================================================================
  // HOVER PREVIEW (for range selection)
  // ============================================================================

  /** Emit hovered date for range preview */
  onDayHover(day: CalendarDay): void {
    if (!day.isDisabled && this.isSelectingRangeEnd()) {
      this.dateHover.emit(day.date);
    }
  }

  /** Check if day is the start date during hover preview (first clicked date) */
  isPreviewStart(day: CalendarDay): boolean {
    if (!this.isSelectingRangeEnd()) return false;

    const rangeStart = this.range()?.start;
    const hovered = this.hoveredDate();

    // Show start highlight when we have a start date and are hovering (selecting end)
    if (!rangeStart || !hovered) return false;

    return (
      day.date.getFullYear() === rangeStart.getFullYear() &&
      day.date.getMonth() === rangeStart.getMonth() &&
      day.date.getDate() === rangeStart.getDate()
    );
  }

  /** Check if day is within the hover preview range (between start and hovered) */
  isInPreviewRange(day: CalendarDay): boolean {
    if (!this.isSelectingRangeEnd()) return false;

    const rangeStart = this.range()?.start;
    const hovered = this.hoveredDate();

    if (!rangeStart || !hovered || day.isDisabled) return false;

    // Use getTime() to avoid mutating original dates
    const dayTime = new Date(
      day.date.getFullYear(),
      day.date.getMonth(),
      day.date.getDate()
    ).getTime();
    const startTime = new Date(
      rangeStart.getFullYear(),
      rangeStart.getMonth(),
      rangeStart.getDate()
    ).getTime();
    const hoveredTime = new Date(
      hovered.getFullYear(),
      hovered.getMonth(),
      hovered.getDate()
    ).getTime();

    // Determine preview range bounds (bidirectional support)
    const minTime = Math.min(startTime, hoveredTime);
    const maxTime = Math.max(startTime, hoveredTime);

    // Check if day is strictly between (not on edges since they have different styling)
    return dayTime > minTime && dayTime < maxTime;
  }

  /** Check if day is the currently hovered potential end date */
  isPreviewEnd(day: CalendarDay): boolean {
    if (!this.isSelectingRangeEnd()) return false;

    const hovered = this.hoveredDate();
    const rangeStart = this.range()?.start;

    if (!hovered || !rangeStart || day.isDisabled) return false;

    // Don't show preview-end on the same date as start
    const isSameAsStart =
      day.date.getFullYear() === rangeStart.getFullYear() &&
      day.date.getMonth() === rangeStart.getMonth() &&
      day.date.getDate() === rangeStart.getDate();
    if (isSameAsStart) return false;

    // Check if this is the hovered date
    return (
      day.date.getFullYear() === hovered.getFullYear() &&
      day.date.getMonth() === hovered.getMonth() &&
      day.date.getDate() === hovered.getDate()
    );
  }

  selectMonth(monthIndex: number): void {
    this.viewDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(monthIndex);
      return newDate;
    });
    this.view.set('days');
  }

  selectYear(year: number): void {
    this.viewDate.update(date => {
      const newDate = new Date(date);
      newDate.setFullYear(year);
      return newDate;
    });
    this.view.set('months');
  }

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================

  onKeyDown(event: KeyboardEvent): void {
    if (this.view() !== 'days') return;

    let newDate = this.focusedDate();
    let handled = true;

    switch (event.key) {
      case 'ArrowLeft':
        newDate = new Date(newDate);
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate = new Date(newDate);
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'ArrowUp':
        newDate = new Date(newDate);
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate = new Date(newDate);
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'PageUp':
        if (event.shiftKey) {
          newDate = addYears(newDate, -1);
        } else {
          newDate = addMonths(newDate, -1);
        }
        break;
      case 'PageDown':
        if (event.shiftKey) {
          newDate = addYears(newDate, 1);
        } else {
          newDate = addMonths(newDate, 1);
        }
        break;
      case 'Home':
        newDate = new Date(newDate);
        newDate.setDate(1);
        break;
      case 'End':
        newDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectDateByKeyboard(this.focusedDate());
        return;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
      this.focusDate(newDate);
    }
  }

  private focusDate(date: Date): void {
    this.focusedDate.set(date);

    // Navigate month if needed
    if (!isSameMonth(date, this.viewDate())) {
      this.viewDate.set(startOfMonth(date));
    }

    // Focus the day button
    requestAnimationFrame(() => {
      const dayButtons = this.elementRef.nativeElement.querySelectorAll('.lib-calendar__day');
      const targetTime = date.getTime();
      dayButtons.forEach((btn: HTMLButtonElement) => {
        const day = this.findDayByButton(btn);
        if (day && day.date.getTime() === targetTime) {
          btn.focus();
        }
      });
    });
  }

  private selectDateByKeyboard(date: Date): void {
    const day = this.calendarWeeks()
      .flat()
      .find(d => d.date.getTime() === date.getTime());
    if (day && !day.isDisabled) {
      this.selectDate(day);
    }
  }

  private findDayByButton(button: HTMLButtonElement): CalendarDay | undefined {
    const dayNumber = button.textContent?.trim();
    if (!dayNumber) return undefined;

    const isOutside = button.classList.contains('lib-calendar__day--outside');
    return this.calendarWeeks()
      .flat()
      .find(d => d.day === parseInt(dayNumber, 10) && d.isCurrentMonth === !isOutside);
  }

  onDayFocus(day: CalendarDay): void {
    this.focusedDate.set(day.date);
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  getDayAriaLabel(day: CalendarDay): string {
    const date = day.date;
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    let label = date.toLocaleDateString('en-US', options);

    if (day.isToday) label += ', today';
    if (day.isSelected) label += ', selected';
    if (day.isDisabled) label += ', unavailable';

    return label;
  }

  getWeekNumber(date: Date): number {
    return getWeekNumber(date);
  }

  isSelectedMonth(monthIndex: number): boolean {
    const selected = this.selected();
    if (!selected) return false;
    return (
      selected.getMonth() === monthIndex && selected.getFullYear() === this.viewDate().getFullYear()
    );
  }

  isCurrentMonth(monthIndex: number): boolean {
    const today = new Date();
    return today.getMonth() === monthIndex && today.getFullYear() === this.viewDate().getFullYear();
  }

  isSelectedYear(year: number): boolean {
    const selected = this.selected();
    return selected ? selected.getFullYear() === year : false;
  }

  isCurrentYear(year: number): boolean {
    return new Date().getFullYear() === year;
  }

  private announceNavigation(): void {
    const label =
      this.view() === 'days' ? this.monthYearLabel() : this.viewDate().getFullYear().toString();
    this.screenReaderAnnouncement.set(`Navigated to ${label}`);
  }

  private emitNavigationEvent(direction: SlideDirection): void {
    this.navigate.emit({
      viewDate: this.viewDate(),
      view: this.view(),
      direction,
    });
  }
}
