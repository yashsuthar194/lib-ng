/**
 * Accordion Header Directive
 *
 * Marks a template as the custom header for an accordion item.
 * Provides expanded state via template context.
 *
 * @example
 * <lib-accordion-item>
 *   <ng-template libAccordionHeader let-expanded="expanded">
 *     <span>{{ expanded ? '−' : '+' }}</span>
 *     <span>Custom Header</span>
 *   </ng-template>
 * </lib-accordion-item>
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[libAccordionHeader]',
  standalone: true,
})
export class AccordionHeaderDirective {}
