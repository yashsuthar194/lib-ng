/**
 * Breadcrumb Item Component
 *
 * Renders individual breadcrumb with link, icon, and accessibility.
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { BreadcrumbItem, BreadcrumbClickEvent } from '../types/breadcrumb.types';

@Component({
  selector: 'lib-breadcrumb-item',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-breadcrumb-item',
    '[class.lib-breadcrumb-item--current]': 'item().current',
    '[class.lib-breadcrumb-item--disabled]': 'item().disabled',
  },
  template: `
    @if (item().current || item().disabled || !item().link) {
      <!-- Non-clickable: current page or disabled -->
      <span 
        class="lib-breadcrumb-item__content"
        [attr.aria-current]="item().current ? 'page' : null"
        [attr.aria-disabled]="item().disabled ? 'true' : null"
      >
        @if (item().icon) {
          <span class="lib-breadcrumb-item__icon" aria-hidden="true">{{ item().icon }}</span>
        }
        <span class="lib-breadcrumb-item__label">{{ item().label }}</span>
      </span>
    } @else if (navigate()) {
      <!-- Clickable with router navigation -->
      <a 
        class="lib-breadcrumb-item__link"
        [routerLink]="item().link"
        (click)="handleClick($event)"
      >
        @if (item().icon) {
          <span class="lib-breadcrumb-item__icon" aria-hidden="true">{{ item().icon }}</span>
        }
        <span class="lib-breadcrumb-item__label">{{ item().label }}</span>
      </a>
    } @else {
      <!-- Clickable without router (custom handling) -->
      <button 
        type="button"
        class="lib-breadcrumb-item__button"
        (click)="handleClick($event)"
      >
        @if (item().icon) {
          <span class="lib-breadcrumb-item__icon" aria-hidden="true">{{ item().icon }}</span>
        }
        <span class="lib-breadcrumb-item__label">{{ item().label }}</span>
      </button>
    }
  `,
  styleUrl: './breadcrumb-item.component.css',
})
export class BreadcrumbItemComponent {
  private readonly router = inject(Router);

  /** The breadcrumb item data */
  readonly item = input.required<BreadcrumbItem>();

  /** Index in the trail */
  readonly index = input<number>(0);

  /** Whether to use Router for navigation */
  readonly navigate = input<boolean>(true);

  /** Click event */
  readonly itemClick = output<BreadcrumbClickEvent>();

  /** Handle click on breadcrumb */
  handleClick(event: MouseEvent): void {
    const item = this.item();

    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({
      item,
      index: this.index(),
      event,
    });
  }
}
