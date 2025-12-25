/**
 * Date Utility Functions
 *
 * Simple, reusable date manipulation functions used across DatePicker components.
 * All functions are pure (no side effects) and work with native Date objects.
 * 
 * Design principles:
 * - Simple and focused functions
 * - No external dependencies
 * - Pure functions for predictability
 * - Performance optimized (O(1) where possible)
 */

import type { CalendarDay, DateRange, WeekStart, WorkingDaysConfig } from '../types/datepicker.types';

// ============================================================================
// DATE COMPARISON
// ============================================================================

/**
 * Check if two dates are the same day (ignoring time)
 */
export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

/**
 * Check if two dates are in the same year
 */
export function isSameYear(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Check if date is before another date (day comparison)
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return startOfDay(date1).getTime() < startOfDay(date2).getTime();
}

/**
 * Check if date is after another date (day comparison)
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return startOfDay(date1).getTime() > startOfDay(date2).getTime();
}

/**
 * Check if date is within a range (inclusive)
 */
export function isWithinRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const time = startOfDay(date).getTime();
  return time >= startOfDay(range.start).getTime() && time <= startOfDay(range.end).getTime();
}

/**
 * Check if date is a weekend (Saturday or Sunday)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// ============================================================================
// DATE MANIPULATION
// ============================================================================

/**
 * Get start of day (00:00:00.000)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get start of month
 */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get end of month
 */
export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Get start of week based on week start day
 */
export function startOfWeek(date: Date, weekStart: WeekStart = 0): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day - weekStart + 7) % 7;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);
  // Handle month overflow (e.g., Jan 31 + 1 month = Feb 28/29)
  if (result.getDate() !== day) {
    result.setDate(0); // Set to last day of previous month
  }
  return result;
}

/**
 * Add years to a date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Subtract days from a date
 */
export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Subtract months from a date
 */
export function subtractMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}

// ============================================================================
// DATE INFO
// ============================================================================

/**
 * Get number of days in a month
 */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * Get week number of the year (ISO week)
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// ============================================================================
// RANGE CALCULATIONS
// ============================================================================

/**
 * Get number of days between two dates
 */
export function getDaysBetween(start: Date, end: Date): number {
  const startTime = startOfDay(start).getTime();
  const endTime = startOfDay(end).getTime();
  return Math.round(Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Get number of working days between two dates
 * Uses O(1) weekday check and Set for O(1) holiday lookup
 */
export function getWorkingDaysBetween(
  start: Date,
  end: Date,
  config: WorkingDaysConfig,
  excludeDates?: Date[]
): number {
  // Create Set for O(1) holiday lookup
  const excludeSet = new Set<string>();
  if (excludeDates) {
    for (const date of excludeDates) {
      excludeSet.add(startOfDay(date).getTime().toString());
    }
  }
  
  // Create Set for O(1) weekday lookup
  const workingDaysSet = new Set(config.weekdays);
  
  let count = 0;
  let current = startOfDay(start);
  const endTime = startOfDay(end).getTime();
  
  while (current.getTime() <= endTime) {
    const dayOfWeek = current.getDay();
    const isWorkingDay = workingDaysSet.has(dayOfWeek);
    const isExcluded = excludeSet.has(current.getTime().toString());
    
    if (isWorkingDay && !isExcluded) {
      count++;
    }
    
    current = addDays(current, 1);
  }
  
  return count;
}

// ============================================================================
// CALENDAR GRID GENERATION
// ============================================================================

/**
 * Generate calendar days for a month view
 * Returns 6 weeks (42 days) for consistent grid
 */
export function getCalendarDays(
  viewDate: Date,
  selectedDate: Date | null,
  range: DateRange | null,
  weekStart: WeekStart,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
  dateFilter?: (date: Date) => boolean
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  
  // Find the first day to display (start of week containing month start)
  const calendarStart = startOfWeek(monthStart, weekStart);
  
  // Create Set for O(1) disabled date lookup
  const disabledSet = new Set<string>();
  if (disabledDates) {
    for (const date of disabledDates) {
      disabledSet.add(startOfDay(date).getTime().toString());
    }
  }
  
  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const date = addDays(calendarStart, i);
    const dateTime = startOfDay(date).getTime();
    
    // Determine if day is disabled
    let isDisabled = false;
    if (minDate && isBefore(date, minDate)) isDisabled = true;
    if (maxDate && isAfter(date, maxDate)) isDisabled = true;
    if (disabledSet.has(dateTime.toString())) isDisabled = true;
    if (dateFilter && !dateFilter(date)) isDisabled = true;
    
    // Determine range state
    let isInRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    
    if (range?.start && range?.end) {
      isInRange = isWithinRange(date, range);
      isRangeStart = isSameDay(date, range.start);
      isRangeEnd = isSameDay(date, range.end);
    }
    
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: isSameMonth(date, viewDate),
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isWeekend: isWeekend(date),
    });
  }
  
  return days;
}

/**
 * Get weekday headers based on week start
 */
export function getWeekdayHeaders(weekdays: string[], weekStart: WeekStart): string[] {
  const result: string[] = [];
  for (let i = 0; i < 7; i++) {
    result.push(weekdays[(i + weekStart) % 7]);
  }
  return result;
}

// ============================================================================
// FORMATTING
// ============================================================================

/**
 * Format date as string (simple implementation)
 * For production, consider using Intl.DateTimeFormat
 */
export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('M', month.toString())
    .replace('D', day.toString());
}

/**
 * Parse date from string (simple implementation)
 */
export function parseDate(dateString: string, format: string): Date | null {
  try {
    const formatParts = format.match(/(YYYY|MM|DD|M|D)/g);
    if (!formatParts) return null;
    
    // Build regex from format
    const regexStr = format
      .replace('YYYY', '(\\d{4})')
      .replace('MM', '(\\d{2})')
      .replace('DD', '(\\d{2})')
      .replace('M', '(\\d{1,2})')
      .replace('D', '(\\d{1,2})');
    
    const match = dateString.match(new RegExp(`^${regexStr}$`));
    if (!match) return null;
    
    let year = 0, month = 0, day = 0;
    
    formatParts.forEach((part, index) => {
      const value = parseInt(match[index + 1], 10);
      if (part === 'YYYY') year = value;
      else if (part === 'MM' || part === 'M') month = value - 1;
      else if (part === 'DD' || part === 'D') day = value;
    });
    
    const result = new Date(year, month, day);
    
    // Validate the date
    if (
      result.getFullYear() !== year ||
      result.getMonth() !== month ||
      result.getDate() !== day
    ) {
      return null;
    }
    
    return result;
  } catch {
    return null;
  }
}

/**
 * Get relative date label (Today, Yesterday, Tomorrow, etc.)
 */
export function getRelativeDateLabel(date: Date): string | null {
  const today = new Date();
  
  if (isSameDay(date, today)) return 'Today';
  if (isSameDay(date, addDays(today, -1))) return 'Yesterday';
  if (isSameDay(date, addDays(today, 1))) return 'Tomorrow';
  
  // This week
  const startOfThisWeek = startOfWeek(today, 0);
  const endOfThisWeek = addDays(startOfThisWeek, 6);
  if (isWithinRange(date, { start: startOfThisWeek, end: endOfThisWeek })) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `This ${weekdays[date.getDay()]}`;
  }
  
  // Last week
  const startOfLastWeek = addDays(startOfThisWeek, -7);
  const endOfLastWeek = addDays(startOfLastWeek, 6);
  if (isWithinRange(date, { start: startOfLastWeek, end: endOfLastWeek })) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Last ${weekdays[date.getDay()]}`;
  }
  
  // Next week
  const startOfNextWeek = addDays(startOfThisWeek, 7);
  const endOfNextWeek = addDays(startOfNextWeek, 6);
  if (isWithinRange(date, { start: startOfNextWeek, end: endOfNextWeek })) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Next ${weekdays[date.getDay()]}`;
  }
  
  // Fallback to null (use absolute date)
  return null;
}

// ============================================================================
// SMART PARSING
// ============================================================================

/**
 * Parse natural language date input
 * Returns null if unable to parse
 */
export function parseSmartDate(input: string): Date | null {
  const normalized = input.toLowerCase().trim();
  const today = new Date();
  
  // Exact matches
  if (normalized === 'today') return today;
  if (normalized === 'yesterday') return addDays(today, -1);
  if (normalized === 'tomorrow') return addDays(today, 1);
  
  // Relative days: "in X days", "X days ago"
  const inDaysMatch = normalized.match(/^in\s+(\d+)\s+days?$/);
  if (inDaysMatch) {
    return addDays(today, parseInt(inDaysMatch[1], 10));
  }
  
  const daysAgoMatch = normalized.match(/^(\d+)\s+days?\s+ago$/);
  if (daysAgoMatch) {
    return addDays(today, -parseInt(daysAgoMatch[1], 10));
  }
  
  // Relative weeks: "in X weeks", "X weeks ago"
  const inWeeksMatch = normalized.match(/^in\s+(\d+)\s+weeks?$/);
  if (inWeeksMatch) {
    return addDays(today, parseInt(inWeeksMatch[1], 10) * 7);
  }
  
  const weeksAgoMatch = normalized.match(/^(\d+)\s+weeks?\s+ago$/);
  if (weeksAgoMatch) {
    return addDays(today, -parseInt(weeksAgoMatch[1], 10) * 7);
  }
  
  // Day names: "next friday", "last monday"
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  const nextDayMatch = normalized.match(/^next\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/);
  if (nextDayMatch) {
    const targetDay = dayNames.indexOf(nextDayMatch[1]);
    const currentDay = today.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    return addDays(today, daysUntil + 7);
  }
  
  const lastDayMatch = normalized.match(/^last\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/);
  if (lastDayMatch) {
    const targetDay = dayNames.indexOf(lastDayMatch[1]);
    const currentDay = today.getDay();
    let daysSince = currentDay - targetDay;
    if (daysSince <= 0) daysSince += 7;
    return addDays(today, -(daysSince + 7));
  }
  
  // Month day: "Dec 25", "December 25"
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const fullMonthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  
  const monthDayMatch = normalized.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})$/);
  if (monthDayMatch) {
    let monthIndex = monthNames.indexOf(monthDayMatch[1].substring(0, 3));
    if (monthIndex === -1) {
      monthIndex = fullMonthNames.indexOf(monthDayMatch[1]);
    }
    const day = parseInt(monthDayMatch[2], 10);
    return new Date(today.getFullYear(), monthIndex, day);
  }
  
  return null;
}

// ============================================================================
// CLAMP & VALIDATION
// ============================================================================

/**
 * Clamp date within min/max range
 */
export function clampDate(date: Date, minDate?: Date, maxDate?: Date): Date {
  let result = date;
  if (minDate && isBefore(date, minDate)) result = minDate;
  if (maxDate && isAfter(date, maxDate)) result = maxDate;
  return result;
}

/**
 * Check if date is valid
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}
