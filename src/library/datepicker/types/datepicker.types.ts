/**
 * DatePicker Types
 *
 * Comprehensive type definitions for all DatePicker variants.
 * Includes types for dates, ranges, locales, presets, and configuration.
 */

// ============================================================================
// CORE DATE TYPES
// ============================================================================

/** Represents a date range with start and end dates */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/** Time value in 24-hour format */
export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

/** Combined date and time value */
export interface DateTimeValue {
  date: Date;
  time: TimeValue;
}

// ============================================================================
// PICKER VARIANTS & MODES
// ============================================================================

/** Available picker variant types */
export type DatePickerVariant = 'date' | 'date-range' | 'time' | 'datetime' | 'month' | 'year';

/** Display mode for the picker */
export type DatePickerMode = 'dropdown' | 'inline' | 'modal';

/** Calendar view state */
export type CalendarView = 'days' | 'months' | 'years';

/** Time format options */
export type TimeFormat = '12h' | '24h';

// ============================================================================
// SIZE & APPEARANCE
// ============================================================================

/** Component size variants */
export type DatePickerSize = 'sm' | 'md' | 'lg';

/** Size configuration mapping */
export const DATEPICKER_SIZE_MAP: Record<DatePickerSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

// ============================================================================
// PRESETS
// ============================================================================

/** Built-in date presets */
export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'thisWeek'
  | 'lastWeek'
  | 'nextWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'nextMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days';

/** Custom preset configuration */
export interface CustomPreset {
  label: string;
  value: Date | DateRange | (() => Date | DateRange);
  icon?: string;
}

/** Range preset for date range picker */
export interface RangePreset {
  label: string;
  getValue: () => DateRange;
  icon?: string;
}

// ============================================================================
// LOCALE & INTERNATIONALIZATION
// ============================================================================

/** Week start day (0 = Sunday, 1 = Monday, 6 = Saturday) */
export type WeekStart = 0 | 1 | 6;

/** Locale configuration */
export interface CalendarLocale {
  /** Short weekday names ['Sun', 'Mon', ...] */
  weekdays: string[];
  /** Full weekday names ['Sunday', 'Monday', ...] */
  weekdaysFull: string[];
  /** Short weekday names from week start */
  weekdaysFromStart: string[];
  /** Full month names ['January', 'February', ...] */
  months: string[];
  /** Short month names ['Jan', 'Feb', ...] */
  monthsShort: string[];
  /** Date format string (e.g., 'MM/DD/YYYY') */
  dateFormat: string;
  /** Time format */
  timeFormat: TimeFormat;
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStart: WeekStart;
  /** Today label */
  today: string;
  /** Clear label */
  clear: string;
  /** Close label */
  close: string;
  /** Cancel label */
  cancel: string;
  /** Apply label */
  apply: string;
}

/** Default locale configuration */
export const DEFAULT_CALENDAR_LOCALE: CalendarLocale = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysFromStart: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  weekStart: 0,
  today: 'Today',
  clear: 'Clear',
  close: 'Close',
  cancel: 'Cancel',
  apply: 'Apply',
};

// ============================================================================
// WORKING DAYS CONFIGURATION
// ============================================================================

/** Working days configuration for flexible weekday/holiday handling */
export interface WorkingDaysConfig {
  /** Array of weekday indices that are working days (0=Sun, 1=Mon, ..., 6=Sat) */
  weekdays: number[];
}

/** Default working days configuration (Monday-Friday) */
export const DEFAULT_WORKING_DAYS: WorkingDaysConfig = {
  weekdays: [1, 2, 3, 4, 5], // Monday to Friday
};

// ============================================================================
// CALENDAR DAY
// ============================================================================

/** Represents a single day in the calendar grid */
export interface CalendarDay {
  /** The date object */
  date: Date;
  /** Day of month (1-31) */
  day: number;
  /** Is this day in the current displayed month */
  isCurrentMonth: boolean;
  /** Is this today's date */
  isToday: boolean;
  /** Is this day selected */
  isSelected: boolean;
  /** Is this day disabled */
  isDisabled: boolean;
  /** Is this day in a selected range */
  isInRange: boolean;
  /** Is this the range start */
  isRangeStart: boolean;
  /** Is this the range end */
  isRangeEnd: boolean;
  /** Is this a weekend day */
  isWeekend: boolean;
}

// ============================================================================
// COMPONENT CONFIGURATIONS
// ============================================================================

/** Base configuration for all date pickers */
export interface DatePickerConfig {
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Function to determine if a date is disabled */
  dateFilter?: (date: Date) => boolean;
  /** Array of specific dates to disable */
  disabledDates?: Date[];
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Show today button */
  showTodayButton?: boolean;
  /** Show clear button */
  showClearButton?: boolean;
  /** Close on date select */
  closeOnSelect?: boolean;
  /** First day of week */
  weekStart?: WeekStart;
  /** Display mode */
  mode?: DatePickerMode;
  /** Size variant */
  size?: DatePickerSize;
}

/** Default date picker configuration */
export const DEFAULT_DATEPICKER_CONFIG: DatePickerConfig = {
  showWeekNumbers: false,
  showTodayButton: true,
  showClearButton: true,
  closeOnSelect: true,
  weekStart: 0,
  mode: 'dropdown',
  size: 'md',
};

/** Date range picker specific configuration */
export interface DateRangePickerConfig extends DatePickerConfig {
  /** Show preset shortcuts */
  showPresets?: boolean;
  /** Preset options */
  presets?: RangePreset[];
  /** Show day count badge */
  showDayCount?: boolean;
  /** Maximum range in days */
  maxRangeDays?: number;
  /** Working days configuration */
  workingDays?: WorkingDaysConfig;
  /** Dates to exclude from working days calculation */
  excludeDates?: Date[];
  /** Show working days count instead of total days */
  showWorkingDaysCount?: boolean;
}

/** Time picker specific configuration */
export interface TimePickerConfig {
  /** Time format (12h or 24h) */
  format?: TimeFormat;
  /** Minute step (1, 5, 10, 15, 30) */
  minuteStep?: number;
  /** Show seconds */
  showSeconds?: boolean;
  /** Minimum time */
  minTime?: TimeValue;
  /** Maximum time */
  maxTime?: TimeValue;
}

/** Default time picker configuration */
export const DEFAULT_TIMEPICKER_CONFIG: TimePickerConfig = {
  format: '12h',
  minuteStep: 1,
  showSeconds: false,
};

// ============================================================================
// ANIMATION
// ============================================================================

/** Animation direction for month transitions */
export type SlideDirection = 'next' | 'prev' | 'none';

// ============================================================================
// EVENTS
// ============================================================================

/** Date selection event */
export interface DateSelectionEvent {
  date: Date | null;
  source: 'calendar' | 'input' | 'preset' | 'clear';
}

/** Range selection event */
export interface RangeSelectionEvent {
  range: DateRange;
  source: 'calendar' | 'input' | 'preset' | 'clear';
  dayCount?: number;
  workingDayCount?: number;
}

/** Calendar navigation event */
export interface CalendarNavigationEvent {
  viewDate: Date;
  view: CalendarView;
  direction: SlideDirection;
}
