/**
 * Button Types and Configuration
 *
 * @description
 * Type definitions for the button directive system.
 */

/**
 * Button visual variants
 * - primary: Filled with primary color (main CTA)
 * - secondary: Filled with neutral color (secondary actions)
 * - outline: Border only, transparent background
 * - ghost: No border, transparent background, subtle hover
 * - link: Text-only link style
 * - danger: Red destructive action
 * - success: Green positive action
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'danger'
  | 'success';

/**
 * Button sizes
 * - sm: 32px height, compact
 * - md: 40px height, default
 * - lg: 48px height, prominent
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Loading indicator mode
 * - replace: Spinner replaces text completely
 * - inline: Spinner appears alongside text
 */
export type LoadingMode = 'replace' | 'inline';

/**
 * Icon position for button icons
 */
export type IconPosition = 'start' | 'end';

/**
 * Default button configuration
 */
export const DEFAULT_BUTTON_CONFIG = {
  variant: 'primary' as ButtonVariant,
  size: 'md' as ButtonSize,
  loadingMode: 'inline' as LoadingMode,
  ripple: false,
  fullWidth: false,
  iconOnly: false,
  disabled: false,
  loading: false,
} as const;

/**
 * Button configuration interface
 */
export interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loadingMode?: LoadingMode;
  ripple?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
}
