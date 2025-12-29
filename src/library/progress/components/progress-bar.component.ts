/**
 * Progress Bar Component
 *
 * Linear progress indicator with determinate and indeterminate modes.
 *
 * @example
 * <lib-progress-bar [value]="75" />
 * <lib-progress-bar [indeterminate]="true" />
 */

import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import type { ProgressVariant, ProgressSize } from '../types/progress.types';

@Component({
  selector: 'lib-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-progress-bar',
    '[class.lib-progress-bar--sm]': 'size() === "sm"',
    '[class.lib-progress-bar--lg]': 'size() === "lg"',
    '[class.lib-progress-bar--primary]': 'variant() === "primary"',
    '[class.lib-progress-bar--success]': 'variant() === "success"',
    '[class.lib-progress-bar--warning]': 'variant() === "warning"',
    '[class.lib-progress-bar--error]': 'variant() === "error"',
    '[class.lib-progress-bar--indeterminate]': 'indeterminate()',
    '[class.lib-progress-bar--striped]': 'striped()',
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuenow]': 'indeterminate() ? null : clampedValue()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    <div class="lib-progress-bar__track">
      @if (buffer() !== null) {
        <div class="lib-progress-bar__buffer" [style.width.%]="clampedBuffer()"></div>
      }
      <div
        class="lib-progress-bar__fill"
        [style.width.%]="indeterminate() ? null : clampedValue()"
      ></div>
    </div>
    @if (showLabel() && !indeterminate()) {
      <span class="lib-progress-bar__label">{{ clampedValue() }}%</span>
    }
  `,
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
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

  /** Indeterminate (loading) mode */
  readonly indeterminate = input<boolean>(false);

  /** Buffer value for secondary progress */
  readonly buffer = input<number | null>(null);

  /** Striped animation */
  readonly striped = input<boolean>(false);

  /** Accessibility label */
  readonly ariaLabel = input<string | null>(null);

  // ========================================
  // Computed
  // ========================================

  /** Clamped value (0-100) */
  readonly clampedValue = computed(() => Math.round(Math.min(100, Math.max(0, this.value()))));

  /** Clamped buffer value */
  readonly clampedBuffer = computed(() => {
    const buf = this.buffer();
    if (buf === null) return 0;
    return Math.round(Math.min(100, Math.max(0, buf)));
  });
}
