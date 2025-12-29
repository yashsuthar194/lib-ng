/**
 * Tooltip Component
 *
 * Renders the tooltip content with styling and arrow.
 */

import { Component, ChangeDetectionStrategy, input, computed, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type { TooltipVariant, TooltipPosition } from '../types/tooltip.types';

@Component({
  selector: 'lib-tooltip',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-tooltip',
    '[class.lib-tooltip--visible]': 'isVisible()',
    '[class.lib-tooltip--info]': 'variant() === "info"',
    '[class.lib-tooltip--warning]': 'variant() === "warning"',
    '[class.lib-tooltip--error]': 'variant() === "error"',
    '[class.lib-tooltip--top]': 'positionBase() === "top"',
    '[class.lib-tooltip--bottom]': 'positionBase() === "bottom"',
    '[class.lib-tooltip--left]': 'positionBase() === "left"',
    '[class.lib-tooltip--right]': 'positionBase() === "right"',
    '[attr.id]': 'id()',
    '[style.left.px]': 'x()',
    '[style.top.px]': 'y()',
    role: 'tooltip',
  },
  template: `
    <div class="lib-tooltip__content">
      @if (isString()) {
        {{ stringContent() }}
      } @else {
        <ng-container [ngTemplateOutlet]="templateContent()" />
      }
    </div>
    @if (showArrow()) {
      <div class="lib-tooltip__arrow" [style.left.px]="arrowX()" [style.top.px]="arrowY()"></div>
    }
  `,
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  readonly id = input.required<string>();
  readonly content = input.required<string | TemplateRef<unknown>>();
  readonly variant = input<TooltipVariant>('default');
  readonly position = input<TooltipPosition>('top');
  readonly showArrow = input<boolean>(true);
  readonly isVisible = input<boolean>(false);
  readonly x = input<number>(0);
  readonly y = input<number>(0);
  readonly arrowX = input<number | undefined>(undefined);
  readonly arrowY = input<number | undefined>(undefined);

  /** Check if content is string */
  readonly isString = computed(() => typeof this.content() === 'string');

  /** Get string content */
  readonly stringContent = computed(() => this.content() as string);

  /** Get template content */
  readonly templateContent = computed(() => this.content() as TemplateRef<unknown>);

  /** Get base position (top/bottom/left/right) */
  readonly positionBase = computed(() => this.position().split('-')[0]);
}
