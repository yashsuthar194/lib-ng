/**
 * Badge Component
 *
 * Inline badge for displaying counts, labels, or status indicators.
 *
 * @example
 * <!-- Basic usage -->
 * <lib-badge>New</lib-badge>
 * <lib-badge [content]="5" variant="error"></lib-badge>
 *
 * <!-- With pulse animation -->
 * <lib-badge [content]="3" [pulse]="true" variant="error">3</lib-badge>
 *
 * <!-- Status indicator -->
 * <lib-badge shape="dot" status="online"></lib-badge>
 *
 * <!-- Gradient border effect -->
 * <lib-badge appearance="outlined" [gradient]="true">Pro</lib-badge>
 */

import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import type {
  BadgeVariant,
  BadgeAppearance,
  BadgeSize,
  BadgeShape,
  BadgeStatus,
  BadgeContent,
} from '../types/badge.types';
import { DEFAULT_BADGE_CONFIG } from '../types/badge.types';
import { formatBadgeValue, shouldHideBadge } from '../utils/badge-utils';

@Component({
  selector: 'lib-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-badge',
    // Variant classes
    '[class.lib-badge--primary]': 'variant() === "primary"',
    '[class.lib-badge--secondary]': 'variant() === "secondary"',
    '[class.lib-badge--success]': 'variant() === "success"',
    '[class.lib-badge--warning]': 'variant() === "warning"',
    '[class.lib-badge--error]': 'variant() === "error"',
    '[class.lib-badge--info]': 'variant() === "info"',
    '[class.lib-badge--neutral]': 'variant() === "neutral"',
    // Appearance classes
    '[class.lib-badge--filled]': 'appearance() === "filled"',
    '[class.lib-badge--outlined]': 'appearance() === "outlined"',
    '[class.lib-badge--soft]': 'appearance() === "soft"',
    '[class.lib-badge--ghost]': 'appearance() === "ghost"',
    // Size classes
    '[class.lib-badge--xs]': 'size() === "xs"',
    '[class.lib-badge--sm]': 'size() === "sm"',
    '[class.lib-badge--md]': 'size() === "md"',
    '[class.lib-badge--lg]': 'size() === "lg"',
    // Shape classes
    '[class.lib-badge--rounded]': 'shape() === "rounded"',
    '[class.lib-badge--pill]': 'shape() === "pill"',
    '[class.lib-badge--square]': 'shape() === "square"',
    '[class.lib-badge--dot]': 'shape() === "dot"',
    // Feature classes
    '[class.lib-badge--pulse]': 'pulse()',
    '[class.lib-badge--gradient]': 'gradient()',
    '[class.lib-badge--hidden]': 'isHidden()',
    // Status classes
    '[class.lib-badge--status-online]': 'status() === "online"',
    '[class.lib-badge--status-offline]': 'status() === "offline"',
    '[class.lib-badge--status-busy]': 'status() === "busy"',
    '[class.lib-badge--status-away]': 'status() === "away"',
    // Custom color overrides
    '[style.--badge-bg]': 'bgColor()',
    '[style.--badge-text]': 'textColor()',
    // Accessibility
    '[attr.role]': '"status"',
    '[attr.aria-label]': 'ariaLabel()',
  },
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  // ========================================
  // Inputs
  // ========================================

  /** Badge content (number or text) */
  readonly content = input<BadgeContent>(null);

  /** Semantic variant */
  readonly variant = input<BadgeVariant>(DEFAULT_BADGE_CONFIG.variant);

  /** Visual appearance */
  readonly appearance = input<BadgeAppearance>(DEFAULT_BADGE_CONFIG.appearance);

  /** Size */
  readonly size = input<BadgeSize>(DEFAULT_BADGE_CONFIG.size);

  /** Shape */
  readonly shape = input<BadgeShape>(DEFAULT_BADGE_CONFIG.shape);

  /** Status indicator type */
  readonly status = input<BadgeStatus>(DEFAULT_BADGE_CONFIG.status);

  /** Maximum value before showing "+" */
  readonly maxValue = input<number>(DEFAULT_BADGE_CONFIG.maxValue);

  /** Hide badge when value is 0 */
  readonly hideZero = input<boolean>(DEFAULT_BADGE_CONFIG.hideZero);

  /** Enable pulse animation */
  readonly pulse = input<boolean>(DEFAULT_BADGE_CONFIG.pulse);

  /** Enable gradient border effect */
  readonly gradient = input<boolean>(false);

  /** Custom aria label */
  readonly label = input<string>('');

  /** Custom background color (overrides variant) */
  readonly bgColor = input<string | null>(null);

  /** Custom text color (overrides variant) */
  readonly textColor = input<string | null>(null);

  // ========================================
  // Computed Properties
  // ========================================

  /** Formatted display content */
  readonly displayContent = computed(() => {
    const value = this.content();
    if (value === null || value === '') return '';
    if (typeof value === 'number') {
      return formatBadgeValue(value, this.maxValue());
    }
    return value;
  });

  /** Whether badge should be hidden */
  readonly isHidden = computed(() => shouldHideBadge(this.content(), this.hideZero()));

  /** Accessible label for screen readers */
  readonly ariaLabel = computed(() => {
    if (this.label()) return this.label();

    const content = this.content();
    if (this.shape() === 'dot') {
      return this.status() !== 'none' ? `Status: ${this.status()}` : 'Notification indicator';
    }

    if (typeof content === 'number') {
      return `${content} ${content === 1 ? 'notification' : 'notifications'}`;
    }

    return content?.toString() || '';
  });
}
