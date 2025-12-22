/**
 * Input Component Types and Interfaces
 */

// ============================================
// Input Types
// ============================================

/** Supported input types */
export type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search' 
  | 'date' 
  | 'time'
  | 'datetime-local';

/** Size variants for input */
export type InputSize = 'sm' | 'md' | 'lg';

/** Visual style variants */
export type InputVariant = 'outline' | 'filled' | 'underline';

/** Autocomplete options for security */
export type InputAutocomplete = 
  | 'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'tel'
  | 'url'
  | 'street-address'
  | 'postal-code'
  | 'country';

// ============================================
// Configuration
// ============================================

/** Default configuration for inputs */
export interface InputConfig {
  size?: InputSize;
  variant?: InputVariant;
  debounce?: number;
}

/** Default values */
export const DEFAULT_INPUT_CONFIG: Required<InputConfig> = {
  size: 'md',
  variant: 'outline',
  debounce: 0,
};

// ============================================
// Size Constants
// ============================================

/** Height values for each size (in px, for reference) */
export const INPUT_SIZE_MAP = {
  sm: { height: 32, fontSize: 'var(--lib-font-size-sm)', padding: 'var(--lib-spacing-2) var(--lib-spacing-3)' },
  md: { height: 40, fontSize: 'var(--lib-font-size-base)', padding: 'var(--lib-spacing-2) var(--lib-spacing-4)' },
  lg: { height: 48, fontSize: 'var(--lib-font-size-lg)', padding: 'var(--lib-spacing-3) var(--lib-spacing-4)' },
} as const;
