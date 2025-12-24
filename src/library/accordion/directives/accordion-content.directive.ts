/**
 * Accordion Content Directive
 *
 * Marks a template for lazy-loaded accordion content.
 * Content is only rendered when the panel is first expanded.
 *
 * @example
 * <lib-accordion-item header="Details">
 *   <ng-template libAccordionContent>
 *     <!-- Only rendered when expanded -->
 *     <app-heavy-component></app-heavy-component>
 *   </ng-template>
 * </lib-accordion-item>
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[libAccordionContent]',
  standalone: true,
})
export class AccordionContentDirective {}
