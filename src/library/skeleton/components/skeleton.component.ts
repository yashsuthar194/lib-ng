/**
 * Skeleton Component
 *
 * Base skeleton loading indicator with flexible shapes and GPU-accelerated animations.
 * This component is the building block for all skeleton patterns.
 *
 * @example
 * <!-- Basic text skeleton -->
 * <lib-skeleton />
 *
 * <!-- Circle for avatars -->
 * <lib-skeleton variant="circle" size="lg" />
 *
 * <!-- Custom dimensions -->
 * <lib-skeleton width="200px" height="48px" />
 *
 * <!-- Multiple skeletons -->
 * <lib-skeleton [count]="3" />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import type {
  SkeletonVariant,
  SkeletonAnimation,
  SkeletonSize,
  SkeletonSpeed,
} from '../types/skeleton.types';
import {
  DEFAULT_SKELETON_CONFIG,
  SKELETON_SIZE_MAP,
  SKELETON_CIRCLE_SIZES,
  SKELETON_SPEED_MAP,
} from '../types/skeleton.types';

@Component({
  selector: 'lib-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-skeleton-host',
    '[class.lib-skeleton--full-width]': 'isFullWidth()',
    '[class.lib-skeleton--slow]': 'speed() === "slow"',
    '[class.lib-skeleton--fast]': 'speed() === "fast"',
    '[style.--skeleton-width]': 'computedWidth()',
    '[style.--skeleton-height]': 'computedHeight()',
    '[style.--skeleton-radius]': 'computedRadius()',
    '[style.--skeleton-duration]': 'computedDuration()',
    '[style.--skeleton-gap]': 'computedGap()',
    '[attr.role]': '"status"',
    '[attr.aria-busy]': '"true"',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    @for (i of countArray(); track i) {
      <div
        class="lib-skeleton"
        [class.lib-skeleton--text]="variant() === 'text'"
        [class.lib-skeleton--circle]="variant() === 'circle'"
        [class.lib-skeleton--rectangle]="variant() === 'rectangle'"
        [class.lib-skeleton--rounded]="variant() === 'rounded'"
        [class.lib-skeleton--square]="variant() === 'square'"
        [class.lib-skeleton--shimmer]="effectiveAnimation() === 'shimmer'"
        [class.lib-skeleton--pulse]="effectiveAnimation() === 'pulse'"
        [class.lib-skeleton--wave]="effectiveAnimation() === 'wave'"
        [style.width]="computedWidth()"
        [style.height]="computedHeight()"
        [style.border-radius]="computedRadius()"
      >
        <span class="lib-skeleton__sr-only">Loading...</span>
      </div>
    }
  `,
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Shape variant */
  readonly variant = input<SkeletonVariant>(DEFAULT_SKELETON_CONFIG.variant);

  /** Size preset */
  readonly size = input<SkeletonSize>(DEFAULT_SKELETON_CONFIG.size);

  /** Custom width (overrides size) */
  readonly width = input<string | null>(null);

  /** Custom height (overrides size) */
  readonly height = input<string | null>(null);

  /** Animation type */
  readonly animation = input<SkeletonAnimation>(
    DEFAULT_SKELETON_CONFIG.animation
  );

  /** Animation speed */
  readonly speed = input<SkeletonSpeed>(DEFAULT_SKELETON_CONFIG.speed);

  /** Number of skeleton elements to render */
  readonly count = input<number>(DEFAULT_SKELETON_CONFIG.count);

  /** Custom border radius */
  readonly borderRadius = input<string | null>(null);

  /** Enable/disable animation */
  readonly animated = input<boolean>(DEFAULT_SKELETON_CONFIG.animated);

  /** Accessibility label */
  readonly ariaLabel = input<string>('Loading content');

  /** Gap between multiple skeletons */
  readonly gap = input<SkeletonSize>('sm');

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /** Array for @for loop */
  readonly countArray = computed(() =>
    Array.from({ length: this.count() }, (_, i) => i)
  );

  /** Effective animation (respects animated flag) */
  readonly effectiveAnimation = computed(() =>
    this.animated() ? this.animation() : 'none'
  );

  /** Check if full width needed */
  readonly isFullWidth = computed(() => {
    const w = this.width();
    return w === '100%' || w === 'full' || this.size() === 'full';
  });

  /** Computed width based on variant and inputs */
  readonly computedWidth = computed(() => {
    // Custom width takes priority
    const customWidth = this.width();
    if (customWidth) return customWidth;

    const variant = this.variant();
    const size = this.size();

    // Circle/Square use specific size mappings
    if (variant === 'circle' || variant === 'square') {
      return SKELETON_CIRCLE_SIZES[size] ?? SKELETON_CIRCLE_SIZES.md;
    }

    // Text defaults to 100% width
    if (variant === 'text') {
      return '100%';
    }

    // Rectangle uses size map or 100%
    return size === 'full' ? '100%' : SKELETON_SIZE_MAP[size] ?? '100%';
  });

  /** Computed height based on variant and inputs */
  readonly computedHeight = computed(() => {
    // Custom height takes priority
    const customHeight = this.height();
    if (customHeight) return customHeight;

    const variant = this.variant();
    const size = this.size();

    // Circle/Square use width for height (aspect ratio 1)
    if (variant === 'circle' || variant === 'square') {
      return SKELETON_CIRCLE_SIZES[size] ?? SKELETON_CIRCLE_SIZES.md;
    }

    // Text/Rectangle use height map
    return SKELETON_SIZE_MAP[size] ?? SKELETON_SIZE_MAP.md;
  });

  /** Computed border radius */
  readonly computedRadius = computed(() => {
    // Custom radius takes priority
    const customRadius = this.borderRadius();
    if (customRadius) return customRadius;

    const variant = this.variant();

    switch (variant) {
      case 'circle':
        return '50%';
      case 'rectangle':
        return '0';
      case 'rounded':
        return 'var(--lib-border-radius-lg, 8px)';
      case 'square':
        return 'var(--lib-border-radius-base, 4px)';
      case 'text':
      default:
        return 'var(--lib-border-radius-sm, 2px)';
    }
  });

  /** Computed animation duration */
  readonly computedDuration = computed(() => {
    const speed = this.speed();
    return SKELETON_SPEED_MAP[speed] ?? SKELETON_SPEED_MAP.normal;
  });

  /** Computed gap between items */
  readonly computedGap = computed(() => {
    const gap = this.gap();
    return SKELETON_SIZE_MAP[gap] ?? SKELETON_SIZE_MAP.sm;
  });
}
