/**
 * DatePicker Module Public API
 *
 * Export all public components, types, and utilities.
 */

// ============================================================================
// COMPONENTS
// ============================================================================

export { CalendarComponent } from './components/calendar/calendar.component';
export { DatePickerComponent } from './components/date-picker/date-picker.component';
export { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
export { TimePickerComponent } from './components/time-picker/time-picker.component';
export { DateTimePickerComponent } from './components/datetime-picker/datetime-picker.component';
export { MonthYearPickerComponent, type MonthYearView } from './components/month-year-picker/month-year-picker.component';
export { TimeWheelComponent } from './components/time-wheel/time-wheel.component';

// ============================================================================
// SERVICES
// ============================================================================

export { CalendarLocaleService, LOCALES } from './services/calendar-locale.service';

// ============================================================================
// VALIDATORS
// ============================================================================

export {
  dateValidators,
  dateRequired,
  minDate,
  maxDate,
  dateRange,
  weekdayOnly,
  excludeDates,
  customDateValidator,
  dateRangeRequired,
  minRangeDays,
  maxRangeDays,
} from './validators/date-validators';

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core types
  DateRange,
  TimeValue,
  DateTimeValue,
  // Variants & modes
  DatePickerVariant,
  DatePickerMode,
  CalendarView,
  TimeFormat,
  // Size
  DatePickerSize,
  // Presets
  DatePreset,
  CustomPreset,
  RangePreset,
  // Locale
  WeekStart,
  CalendarLocale,
  // Working days
  WorkingDaysConfig,
  // Calendar
  CalendarDay,
  SlideDirection,
  // Configurations
  DatePickerConfig,
  DateRangePickerConfig,
  TimePickerConfig,
  // Events
  DateSelectionEvent,
  RangeSelectionEvent,
  CalendarNavigationEvent,
} from './types/datepicker.types';

export {
  // Constants
  DATEPICKER_SIZE_MAP,
  DEFAULT_CALENDAR_LOCALE,
  DEFAULT_WORKING_DAYS,
  DEFAULT_DATEPICKER_CONFIG,
  DEFAULT_TIMEPICKER_CONFIG,
} from './types/datepicker.types';

// ============================================================================
// UTILITIES
// ============================================================================

export {
  // Comparison
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isBefore,
  isAfter,
  isWithinRange,
  isWeekend,
  // Manipulation
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  addYears,
  subtractDays,
  subtractMonths,
  // Info
  getDaysInMonth,
  getDayOfWeek,
  getWeekNumber,
  // Range
  getDaysBetween,
  getWorkingDaysBetween,
  // Grid
  getCalendarDays,
  getWeekdayHeaders,
  // Formatting
  formatDate,
  parseDate,
  getRelativeDateLabel,
  // Validation
  clampDate,
  isValidDate,
} from './utils/date-utils';

