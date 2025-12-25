/**
 * Date Validators
 *
 * Angular form validators for date constraints.
 * These validators are OPTIONAL - only used if the developer explicitly adds them.
 *
 * @example
 * // Only applied if explicitly used
 * this.dateControl = new FormControl(null, [
 *   dateValidators.required(),
 *   dateValidators.minDate(new Date('2024-01-01')),
 *   dateValidators.maxDate(new Date('2024-12-31')),
 * ]);
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isBefore, isAfter, isSameDay, isWeekend, isValidDate } from '../utils/date-utils';
import type { DateRange } from '../types/datepicker.types';

// ============================================================================
// SINGLE DATE VALIDATORS
// ============================================================================

/**
 * Creates a validator that requires a date value
 */
export function dateRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) {
      return { dateRequired: true };
    }
    return null;
  };
}

/**
 * Creates a validator that requires date to be >= minDate
 * @param min Minimum allowed date (inclusive)
 */
export function minDate(min: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    if (isBefore(value, min) && !isSameDay(value, min)) {
      return {
        minDate: {
          min,
          actual: value,
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator that requires date to be <= maxDate
 * @param max Maximum allowed date (inclusive)
 */
export function maxDate(max: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    if (isAfter(value, max) && !isSameDay(value, max)) {
      return {
        maxDate: {
          max,
          actual: value,
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator that requires date to be within a range (inclusive)
 * @param min Minimum date (inclusive)
 * @param max Maximum date (inclusive)
 */
export function dateRange(min: Date, max: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    const beforeMin = isBefore(value, min) && !isSameDay(value, min);
    const afterMax = isAfter(value, max) && !isSameDay(value, max);

    if (beforeMin || afterMax) {
      return {
        dateRange: {
          min,
          max,
          actual: value,
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator that only allows weekdays (Monday-Friday)
 */
export function weekdayOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    if (isWeekend(value)) {
      return {
        weekdayOnly: {
          actual: value,
          dayOfWeek: value.getDay(),
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator that excludes specific dates
 * @param dates Array of dates to exclude
 */
export function excludeDates(dates: Date[]): ValidatorFn {
  // Use Set for O(1) lookup
  const excludeSet = new Set(dates.map(d => d.toDateString()));

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    if (excludeSet.has(value.toDateString())) {
      return {
        excludedDate: {
          actual: value,
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator using a custom function
 * @param fn Custom validation function that returns true if date is valid
 * @param errorKey Key to use in the validation error object
 */
export function customDateValidator(
  fn: (date: Date) => boolean,
  errorKey: string = 'customDateError'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !isValidDate(value)) return null;

    if (!fn(value)) {
      return {
        [errorKey]: {
          actual: value,
        },
      };
    }
    return null;
  };
}

// ============================================================================
// DATE RANGE VALIDATORS
// ============================================================================

/**
 * Creates a validator that requires a complete date range (start and end)
 */
export function dateRangeRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: DateRange | null = control.value;
    if (!value || !value.start || !value.end) {
      return { dateRangeRequired: true };
    }
    if (!isValidDate(value.start) || !isValidDate(value.end)) {
      return { dateRangeRequired: true };
    }
    return null;
  };
}

/**
 * Creates a validator for minimum range length in days
 * @param minDays Minimum number of days in the range
 */
export function minRangeDays(minDays: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: DateRange | null = control.value;
    if (!value?.start || !value?.end) return null;

    const diffTime = Math.abs(value.end.getTime() - value.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays < minDays) {
      return {
        minRangeDays: {
          min: minDays,
          actual: diffDays,
        },
      };
    }
    return null;
  };
}

/**
 * Creates a validator for maximum range length in days
 * @param maxDays Maximum number of days in the range
 */
export function maxRangeDays(maxDays: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: DateRange | null = control.value;
    if (!value?.start || !value?.end) return null;

    const diffTime = Math.abs(value.end.getTime() - value.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays > maxDays) {
      return {
        maxRangeDays: {
          max: maxDays,
          actual: diffDays,
        },
      };
    }
    return null;
  };
}

// ============================================================================
// CONVENIENCE EXPORT
// ============================================================================

/**
 * Collection of all date validators
 * @example
 * import { dateValidators } from '@lib/datepicker';
 * 
 * new FormControl(null, [
 *   dateValidators.required(),
 *   dateValidators.minDate(new Date()),
 * ]);
 */
export const dateValidators = {
  required: dateRequired,
  minDate,
  maxDate,
  dateRange,
  weekdayOnly,
  excludeDates,
  custom: customDateValidator,
  rangeRequired: dateRangeRequired,
  minRangeDays,
  maxRangeDays,
};
