/**
 * Skeleton Text Component
 *
 * Specialized component for realistic multi-line text skeleton patterns.
 * Automatically creates natural-looking paragraph placeholders with varying line widths.
 *
 * @example
 * <!-- Simple paragraph -->
 * <lib-skeleton-text [lines]="3" />
 *
 * <!-- Heading style -->
 * <lib-skeleton-text heading />
 *
 * <!-- With shorter last line -->
 * <lib-skeleton-text [lines]="4" [lastLineWidth]="60" />
 *
 * <!-- Custom line widths -->
 * <lib-skeleton-text [widths]="[100, 95, 80, 60]" />
 */

import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import type {
  SkeletonAnimation,
  SkeletonSize,
  SkeletonSpeed,
  SkeletonHeadingLevel,
} from '../types/skeleton.types';
import {
  DEFAULT_TEXT_SKELETON_CONFIG,
  SKELETON_SIZE_MAP,
  SKELETON_HEADING_SIZES,
} from '../types/skeleton.types';

interface LineConfig {
  width: string;
  height: string;
  index: number;
}

@Component({
  selector: 'lib-skeleton-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-skeleton-text',
    '[class.lib-skeleton-text--heading]': 'heading()',
    '[style.--skeleton-text-gap]': 'computedGap()',
    '[attr.role]': '"status"',
    '[attr.aria-busy]': '"true"',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    @for (line of lineConfigs(); track line.index) {
      <div
        class="lib-skeleton-text__line"
        [class.lib-skeleton-text__line--shimmer]="effectiveAnimation() === 'shimmer'"
        [class.lib-skeleton-text__line--pulse]="effectiveAnimation() === 'pulse'"
        [class.lib-skeleton-text__line--wave]="effectiveAnimation() === 'wave'"
        [style.width]="line.width"
        [style.height]="line.height"
        [style.animation-delay]="stagger() ? line.index * staggerDelay() + 'ms' : '0ms'"
      ></div>
    }
    <span class="lib-skeleton-text__sr-only">Loading text...</span>
  `,
  styleUrl: './skeleton-text.component.css',
})
export class SkeletonTextComponent {
  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Number of text lines */
  readonly lines = input<number>(DEFAULT_TEXT_SKELETON_CONFIG.lines);

  /** Heading style (larger, full width) */
  readonly heading = input<boolean>(DEFAULT_TEXT_SKELETON_CONFIG.heading);

  /** Heading level for size */
  readonly headingLevel = input<SkeletonHeadingLevel>(DEFAULT_TEXT_SKELETON_CONFIG.headingLevel);

  /** Last line width percentage (0-100) */
  readonly lastLineWidth = input<number>(DEFAULT_TEXT_SKELETON_CONFIG.lastLineWidth);

  /** Randomize line widths slightly */
  readonly randomize = input<boolean>(DEFAULT_TEXT_SKELETON_CONFIG.randomize);

  /** Custom line widths array (overrides auto) */
  readonly widths = input<number[] | null>(null);

  /** Line spacing (gap between lines) */
  readonly spacing = input<SkeletonSize>(DEFAULT_TEXT_SKELETON_CONFIG.spacing);

  /** Force all lines to full width */
  readonly fullWidth = input<boolean>(DEFAULT_TEXT_SKELETON_CONFIG.fullWidth);

  /** Animation type */
  readonly animation = input<SkeletonAnimation>('shimmer');

  /** Animation speed */
  readonly speed = input<SkeletonSpeed>('normal');

  /** Enable staggered animation */
  readonly stagger = input<boolean>(true);

  /** Stagger delay in ms */
  readonly staggerDelay = input<number>(50);

  /** Enable/disable animation */
  readonly animated = input<boolean>(true);

  /** Accessibility label */
  readonly ariaLabel = input<string>('Loading text content');

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /** Effective animation (respects animated flag) */
  readonly effectiveAnimation = computed(() => (this.animated() ? this.animation() : 'none'));

  /** Computed gap between lines */
  readonly computedGap = computed(() => {
    const spacing = this.spacing();
    return SKELETON_SIZE_MAP[spacing] ?? SKELETON_SIZE_MAP.sm;
  });

  /** Computed line height */
  readonly computedLineHeight = computed(() => {
    if (this.heading()) {
      const level = this.headingLevel();
      return SKELETON_HEADING_SIZES[level] ?? SKELETON_HEADING_SIZES.h2;
    }
    return '1em';
  });

  /** Generate line configurations with widths */
  readonly lineConfigs = computed((): LineConfig[] => {
    const count = this.lines();
    const customWidths = this.widths();
    const isHeading = this.heading();
    const isFull = this.fullWidth();
    const lastWidth = this.lastLineWidth();
    const shouldRandomize = this.randomize();
    const lineHeight = this.computedLineHeight();

    return Array.from({ length: count }, (_, index) => {
      let width: number;

      if (customWidths && customWidths[index] !== undefined) {
        // Use custom width if provided
        width = customWidths[index];
      } else if (isHeading || isFull) {
        // Headings and fullWidth get 100%
        width = 100;
      } else if (index === count - 1 && count > 1) {
        // Last line is shorter (natural paragraph appearance)
        width = lastWidth;
      } else {
        // Default to full width with optional randomization
        width = shouldRandomize ? 100 - Math.random() * 15 : 100;
      }

      return {
        width: `${Math.round(width)}%`,
        height: lineHeight,
        index,
      };
    });
  });
}
