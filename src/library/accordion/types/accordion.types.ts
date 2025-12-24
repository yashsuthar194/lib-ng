/**
 * Accordion Type Definitions
 *
 * Provides type safety for Accordion component configuration.
 */

/** Accordion variant for styling */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

/** Accordion size */
export type AccordionSize = 'sm' | 'md' | 'lg';

/** Accordion icon position */
export type AccordionIconPosition = 'start' | 'end';

/** Accordion item state */
export interface AccordionItemState {
  id: string;
  index: number;
  expanded: boolean;
  disabled: boolean;
}

/** Accordion change event */
export interface AccordionChangeEvent {
  /** ID of the panel that changed */
  itemId: string;
  /** Index of the panel that changed */
  index: number;
  /** New expanded state */
  expanded: boolean;
  /** What triggered the change */
  source: 'user' | 'programmatic';
}
