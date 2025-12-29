import { Component, input, contentChildren, ChangeDetectionStrategy } from '@angular/core';
import { OptionComponent } from '../option/option.component';

/**
 * Groups related options within a lib-select.
 *
 * @example
 * ```html
 * <lib-option-group label="North America">
 *   <lib-option value="us">United States</lib-option>
 *   <lib-option value="ca">Canada</lib-option>
 * </lib-option-group>
 * ```
 */
@Component({
  selector: 'lib-option-group',
  standalone: true,
  template: `
    <div class="lib-option-group__label">{{ label() }}</div>
    <div class="lib-option-group__options">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .lib-option-group__label {
        padding: var(--lib-spacing-2) var(--lib-spacing-3);
        font-size: var(--lib-font-size-xs);
        font-weight: var(--lib-font-weight-semibold);
        color: var(--lib-color-neutral-500);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: var(--lib-color-neutral-50);
        border-block-end: var(--lib-border-width-thin) solid var(--lib-color-neutral-100);
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .lib-option-group__options {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[attr.aria-label]': 'label()',
    '[class.lib-option-group]': 'true',
  },
})
export class OptionGroupComponent {
  /** Label displayed as the group header */
  readonly label = input.required<string>();

  /**
   * Child options within this group.
   * Used by parent Select to query all options.
   */
  readonly options = contentChildren(OptionComponent);
}
