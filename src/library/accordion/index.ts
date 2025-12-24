/**
 * Accordion Public API
 *
 * Re-exports all public components, directives, and types.
 */

// Components
export { AccordionComponent } from './components/accordion.component';
export { AccordionItemComponent } from './components/accordion-item.component';

// Directives
export { AccordionHeaderDirective } from './directives/accordion-header.directive';
export { AccordionContentDirective } from './directives/accordion-content.directive';

// Types
export type {
  AccordionVariant,
  AccordionSize,
  AccordionIconPosition,
  AccordionItemState,
  AccordionChangeEvent,
} from './types/accordion.types';
