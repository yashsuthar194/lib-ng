/**
 * Alert Types
 */

/** Alert semantic variants */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

/** Alert visual appearance */
export type AlertAppearance = 'filled' | 'outlined' | 'soft';

/** Default config */
export const DEFAULT_ALERT_CONFIG = {
  variant: 'info' as AlertVariant,
  appearance: 'filled' as AlertAppearance,
  dismissible: false,
  showIcon: true,
} as const;

/** Animation timing */
export const ALERT_ANIMATION = {
  duration: 200,
} as const;
