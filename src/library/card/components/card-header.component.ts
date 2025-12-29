/**
 * Card Header Component
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'lib-card-header' },
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        padding: var(--lib-spacing-4, 16px) var(--lib-spacing-4, 16px) 0;
      }

      :host ::ng-deep h1,
      :host ::ng-deep h2,
      :host ::ng-deep h3,
      :host ::ng-deep h4 {
        margin: 0 0 var(--lib-spacing-1, 4px);
        font-size: var(--lib-font-size-lg, 1.125rem);
        font-weight: var(--lib-font-weight-semibold, 600);
        color: var(--lib-color-neutral-900, #18181b);
      }

      :host ::ng-deep p {
        margin: 0;
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-500, #71717a);
      }
    `,
  ],
})
export class CardHeaderComponent {}
