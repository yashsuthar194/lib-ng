/**
 * Progress Types
 */

/** Progress variants */
export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';

/** Progress sizes */
export type ProgressSize = 'sm' | 'md' | 'lg';

/** Default config */
export const DEFAULT_PROGRESS_CONFIG = {
  value: 0,
  variant: 'primary' as ProgressVariant,
  size: 'md' as ProgressSize,
  showLabel: false,
  indeterminate: false,
} as const;

/** Size dimensions for bar height */
export const PROGRESS_BAR_HEIGHTS = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

/** Size dimensions for circle */
export const PROGRESS_CIRCLE_SIZES = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

/** Stroke widths for circle */
export const PROGRESS_STROKE_WIDTHS = {
  sm: 3,
  md: 4,
  lg: 5,
} as const;
