/**
 * Card Component
 * 
 * Container component using composition pattern.
 * 
 * @example
 * <lib-card>
 *   <lib-card-header>Title</lib-card-header>
 *   <lib-card-content>Body</lib-card-content>
 * </lib-card>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import type { CardVariant } from '../types/card.types';

@Component({
  selector: 'lib-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-card',
    '[class.lib-card--elevated]': 'variant() === "elevated"',
    '[class.lib-card--outlined]': 'variant() === "outlined"',
    '[class.lib-card--filled]': 'variant() === "filled"',
    '[class.lib-card--clickable]': 'clickable()',
    '[attr.tabindex]': 'clickable() ? 0 : null',
    '[attr.role]': 'clickable() ? "button" : null',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleClick()',
    '(keydown.space)': 'handleKeyPress($event)',
  },
  template: `<ng-content />`,
  styleUrl: './card.component.css',
})
export class CardComponent {
  /** Visual variant */
  readonly variant = input<CardVariant>('elevated');
  
  /** Make card clickable */  
  readonly clickable = input<boolean>(false);
  
  /** Emitted when clickable card is activated */
  readonly cardClick = output<void>();

  handleClick(): void {
    if (this.clickable()) {
      this.cardClick.emit();
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (this.clickable()) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
