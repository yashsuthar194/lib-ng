/**
 * Card Content Component
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-card-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'lib-card-content' },
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        padding: var(--lib-spacing-4, 16px);
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-700, #374151);
        line-height: var(--lib-line-height-normal, 1.5);
      }
    `,
  ],
})
export class CardContentComponent {}
