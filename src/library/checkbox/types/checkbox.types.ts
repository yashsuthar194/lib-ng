/**
 * Checkbox Types and Configuration
 *
 * @description
 * Type definitions for the checkbox component.
 * For switch types, see switch.component.ts
 */

/**
 * Checkbox sizes
 * - sm: 16px, compact
 * - md: 20px, default
 * - lg: 24px, prominent
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Label position relative to the checkbox box
 */
export type LabelPosition = 'before' | 'after';

/**
 * Checkbox change event payload
 */
export interface CheckboxChangeEvent {
  checked: boolean;
  value: unknown;
  source: unknown; // Reference to the checkbox component
}

/**
 * Default checkbox configuration
 */
export const DEFAULT_CHECKBOX_CONFIG = {
  size: 'md' as CheckboxSize,
  labelPosition: 'after' as LabelPosition,
  checked: false,
  indeterminate: false,
  disabled: false,
  required: false,
  ripple: false,
} as const;

/**
 * Option interface for CheckboxGroup
 */
export interface CheckboxOption<T = unknown> {
  value: T;
  label: string;
  disabled?: boolean;
}
