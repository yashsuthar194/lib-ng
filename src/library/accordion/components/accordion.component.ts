/**
 * Accordion Component
 *
 * Container component for accordion panels.
 * Provides programmatic control API and manages expand mode.
 *
 * @example
 * Basic usage:
 * <lib-accordion>
 *   <lib-accordion-item header="Section 1">Content 1</lib-accordion-item>
 *   <lib-accordion-item header="Section 2">Content 2</lib-accordion-item>
 * </lib-accordion>
 *
 * @example
 * Multiple expand mode:
 * <lib-accordion [multiple]="true">
 *   <lib-accordion-item header="FAQ 1">Answer 1</lib-accordion-item>
 *   <lib-accordion-item header="FAQ 2">Answer 2</lib-accordion-item>
 * </lib-accordion>
 *
 * @example
 * Programmatic control:
 * <lib-accordion #acc>...</lib-accordion>
 * <button (click)="acc.expand(0)">Open First</button>
 * <button (click)="acc.collapseAll()">Close All</button>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  contentChildren,
  inject,
} from '@angular/core';
import { AccordionService } from '../services/accordion.service';
import { AccordionItemComponent } from './accordion-item.component';
import type { AccordionVariant, AccordionSize, AccordionIconPosition, AccordionChangeEvent } from '../types/accordion.types';

@Component({
  selector: 'lib-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionService],
  host: {
    'class': 'lib-accordion',
    '[class.lib-accordion--bordered]': 'variant() === "bordered"',
    '[class.lib-accordion--separated]': 'variant() === "separated"',
    '[class.lib-accordion--sm]': 'size() === "sm"',
    '[class.lib-accordion--lg]': 'size() === "lg"',
    '[attr.role]': '"presentation"',
  },
  template: `<ng-content></ng-content>`,
  styleUrl: './accordion.component.css',
})
export class AccordionComponent {
  /** Allow multiple panels open simultaneously */
  readonly multiple = input<boolean>(false);

  /** Visual variant */
  readonly variant = input<AccordionVariant>('default');

  /** Size variant */
  readonly size = input<AccordionSize>('md');

  /** Icon position */
  readonly iconPosition = input<AccordionIconPosition>('end');

  /** Hide expand/collapse icons */
  readonly hideToggleIcon = input<boolean>(false);

  /** Emits when any panel state changes */
  readonly accordionChange = output<AccordionChangeEvent>();

  private readonly service = inject(AccordionService);

  /** Query all child accordion items */
  readonly items = contentChildren(AccordionItemComponent);

  constructor() {
    // Sync multiple mode with service
    effect(() => this.service.setMultipleMode(this.multiple()));

    // Setup change callback
    this.service.setOnChangeCallback((event) => {
      this.accordionChange.emit(event);
    });
  }

  // ============================================
  // PROGRAMMATIC CONTROL API
  // ============================================

  /** Expand panel by index */
  expand(index: number): void {
    this.service.expand(index, 'programmatic');
  }

  /** Collapse panel by index */
  collapse(index: number): void {
    this.service.collapse(index, 'programmatic');
  }

  /** Toggle panel by index */
  toggle(index: number): void {
    this.service.toggle(index, 'programmatic');
  }

  /** Expand panel by its ID */
  expandById(id: string): void {
    this.service.expandById(id);
  }

  /** Collapse panel by its ID */
  collapseById(id: string): void {
    this.service.collapseById(id);
  }

  /** Expand all panels (only effective in multiple mode) */
  expandAll(): void {
    this.service.expandAll();
  }

  /** Collapse all panels */
  collapseAll(): void {
    this.service.collapseAll();
  }

  /** Check if panel at index is expanded */
  isExpanded(index: number): boolean {
    return this.service.isExpanded(index);
  }

  /** Get list of all expanded panel indices */
  getExpandedIndices(): number[] {
    return this.service.getExpandedIndices();
  }
}
