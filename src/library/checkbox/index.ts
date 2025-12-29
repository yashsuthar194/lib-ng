/**
 * Checkbox Module Public API
 */

// Core checkbox component
export { CheckboxComponent } from './core/checkbox.component';

// Switch component (separate from checkbox)
export {
  SwitchComponent,
  SwitchCheckedIconDirective,
  SwitchUncheckedIconDirective,
} from './switch/switch.component';
export type { SwitchSize, SwitchLabelPosition, SwitchChangeEvent } from './switch/switch.component';

// Group component
export { CheckboxGroupComponent } from './group/checkbox-group.component';

// Checkbox types
export type {
  CheckboxSize,
  LabelPosition,
  CheckboxChangeEvent,
  CheckboxOption,
} from './types/checkbox.types';

export { DEFAULT_CHECKBOX_CONFIG } from './types/checkbox.types';
