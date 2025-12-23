/**
 * Progress Circle Component
 * 
 * Circular progress indicator with determinate and spinner modes.
 * 
 * @example
 * <lib-progress-circle [value]="75" />
 * <lib-progress-circle [indeterminate]="true" />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import type { ProgressVariant, ProgressSize } from '../types/progress.types';
import { PROGRESS_CIRCLE_SIZES, PROGRESS_STROKE_WIDTHS } from '../types/progress.types';

@Component({
  selector: 'lib-progress-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-progress-circle',
    '[class.lib-progress-circle--sm]': 'size() === "sm"',
    '[class.lib-progress-circle--lg]': 'size() === "lg"',
    '[class.lib-progress-circle--primary]': 'variant() === "primary"',
    '[class.lib-progress-circle--success]': 'variant() === "success"',
    '[class.lib-progress-circle--warning]': 'variant() === "warning"',
    '[class.lib-progress-circle--error]': 'variant() === "error"',
    '[class.lib-progress-circle--indeterminate]': 'indeterminate()',
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuenow]': 'indeterminate() ? null : clampedValue()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-label]': 'ariaLabel()',
    '[style.width.px]': 'dimensions().size',
    '[style.height.px]': 'dimensions().size',
  },
  template: `
    <svg 
      [attr.viewBox]="viewBox()"
      class="lib-progress-circle__svg"
    >
      <!-- Background track -->
      <circle
        class="lib-progress-circle__track"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="dimensions().strokeWidth"
        fill="none"
      />
      <!-- Progress arc -->
      <circle
        class="lib-progress-circle__fill"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="dimensions().strokeWidth"
        [attr.stroke-dasharray]="strokeDasharray()"
        [attr.stroke-dashoffset]="strokeDashoffset()"
        fill="none"
      />
    </svg>
    @if (showLabel() && !indeterminate()) {
      <span class="lib-progress-circle__label">{{ clampedValue() }}%</span>
    }
  `,
  styleUrl: './progress-circle.component.css',
})
export class ProgressCircleComponent {
  // ========================================
  // Inputs
  // ========================================
  
  /** Current value (0-100) */
  readonly value = input<number>(0);
  
  /** Variant color */
  readonly variant = input<ProgressVariant>('primary');
  
  /** Size */
  readonly size = input<ProgressSize>('md');
  
  /** Show percentage label */
  readonly showLabel = input<boolean>(false);
  
  /** Indeterminate (spinner) mode */
  readonly indeterminate = input<boolean>(false);
  
  /** Accessibility label */
  readonly ariaLabel = input<string | null>(null);

  // ========================================
  // Computed
  // ========================================
  
  /** Clamped value (0-100) */
  readonly clampedValue = computed(() => 
    Math.round(Math.min(100, Math.max(0, this.value())))
  );
  
  /** Dimensions based on size */
  readonly dimensions = computed(() => {
    const s = this.size();
    return {
      size: PROGRESS_CIRCLE_SIZES[s],
      strokeWidth: PROGRESS_STROKE_WIDTHS[s],
    };
  });
  
  /** SVG viewBox */
  readonly viewBox = computed(() => {
    const size = this.dimensions().size;
    return `0 0 ${size} ${size}`;
  });
  
  /** Center point */
  readonly center = computed(() => this.dimensions().size / 2);
  
  /** Circle radius */
  readonly radius = computed(() => {
    const { size, strokeWidth } = this.dimensions();
    return (size - strokeWidth) / 2;
  });
  
  /** Circumference */
  readonly circumference = computed(() => 2 * Math.PI * this.radius());
  
  /** Stroke dasharray */
  readonly strokeDasharray = computed(() => {
    const circumference = this.circumference();
    return `${circumference} ${circumference}`;
  });
  
  /** Stroke dashoffset for progress */
  readonly strokeDashoffset = computed(() => {
    if (this.indeterminate()) return 0;
    const circumference = this.circumference();
    const progress = this.clampedValue() / 100;
    return circumference * (1 - progress);
  });
}
