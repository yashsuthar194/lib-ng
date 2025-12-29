/**
 * Accordion Item Component
 *
 * Individual expandable panel within an accordion.
 * Supports lazy content loading and form preservation.
 *
 * @example
 * <lib-accordion-item header="Section Title">
 *   Content here
 * </lib-accordion-item>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
  ContentChild,
  TemplateRef,
  ElementRef,
  ViewChild,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AccordionService } from '../services/accordion.service';
import { AccordionHeaderDirective } from '../directives/accordion-header.directive';
import { AccordionContentDirective } from '../directives/accordion-content.directive';

@Component({
  selector: 'lib-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-accordion-item',
    '[class.lib-accordion-item--expanded]': 'isExpanded()',
    '[class.lib-accordion-item--disabled]': 'disabled()',
  },
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
})
export class AccordionItemComponent implements OnInit, OnDestroy {
  /** Header text (simple usage) */
  readonly header = input<string>('');

  /** Initial expanded state */
  readonly expanded = input<boolean>(false);

  /** Disable expansion */
  readonly disabled = input<boolean>(false);

  /** Unique identifier */
  readonly id = input<string>(`accordion-item-${Math.random().toString(36).slice(2, 9)}`);

  /** Keep content mounted when collapsed (useful for forms) */
  readonly keepMounted = input<boolean>(false);

  /** Emits after expand animation completes */
  readonly afterExpand = output<void>();

  /** Emits after collapse animation completes */
  readonly afterCollapse = output<void>();

  /** Custom header template */
  @ContentChild(AccordionHeaderDirective, { read: TemplateRef })
  headerTemplate?: TemplateRef<{ expanded: boolean }>;

  /** Lazy content template */
  @ContentChild(AccordionContentDirective, { read: TemplateRef })
  contentTemplate?: TemplateRef<void>;

  /** Header button element for focus management */
  @ViewChild('headerButton', { static: true })
  private headerButton!: ElementRef<HTMLButtonElement>;

  private readonly service = inject(AccordionService);
  private readonly _index = signal<number>(-1);
  private readonly _hasBeenOpened = signal<boolean>(false);
  private _wasExpanded = false;

  /** Panel index in accordion */
  readonly index = computed(() => this._index());

  /** Computed expanded state from service */
  readonly isExpanded = computed(() => {
    const idx = this._index();
    return idx >= 0 ? this.service.isExpanded(idx) : false;
  });

  /** Whether content has ever been opened (for lazy loading) */
  readonly hasBeenOpened = computed(() => this._hasBeenOpened());

  /** Should render content based on expanded state and keepMounted */
  readonly shouldRenderContent = computed(() => {
    const expanded = this.isExpanded();
    const keepMounted = this.keepMounted();
    const hasOpened = this._hasBeenOpened();

    // Lazy load: don't render until first open
    if (!hasOpened) return false;

    // Keep mounted: always render after first open
    if (keepMounted) return true;

    // Default: only render when expanded
    return expanded;
  });

  /** Template context for custom header */
  readonly headerContext = computed(() => ({
    expanded: this.isExpanded(),
  }));

  ngOnInit(): void {
    // Register with service
    const index = this.service.register({
      id: this.id(),
      expanded: this.expanded(),
      disabled: this.disabled(),
    });
    this._index.set(index);

    // Register header for focus management
    if (this.headerButton?.nativeElement) {
      this.service.registerHeader(index, this.headerButton.nativeElement);
    }

    // Track if initially expanded
    if (this.expanded()) {
      this._hasBeenOpened.set(true);
    }
  }

  ngOnDestroy(): void {
    this.service.unregister(this._index());
  }

  /** Toggle panel state */
  toggle(): void {
    if (this.disabled()) return;

    const idx = this._index();
    if (idx >= 0) {
      this.service.toggle(idx, 'user', this.id());

      // Mark as opened when expanding
      if (!this._hasBeenOpened() && this.isExpanded()) {
        this._hasBeenOpened.set(true);
      }
    }
  }

  /** Handle keyboard navigation */
  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const idx = this._index();
    if (idx < 0) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.service.focusNext(idx);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.service.focusPrevious(idx);
        break;
      case 'Home':
        event.preventDefault();
        this.service.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.service.focusLast();
        break;
    }
  }

  /** Handle animation end for callbacks */
  onAnimationEnd(): void {
    const expanded = this.isExpanded();
    if (expanded && !this._wasExpanded) {
      this.afterExpand.emit();
    } else if (!expanded && this._wasExpanded) {
      this.afterCollapse.emit();
    }
    this._wasExpanded = expanded;
  }
}
