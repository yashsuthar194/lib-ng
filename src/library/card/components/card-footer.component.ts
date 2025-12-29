/**
 * Card Footer Component
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'lib-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-card-footer',
    '[class.lib-card-footer--divider]': 'divider()',
  },
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: flex;
        gap: var(--lib-spacing-2, 8px);
        padding: 0 var(--lib-spacing-4, 16px) var(--lib-spacing-4, 16px);
      }

      :host(.lib-card-footer--divider) {
        padding-block-start: var(--lib-spacing-4, 16px);
        border-block-start: 1px solid var(--lib-color-neutral-200, #e5e7eb);
        margin-block-start: auto;
      }
    `,
  ],
})
export class CardFooterComponent {
  /** Show divider line above footer */
  readonly divider = input<boolean>(false);
}
