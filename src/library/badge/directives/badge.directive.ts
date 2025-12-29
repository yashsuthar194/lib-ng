/**
 * Badge Directive
 *
 * Attaches a badge to any element as an overlay.
 *
 * @example
 * <!-- Notification count on icon -->
 * <button [libBadge]="unreadCount" libBadgeVariant="error">
 *   <icon name="bell"></icon>
 * </button>
 *
 * <!-- Status indicator on avatar -->
 * <img libBadge libBadgeShape="dot" libBadgeStatus="online" />
 *
 * <!-- With pulse animation -->
 * <button [libBadge]="newMessages" [libBadgePulse]="newMessages > 0">
 *   Messages
 * </button>
 */

import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  input,
  computed,
  effect,
  Renderer2,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type {
  BadgeVariant,
  BadgeAppearance,
  BadgeSize,
  BadgePosition,
  BadgeShape,
  BadgeStatus,
  BadgeContent,
} from '../types/badge.types';
import { DEFAULT_BADGE_CONFIG } from '../types/badge.types';
import { formatBadgeValue, shouldHideBadge } from '../utils/badge-utils';

@Directive({
  selector: '[libBadge]',
  standalone: true,
  exportAs: 'libBadge',
  host: {
    class: 'lib-badge-container',
    '[style.position]': '"relative"',
    '[style.display]': '"inline-flex"',
  },
})
export class BadgeDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  // ========================================
  // Inputs
  // ========================================

  /** Badge content (number, string, or null for dot) */
  readonly libBadge = input<BadgeContent>(null);

  /** Semantic variant */
  readonly libBadgeVariant = input<BadgeVariant>(DEFAULT_BADGE_CONFIG.variant);

  /** Visual appearance */
  readonly libBadgeAppearance = input<BadgeAppearance>(DEFAULT_BADGE_CONFIG.appearance);

  /** Size */
  readonly libBadgeSize = input<BadgeSize>(DEFAULT_BADGE_CONFIG.size);

  /** Position relative to host element */
  readonly libBadgePosition = input<BadgePosition>(DEFAULT_BADGE_CONFIG.position);

  /** Shape */
  readonly libBadgeShape = input<BadgeShape>(DEFAULT_BADGE_CONFIG.shape);

  /** Status indicator */
  readonly libBadgeStatus = input<BadgeStatus>(DEFAULT_BADGE_CONFIG.status);

  /** Maximum value before showing "+" */
  readonly libBadgeMaxValue = input<number>(DEFAULT_BADGE_CONFIG.maxValue);

  /** Hide when value is 0 */
  readonly libBadgeHideZero = input<boolean>(DEFAULT_BADGE_CONFIG.hideZero);

  /** Enable pulse animation */
  readonly libBadgePulse = input<boolean>(false);

  /** Enable gradient effect */
  readonly libBadgeGradient = input<boolean>(false);

  /** Custom aria label */
  readonly libBadgeLabel = input<string>('');

  /** Custom background color (overrides variant) */
  readonly libBadgeBgColor = input<string | null>(null);

  /** Custom text color (overrides variant) */
  readonly libBadgeTextColor = input<string | null>(null);

  // ========================================
  // Private State
  // ========================================

  private badgeElement: HTMLElement | null = null;

  // ========================================
  // Computed
  // ========================================

  /** Whether badge should be visible */
  readonly isVisible = computed(() => !shouldHideBadge(this.libBadge(), this.libBadgeHideZero()));

  /** Formatted content */
  readonly displayContent = computed(() => {
    const value = this.libBadge();
    if (value === null || value === '' || this.libBadgeShape() === 'dot') return '';
    if (typeof value === 'number') {
      return formatBadgeValue(value, this.libBadgeMaxValue());
    }
    return value.toString();
  });

  // ========================================
  // Lifecycle
  // ========================================

  constructor() {
    // React to input changes
    effect(() => {
      // Read all inputs to track them
      this.libBadge();
      this.libBadgeVariant();
      this.libBadgeAppearance();
      this.libBadgeSize();
      this.libBadgePosition();
      this.libBadgeShape();
      this.libBadgeStatus();
      this.libBadgeMaxValue();
      this.libBadgeHideZero();
      this.libBadgePulse();
      this.libBadgeGradient();
      this.libBadgeLabel();
      this.libBadgeBgColor();
      this.libBadgeTextColor();

      if (this.badgeElement) {
        this.updateBadge();
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createBadge();
    }
  }

  ngOnDestroy(): void {
    if (this.badgeElement) {
      this.badgeElement.remove();
      this.badgeElement = null;
    }
  }

  // ========================================
  // Private Methods
  // ========================================

  private createBadge(): void {
    this.badgeElement = this.renderer.createElement('span');
    this.updateBadge();
    this.renderer.appendChild(this.elementRef.nativeElement, this.badgeElement);
  }

  private updateBadge(): void {
    if (!this.badgeElement) return;

    // Update visibility
    if (!this.isVisible()) {
      this.renderer.setStyle(this.badgeElement, 'display', 'none');
      return;
    }
    this.renderer.removeStyle(this.badgeElement, 'display');

    // Update content
    this.badgeElement.textContent = this.displayContent();

    // Build class list
    const classes = [
      'lib-badge',
      'lib-badge--overlay',
      `lib-badge--${this.libBadgeVariant()}`,
      `lib-badge--${this.libBadgeAppearance()}`,
      `lib-badge--${this.libBadgeSize()}`,
      `lib-badge--${this.libBadgeShape()}`,
      `lib-badge--position-${this.libBadgePosition()}`,
    ];

    if (this.libBadgePulse()) classes.push('lib-badge--pulse');
    if (this.libBadgeGradient()) classes.push('lib-badge--gradient');
    if (this.libBadgeStatus() !== 'none') {
      classes.push(`lib-badge--status-${this.libBadgeStatus()}`);
    }

    // Apply classes
    this.badgeElement.className = classes.join(' ');

    // Apply custom colors as CSS custom properties
    // Note: Renderer2.setStyle doesn't work with CSS variables, use native setProperty
    if (this.libBadgeBgColor()) {
      this.badgeElement.style.setProperty('--badge-bg', this.libBadgeBgColor());
    } else {
      this.badgeElement.style.removeProperty('--badge-bg');
    }
    if (this.libBadgeTextColor()) {
      this.badgeElement.style.setProperty('--badge-text', this.libBadgeTextColor());
    } else {
      this.badgeElement.style.removeProperty('--badge-text');
    }

    // Update ARIA
    this.renderer.setAttribute(this.badgeElement, 'role', 'status');
    this.renderer.setAttribute(this.badgeElement, 'aria-label', this.getAriaLabel());
  }

  private getAriaLabel(): string {
    if (this.libBadgeLabel()) return this.libBadgeLabel();

    const content = this.libBadge();
    if (this.libBadgeShape() === 'dot') {
      return this.libBadgeStatus() !== 'none' ? `Status: ${this.libBadgeStatus()}` : 'Notification';
    }

    if (typeof content === 'number') {
      return `${content} ${content === 1 ? 'notification' : 'notifications'}`;
    }

    return content?.toString() || '';
  }
}
