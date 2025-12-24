/**
 * Badge Types and Configuration
 */

/** Semantic variants for badges */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/** Visual appearance styles */
export type BadgeAppearance = 'filled' | 'outlined' | 'soft' | 'ghost';

/** Size options */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/** Shape options */
export type BadgeShape = 'rounded' | 'pill' | 'square' | 'dot';

/** Position for overlay badges (directive) */
export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'center-left'
  | 'center-right';

/** Status indicator types */
export type BadgeStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

/** Badge content - can be string, number, or null for dot */
export type BadgeContent = string | number | null;

/** Default configuration */
export const DEFAULT_BADGE_CONFIG = {
  variant: 'primary' as BadgeVariant,
  appearance: 'filled' as BadgeAppearance,
  size: 'sm' as BadgeSize,
  shape: 'pill' as BadgeShape,
  position: 'top-right' as BadgePosition,
  maxValue: 99,
  hideZero: false,
  pulse: false,
  status: 'none' as BadgeStatus,
} as const;

/** Animation timing */
export const BADGE_ANIMATION = {
  pulseDuration: 1500,
  entryDuration: 200,
  exitDuration: 150,
} as const;
