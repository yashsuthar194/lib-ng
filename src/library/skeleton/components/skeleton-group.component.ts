/**
 * Skeleton Group Component
 *
 * Container component for complex skeleton layouts with 40+ presets.
 * Supports preset-based layouts, custom composition, and staggered animations.
 *
 * @example
 * <!-- Using preset -->
 * <lib-skeleton-group preset="card" />
 * <lib-skeleton-group preset="list-item-avatar" [repeat]="5" />
 *
 * <!-- Custom composition -->
 * <lib-skeleton-group layout="horizontal" gap="md">
 *   <lib-skeleton variant="circle" size="lg" />
 *   <lib-skeleton-text [lines]="2" />
 * </lib-skeleton-group>
 */

import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import type {
  SkeletonPreset,
  SkeletonAnimation,
  SkeletonSize,
  SkeletonLayout,
  SkeletonSpeed,
} from '../types/skeleton.types';
import { DEFAULT_GROUP_SKELETON_CONFIG, SKELETON_SIZE_MAP } from '../types/skeleton.types';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonTextComponent } from './skeleton-text.component';

@Component({
  selector: 'lib-skeleton-group',
  standalone: true,
  imports: [SkeletonComponent, SkeletonTextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-skeleton-group',
    '[class.lib-skeleton-group--horizontal]': 'effectiveLayout() === "horizontal"',
    '[class.lib-skeleton-group--vertical]': 'effectiveLayout() === "vertical"',
    '[style.--skeleton-group-gap]': 'computedGap()',
    '[style.--skeleton-group-columns]': 'columns()',
    '[attr.role]': '"status"',
    '[attr.aria-busy]': '"true"',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    @if (preset()) {
      <!-- Preset-based rendering -->
      @for (i of repeatArray(); track i) {
        <div
          class="lib-skeleton-group__item"
          [style.animation-delay]="stagger() ? i * staggerDelay() + 'ms' : '0ms'"
        >
          @switch (preset()) {
            <!-- Content Cards -->
            @case ('card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--card">
                <lib-skeleton variant="rectangle" width="100%" height="160px" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="60%" height="1.25rem" />
                  <lib-skeleton-text [lines]="2" spacing="xs" />
                </div>
              </div>
            }
            @case ('card-horizontal') {
              <div class="lib-skeleton-preset lib-skeleton-preset--card-horizontal">
                <lib-skeleton variant="rounded" width="120px" height="100%" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="70%" height="1.25rem" />
                  <lib-skeleton-text [lines]="2" spacing="xs" />
                </div>
              </div>
            }
            @case ('card-compact') {
              <div class="lib-skeleton-preset lib-skeleton-preset--card-compact">
                <lib-skeleton width="50%" height="1rem" />
                <lib-skeleton width="80%" height="0.875rem" />
              </div>
            }
            @case ('product-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--product-card">
                <lib-skeleton variant="rounded" width="100%" height="200px" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="80%" height="1rem" />
                  <lib-skeleton width="40%" height="0.875rem" />
                  <div class="lib-skeleton-preset__row">
                    <lib-skeleton width="60px" height="1.25rem" />
                    <lib-skeleton variant="rounded" width="80px" height="32px" />
                  </div>
                </div>
              </div>
            }
            @case ('article-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--article-card">
                <lib-skeleton variant="rounded" width="100%" height="180px" />
                <div class="lib-skeleton-preset__body">
                  <div class="lib-skeleton-preset__row">
                    <lib-skeleton width="60px" height="0.75rem" />
                    <lib-skeleton width="80px" height="0.75rem" />
                  </div>
                  <lib-skeleton width="90%" height="1.25rem" />
                  <lib-skeleton-text [lines]="2" spacing="xs" />
                </div>
              </div>
            }

            <!-- Lists & Items -->
            @case ('list-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--list-item">
                <lib-skeleton width="70%" height="1rem" />
                <lib-skeleton width="50%" height="0.875rem" />
              </div>
            }
            @case ('list-item-avatar') {
              <div class="lib-skeleton-preset lib-skeleton-preset--list-item-avatar">
                <lib-skeleton variant="circle" size="md" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="60%" height="1rem" />
                  <lib-skeleton width="40%" height="0.875rem" />
                </div>
              </div>
            }
            @case ('list-item-media') {
              <div class="lib-skeleton-preset lib-skeleton-preset--list-item-media">
                <lib-skeleton variant="rounded" width="64px" height="64px" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="70%" height="1rem" />
                  <lib-skeleton width="50%" height="0.875rem" />
                  <lib-skeleton width="30%" height="0.75rem" />
                </div>
              </div>
            }
            @case ('list-item-action') {
              <div class="lib-skeleton-preset lib-skeleton-preset--list-item-action">
                <lib-skeleton variant="circle" size="md" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="60%" height="1rem" />
                  <lib-skeleton width="40%" height="0.875rem" />
                </div>
                <lib-skeleton variant="rounded" width="70px" height="32px" />
              </div>
            }

            <!-- Tables & Data -->
            @case ('table-row') {
              <div class="lib-skeleton-preset lib-skeleton-preset--table-row">
                @for (col of columnsArray(); track col) {
                  <lib-skeleton width="80%" height="1rem" />
                }
              </div>
            }
            @case ('table-row-actions') {
              <div class="lib-skeleton-preset lib-skeleton-preset--table-row-actions">
                @for (col of columnsArray(); track col) {
                  <lib-skeleton width="80%" height="1rem" />
                }
                <div class="lib-skeleton-preset__actions">
                  <lib-skeleton variant="circle" size="sm" />
                  <lib-skeleton variant="circle" size="sm" />
                </div>
              </div>
            }
            @case ('data-grid') {
              <div class="lib-skeleton-preset lib-skeleton-preset--data-grid">
                @for (col of columnsArray(); track col) {
                  <div class="lib-skeleton-preset__cell">
                    <lib-skeleton width="80%" height="1rem" />
                    <lib-skeleton width="50%" height="0.75rem" />
                  </div>
                }
              </div>
            }

            <!-- Social & Feed -->
            @case ('social-post') {
              <div class="lib-skeleton-preset lib-skeleton-preset--social-post">
                <div class="lib-skeleton-preset__header">
                  <lib-skeleton variant="circle" size="md" />
                  <div class="lib-skeleton-preset__meta">
                    <lib-skeleton width="120px" height="1rem" />
                    <lib-skeleton width="60px" height="0.75rem" />
                  </div>
                </div>
                <lib-skeleton-text [lines]="2" />
                <lib-skeleton variant="rounded" width="100%" height="200px" />
                <div class="lib-skeleton-preset__row">
                  <lib-skeleton width="50px" height="0.875rem" />
                  <lib-skeleton width="50px" height="0.875rem" />
                  <lib-skeleton width="50px" height="0.875rem" />
                </div>
              </div>
            }
            @case ('comment') {
              <div class="lib-skeleton-preset lib-skeleton-preset--comment">
                <lib-skeleton variant="circle" size="sm" />
                <div class="lib-skeleton-preset__body">
                  <div class="lib-skeleton-preset__row">
                    <lib-skeleton width="100px" height="0.875rem" />
                    <lib-skeleton width="50px" height="0.75rem" />
                  </div>
                  <lib-skeleton-text [lines]="2" spacing="xs" />
                </div>
              </div>
            }
            @case ('feed-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--feed-item">
                <lib-skeleton variant="circle" size="xs" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="80%" height="1rem" />
                  <lib-skeleton width="60%" height="0.875rem" />
                  <lib-skeleton width="70px" height="0.75rem" />
                </div>
              </div>
            }
            @case ('notification') {
              <div class="lib-skeleton-preset lib-skeleton-preset--notification">
                <lib-skeleton variant="circle" size="sm" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="90%" height="0.875rem" />
                  <lib-skeleton width="60px" height="0.75rem" />
                </div>
              </div>
            }

            <!-- Profile & User -->
            @case ('profile-header') {
              <div class="lib-skeleton-preset lib-skeleton-preset--profile-header">
                <lib-skeleton variant="rectangle" width="100%" height="120px" />
                <div class="lib-skeleton-preset__profile-content">
                  <lib-skeleton variant="circle" size="2xl" />
                  <div class="lib-skeleton-preset__body">
                    <lib-skeleton width="150px" height="1.5rem" />
                    <lib-skeleton width="100px" height="0.875rem" />
                    <lib-skeleton-text [lines]="1" />
                  </div>
                </div>
              </div>
            }
            @case ('user-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--user-card">
                <lib-skeleton variant="circle" size="xl" />
                <lib-skeleton width="120px" height="1.125rem" />
                <lib-skeleton width="80px" height="0.875rem" />
                <lib-skeleton-text [lines]="2" spacing="xs" />
                <lib-skeleton variant="rounded" width="100px" height="36px" />
              </div>
            }
            @case ('avatar-text') {
              <div class="lib-skeleton-preset lib-skeleton-preset--avatar-text">
                <lib-skeleton variant="circle" size="md" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="120px" height="1rem" />
                  <lib-skeleton width="80px" height="0.875rem" />
                </div>
              </div>
            }
            @case ('contact-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--contact-card">
                <lib-skeleton variant="circle" size="lg" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="150px" height="1.125rem" />
                  <lib-skeleton width="180px" height="0.875rem" />
                  <lib-skeleton width="120px" height="0.875rem" />
                  <lib-skeleton width="200px" height="0.875rem" />
                </div>
              </div>
            }

            <!-- Media -->
            @case ('image') {
              <lib-skeleton variant="rounded" width="100%" height="200px" />
            }
            @case ('video') {
              <div class="lib-skeleton-preset lib-skeleton-preset--video">
                <lib-skeleton variant="rounded" width="100%" height="220px" />
                <div class="lib-skeleton-preset__row lib-skeleton-preset__controls">
                  <lib-skeleton variant="circle" size="sm" />
                  <lib-skeleton width="80%" height="4px" variant="rounded" />
                  <lib-skeleton variant="circle" size="xs" />
                </div>
              </div>
            }
            @case ('gallery-grid') {
              <div class="lib-skeleton-preset lib-skeleton-preset--gallery-grid">
                @for (col of columnsArray(); track col) {
                  <lib-skeleton variant="rounded" width="100%" height="120px" />
                }
              </div>
            }
            @case ('carousel-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--carousel-item">
                <lib-skeleton variant="rounded" width="100%" height="200px" />
                <lib-skeleton width="60%" height="1rem" />
                <lib-skeleton width="80%" height="0.875rem" />
              </div>
            }

            <!-- Navigation -->
            @case ('sidebar-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--sidebar-item">
                <lib-skeleton variant="rounded" width="20px" height="20px" />
                <lib-skeleton width="100px" height="0.875rem" />
              </div>
            }
            @case ('menu-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--menu-item">
                <lib-skeleton width="100%" height="0.875rem" />
              </div>
            }
            @case ('breadcrumb') {
              <div class="lib-skeleton-preset lib-skeleton-preset--breadcrumb">
                <lib-skeleton width="50px" height="0.875rem" />
                <span class="lib-skeleton-preset__separator">/</span>
                <lib-skeleton width="70px" height="0.875rem" />
                <span class="lib-skeleton-preset__separator">/</span>
                <lib-skeleton width="90px" height="0.875rem" />
              </div>
            }
            @case ('tab-bar') {
              <div class="lib-skeleton-preset lib-skeleton-preset--tab-bar">
                @for (col of columnsArray(); track col) {
                  <lib-skeleton width="80px" height="1rem" />
                }
              </div>
            }

            <!-- Forms -->
            @case ('form-field') {
              <div class="lib-skeleton-preset lib-skeleton-preset--form-field">
                <lib-skeleton width="80px" height="0.875rem" />
                <lib-skeleton variant="rounded" width="100%" height="40px" />
              </div>
            }
            @case ('form-group') {
              <div class="lib-skeleton-preset lib-skeleton-preset--form-group">
                <div class="lib-skeleton-preset__field">
                  <lib-skeleton width="80px" height="0.875rem" />
                  <lib-skeleton variant="rounded" width="100%" height="40px" />
                </div>
                <div class="lib-skeleton-preset__field">
                  <lib-skeleton width="100px" height="0.875rem" />
                  <lib-skeleton variant="rounded" width="100%" height="40px" />
                </div>
                <lib-skeleton variant="rounded" width="120px" height="40px" />
              </div>
            }
            @case ('search-bar') {
              <div class="lib-skeleton-preset lib-skeleton-preset--search-bar">
                <lib-skeleton variant="circle" size="sm" />
                <lib-skeleton width="100%" height="1rem" />
                <lib-skeleton variant="rounded" width="60px" height="32px" />
              </div>
            }

            <!-- Dashboard -->
            @case ('stat-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--stat-card">
                <lib-skeleton width="80px" height="0.875rem" />
                <lib-skeleton width="120px" height="2rem" />
                <lib-skeleton width="100px" height="0.75rem" />
              </div>
            }
            @case ('chart') {
              <div class="lib-skeleton-preset lib-skeleton-preset--chart">
                <lib-skeleton width="150px" height="1.125rem" />
                <lib-skeleton variant="rounded" width="100%" height="180px" />
              </div>
            }
            @case ('widget') {
              <div class="lib-skeleton-preset lib-skeleton-preset--widget">
                <div class="lib-skeleton-preset__row">
                  <lib-skeleton width="120px" height="1rem" />
                  <lib-skeleton variant="circle" size="xs" />
                </div>
                <lib-skeleton-text [lines]="3" />
              </div>
            }
            @case ('kpi-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--kpi-card">
                <div class="lib-skeleton-preset__row">
                  <lib-skeleton variant="circle" size="sm" />
                  <lib-skeleton width="100px" height="0.875rem" />
                </div>
                <lib-skeleton width="150px" height="2rem" />
                <lib-skeleton variant="rounded" width="100%" height="40px" />
                <lib-skeleton width="80px" height="0.75rem" />
              </div>
            }

            <!-- Complex Layouts -->
            @case ('hero-section') {
              <div class="lib-skeleton-preset lib-skeleton-preset--hero-section">
                <lib-skeleton width="80%" height="2.5rem" />
                <lib-skeleton width="60%" height="2rem" />
                <lib-skeleton-text [lines]="2" />
                <lib-skeleton variant="rounded" width="150px" height="48px" />
              </div>
            }
            @case ('pricing-card') {
              <div class="lib-skeleton-preset lib-skeleton-preset--pricing-card">
                <lib-skeleton width="100px" height="1.25rem" />
                <lib-skeleton width="80px" height="2rem" />
                <lib-skeleton width="60px" height="0.875rem" />
                <div class="lib-skeleton-preset__features">
                  <lib-skeleton width="90%" height="0.875rem" />
                  <lib-skeleton width="85%" height="0.875rem" />
                  <lib-skeleton width="80%" height="0.875rem" />
                  <lib-skeleton width="88%" height="0.875rem" />
                </div>
                <lib-skeleton variant="rounded" width="100%" height="44px" />
              </div>
            }
            @case ('testimonial') {
              <div class="lib-skeleton-preset lib-skeleton-preset--testimonial">
                <lib-skeleton-text [lines]="3" />
                <div class="lib-skeleton-preset__author">
                  <lib-skeleton variant="circle" size="md" />
                  <div class="lib-skeleton-preset__meta">
                    <lib-skeleton width="100px" height="1rem" />
                    <lib-skeleton width="120px" height="0.875rem" />
                  </div>
                </div>
              </div>
            }
            @case ('feature-item') {
              <div class="lib-skeleton-preset lib-skeleton-preset--feature-item">
                <lib-skeleton variant="rounded" width="48px" height="48px" />
                <div class="lib-skeleton-preset__body">
                  <lib-skeleton width="150px" height="1.125rem" />
                  <lib-skeleton-text [lines]="2" spacing="xs" />
                </div>
              </div>
            }

            @default {
              <!-- Fallback to simple skeleton -->
              <lib-skeleton />
            }
          }
        </div>
      }
    } @else {
      <!-- Content projection for custom layouts -->
      <ng-content />
    }
    <span class="lib-skeleton-group__sr-only">Loading content...</span>
  `,
  styleUrl: './skeleton-group.component.css',
})
export class SkeletonGroupComponent {
  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Layout preset */
  readonly preset = input<SkeletonPreset | null>(null);

  /** Layout direction (when no preset) */
  readonly layout = input<SkeletonLayout>(DEFAULT_GROUP_SKELETON_CONFIG.layout);

  /** Gap between items */
  readonly gap = input<SkeletonSize>(DEFAULT_GROUP_SKELETON_CONFIG.gap);

  /** Repeat the preset multiple times */
  readonly repeat = input<number>(DEFAULT_GROUP_SKELETON_CONFIG.repeat);

  /** Stagger animation start times */
  readonly stagger = input<boolean>(DEFAULT_GROUP_SKELETON_CONFIG.stagger);

  /** Stagger delay in ms */
  readonly staggerDelay = input<number>(DEFAULT_GROUP_SKELETON_CONFIG.staggerDelay);

  /** Number of columns (for grid presets) */
  readonly columns = input<number>(DEFAULT_GROUP_SKELETON_CONFIG.columns);

  /** Animation type */
  readonly animation = input<SkeletonAnimation>('shimmer');

  /** Animation speed */
  readonly speed = input<SkeletonSpeed>('normal');

  /** Custom width */
  readonly width = input<string>('100%');

  /** Accessibility label */
  readonly ariaLabel = input<string>('Loading content');

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /** Array for repeat @for loop */
  readonly repeatArray = computed(() => Array.from({ length: this.repeat() }, (_, i) => i));

  /** Array for columns @for loop */
  readonly columnsArray = computed(() => Array.from({ length: this.columns() }, (_, i) => i));

  /** Effective layout based on preset or input */
  readonly effectiveLayout = computed(() => {
    const presetVal = this.preset();

    // These presets have horizontal internal layout but should NOT make
    // the host container horizontal when there's repeat > 1.
    // The horizontal layout is handled within the preset's own CSS.
    // Only single-item horizontal presets should be listed here.
    const horizontalPresets: SkeletonPreset[] = [
      // Note: list-item-avatar, list-item-media, list-item-action have
      // horizontal internal layout but should stack vertically when repeated
      'avatar-text',
      'contact-card',
      'breadcrumb',
      'search-bar',
      'feature-item',
    ];

    if (presetVal && horizontalPresets.includes(presetVal)) {
      return 'horizontal';
    }

    return this.layout();
  });

  /** Computed gap */
  readonly computedGap = computed(() => {
    const gapSize = this.gap();
    return SKELETON_SIZE_MAP[gapSize] ?? SKELETON_SIZE_MAP.md;
  });
}
