/**
 * Breadcrumb Component
 *
 * Container component displaying breadcrumb navigation trail.
 * Supports auto-generation from router or programmatic items.
 * Collapsed items can be accessed via dropdown menu.
 *
 * @example
 * Static usage:
 * <lib-breadcrumb [items]="breadcrumbs"></lib-breadcrumb>
 *
 * @example
 * Auto-generated from router:
 * <lib-breadcrumb [autoGenerate]="true"></lib-breadcrumb>
 *
 * @example
 * With collapse:
 * <lib-breadcrumb [items]="items" [maxItems]="4"></lib-breadcrumb>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  inject,
  computed,
  effect,
  signal,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbService } from '../services/breadcrumb.service';
import type {
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbSeparator,
  BreadcrumbClickEvent,
} from '../types/breadcrumb.types';

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [BreadcrumbItemComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-breadcrumb',
    '[class.lib-breadcrumb--sm]': 'size() === "sm"',
    '[class.lib-breadcrumb--lg]': 'size() === "lg"',
  },
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ol class="lib-breadcrumb__list">
        @for (item of displayItems(); track item.id ?? item.label; let i = $index; let last = $last) {
          <li class="lib-breadcrumb__item">
            @if (item.isEllipsis && item.hiddenItems?.length) {
              <!-- Ellipsis with dropdown -->
              <div class="lib-breadcrumb-ellipsis">
                <button 
                  type="button"
                  class="lib-breadcrumb-ellipsis__trigger"
                  [attr.aria-expanded]="dropdownOpen()"
                  aria-haspopup="menu"
                  (click)="toggleDropdown($event)"
                  (keydown)="onEllipsisKeydown($event)"
                >
                  <span class="lib-breadcrumb-ellipsis__dots">•••</span>
                </button>
                
                @if (dropdownOpen()) {
                  <ul 
                    class="lib-breadcrumb-ellipsis__menu" 
                    role="menu"
                    (keydown)="onMenuKeydown($event)"
                  >
                    @for (hidden of item.hiddenItems; track hidden.id ?? hidden.label) {
                      <li role="none">
                        <a 
                          role="menuitem"
                          class="lib-breadcrumb-ellipsis__menu-item"
                          [routerLink]="hidden.link"
                          (click)="onHiddenItemClick(hidden, $event)"
                        >
                          @if (hidden.icon) {
                            <span class="lib-breadcrumb-ellipsis__icon">{{ hidden.icon }}</span>
                          }
                          {{ hidden.label }}
                        </a>
                      </li>
                    }
                  </ul>
                }
              </div>
            } @else {
              <!-- Regular breadcrumb item -->
              <lib-breadcrumb-item
                [item]="item"
                [index]="i"
                [navigate]="navigate()"
                (itemClick)="onItemClick($event)"
              />
            }
            
            @if (!last) {
              <span class="lib-breadcrumb__separator" aria-hidden="true">
                @switch (separator()) {
                  @case ('chevron') {
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                    </svg>
                  }
                  @case ('slash') {
                    <span>/</span>
                  }
                  @case ('arrow') {
                    <span>→</span>
                  }
                  @case ('dot') {
                    <span>•</span>
                  }
                }
              </span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly elementRef = inject(ElementRef);

  /** Programmatic breadcrumb items */
  readonly items = input<BreadcrumbItem[]>([]);

  /** Enable auto-generation from router */
  readonly autoGenerate = input<boolean>(false);

  /** Enable router navigation on click */
  readonly navigate = input<boolean>(true);

  /** Separator style */
  readonly separator = input<BreadcrumbSeparator>('chevron');

  /** Size variant */
  readonly size = input<BreadcrumbSize>('md');

  /** Maximum items before collapse (0 = no collapse) */
  readonly maxItems = input<number>(0);

  /** Aria label for nav element */
  readonly ariaLabel = input<string>('Breadcrumb');

  /** Emitted when any breadcrumb item is clicked */
  readonly itemClick = output<BreadcrumbClickEvent>();

  /** Dropdown open state */
  readonly dropdownOpen = signal<boolean>(false);

  /** Items to display (from input or service) */
  readonly displayItems = computed(() => {
    const inputItems = this.items();
    const autoGen = this.autoGenerate();

    // Use input items if provided, otherwise use service
    const items = inputItems.length > 0 ? inputItems : 
                  autoGen ? this.breadcrumbService.items() : [];

    // Apply max items collapse if needed
    const max = this.maxItems();
    if (max > 0 && items.length > max) {
      return this.collapseItems(items, max);
    }

    return items;
  });

  constructor() {
    // Sync autoGenerate with service
    effect(() => {
      if (this.autoGenerate()) {
        this.breadcrumbService.enableAutoGenerate();
      }
    });
  }

  /** Close dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  /** Close dropdown on Escape key */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.dropdownOpen.set(false);
  }

  /** Toggle dropdown visibility */
  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownOpen.update(open => !open);
  }

  /** Handle keyboard on ellipsis trigger */
  onEllipsisKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dropdownOpen.update(open => !open);
    } else if (event.key === 'ArrowDown' && this.dropdownOpen()) {
      event.preventDefault();
      // Focus first menu item
      const menu = this.elementRef.nativeElement.querySelector('.lib-breadcrumb-ellipsis__menu-item');
      menu?.focus();
    }
  }

  /** Handle keyboard navigation in menu */
  onMenuKeydown(event: KeyboardEvent): void {
    const items = this.elementRef.nativeElement.querySelectorAll('.lib-breadcrumb-ellipsis__menu-item');
    const currentIndex = Array.from(items).indexOf(document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        (items[nextIndex] as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        (items[prevIndex] as HTMLElement)?.focus();
        break;
      case 'Home':
        event.preventDefault();
        (items[0] as HTMLElement)?.focus();
        break;
      case 'End':
        event.preventDefault();
        (items[items.length - 1] as HTMLElement)?.focus();
        break;
    }
  }

  /** Handle click on hidden item in dropdown */
  onHiddenItemClick(item: BreadcrumbItem, event: MouseEvent): void {
    this.dropdownOpen.set(false);
    this.itemClick.emit({ item, index: -1, event });
  }

  /** Handle item click */
  onItemClick(event: BreadcrumbClickEvent): void {
    this.itemClick.emit(event);
  }

  /** Collapse middle items when exceeding max */
  private collapseItems(items: BreadcrumbItem[], max: number): BreadcrumbItem[] {
    if (items.length <= max) return items;

    // Calculate how many to keep at start and end
    const keepFromEnd = Math.floor((max - 1) / 2);
    const keepFromStart = max - 1 - keepFromEnd;

    const result: BreadcrumbItem[] = [];

    // First items
    for (let i = 0; i < keepFromStart && i < items.length; i++) {
      result.push(items[i]);
    }

    // Collect hidden items for dropdown
    const hiddenItems: BreadcrumbItem[] = [];
    for (let i = keepFromStart; i < items.length - keepFromEnd; i++) {
      hiddenItems.push(items[i]);
    }

    // Ellipsis with hidden items
    result.push({
      id: '__ellipsis__',
      label: '...',
      isEllipsis: true,
      hiddenItems,
    });

    // Last items
    for (let i = items.length - keepFromEnd; i < items.length; i++) {
      if (i >= 0) result.push(items[i]);
    }

    return result;
  }
}
