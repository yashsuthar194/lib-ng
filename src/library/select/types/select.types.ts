/**
 * Select Component Types
 * 
 * Type definitions for the Select component system.
 * Uses generics for type-safe value handling.
 */

/**
 * Context provided to custom option templates.
 * Allows access to option state in ng-template.
 */
export interface OptionContext<T = unknown> {
  /** The option's value */
  $implicit: T;
  /** Whether this option is currently selected */
  selected: boolean;
  /** Whether this option is currently focused (keyboard navigation) */
  focused: boolean;
  /** Whether this option is disabled */
  disabled: boolean;
  /** Index of the option in the list */
  index: number;
}

/**
 * Context provided to custom group templates.
 */
export interface OptionGroupContext {
  /** Group label */
  $implicit: string;
  /** Number of options in group */
  count: number;
  /** Whether group is expanded */
  expanded: boolean;
}

/**
 * Configuration for the Select component.
 * Used for global defaults via injection token.
 */
export interface SelectConfig {
  /** Default placeholder text */
  placeholder?: string;
  /** Default search placeholder */
  searchPlaceholder?: string;
  /** Default clearable state */
  clearable?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Max height of dropdown panel */
  panelMaxHeight?: string;
}

/**
 * State of the Select component.
 * Used internally for signal-based state management.
 */
export interface SelectState<T = unknown> {
  /** Whether dropdown is open */
  isOpen: boolean;
  /** Current search query */
  searchQuery: string;
  /** Index of focused option (keyboard nav) */
  focusedIndex: number;
  /** Selected value(s) */
  value: T | T[] | null;
  /** Whether component is touched */
  touched: boolean;
}

/**
 * Default configuration values.
 */
export const DEFAULT_SELECT_CONFIG: SelectConfig = {
  placeholder: 'Select...',
  searchPlaceholder: 'Search...',
  clearable: true,
  animationDuration: 150,
  panelMaxHeight: '256px',
};
