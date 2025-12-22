/**
 * Select Component Public API
 * 
 * Exports all public components, directives, and types.
 */

// Core component
export { SelectComponent } from './core/select.component';

// Option components
export { OptionComponent } from './option/option.component';
export { OptionGroupComponent } from './option-group/option-group.component';

// Types
export type {
  OptionContext,
  OptionGroupContext,
  SelectConfig,
} from './types/select.types';

// Constants
export { DEFAULT_SELECT_CONFIG } from './types/select.types';
