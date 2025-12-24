/**
 * Tooltip Example Component
 * 
 * Demonstrates tooltip with different positions, variants, and features.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TooltipDirective } from '../../../library/tooltip';

@Component({
  selector: 'app-tooltip-example',
  standalone: true,
  imports: [TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Tooltip Examples</h1>
      
      <!-- Basic Usage -->
      <section class="example-section">
        <h2>Basic Tooltip</h2>
        <p class="hint">Hover or focus on buttons to see tooltips.</p>
        <div class="button-row">
          <button class="btn" libTooltip="Save your changes">
            💾 Save
          </button>
          <button class="btn" libTooltip="Edit this item">
            ✏️ Edit
          </button>
          <button class="btn" libTooltip="Delete permanently">
            🗑️ Delete
          </button>
        </div>
      </section>

      <!-- Positions -->
      <section class="example-section">
        <h2>Position Options</h2>
        <p class="hint">Tooltips can appear in 12 different positions.</p>
        <div class="position-demo">
          <div class="position-row">
            <button class="btn btn--sm" libTooltip="Top Start" libTooltipPosition="top-start">↖ Top Start</button>
            <button class="btn btn--sm" libTooltip="Top" libTooltipPosition="top">↑ Top</button>
            <button class="btn btn--sm" libTooltip="Top End" libTooltipPosition="top-end">↗ Top End</button>
          </div>
          <div class="position-row position-row--sides">
            <button class="btn btn--sm" libTooltip="Left" libTooltipPosition="left">← Left</button>
            <button class="btn btn--sm" libTooltip="Right" libTooltipPosition="right">Right →</button>
          </div>
          <div class="position-row">
            <button class="btn btn--sm" libTooltip="Bottom Start" libTooltipPosition="bottom-start">↙ Bottom Start</button>
            <button class="btn btn--sm" libTooltip="Bottom" libTooltipPosition="bottom">↓ Bottom</button>
            <button class="btn btn--sm" libTooltip="Bottom End" libTooltipPosition="bottom-end">↘ Bottom End</button>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="example-section">
        <h2>Variants</h2>
        <p class="hint">Semantic colors for different contexts.</p>
        <div class="button-row">
          <button class="btn" libTooltip="Default tooltip">
            Default
          </button>
          <button class="btn btn--info" libTooltip="Helpful information" libTooltipVariant="info">
            ℹ️ Info
          </button>
          <button class="btn btn--warning" libTooltip="Proceed with caution" libTooltipVariant="warning">
            ⚠️ Warning
          </button>
          <button class="btn btn--error" libTooltip="This action is dangerous" libTooltipVariant="error">
            ❌ Error
          </button>
        </div>
      </section>

      <!-- Delay Options -->
      <section class="example-section">
        <h2>Show/Hide Delays</h2>
        <p class="hint">Configure delays for appearing and disappearing.</p>
        <div class="button-row">
          <button class="btn" libTooltip="Instant (0ms)" [libTooltipShowDelay]="0">
            Instant
          </button>
          <button class="btn" libTooltip="Default (200ms)" [libTooltipShowDelay]="200">
            Default (200ms)
          </button>
          <button class="btn" libTooltip="Slow (500ms)" [libTooltipShowDelay]="500">
            Slow (500ms)
          </button>
          <button class="btn" libTooltip="With hide delay" [libTooltipHideDelay]="300">
            Hide Delay (300ms)
          </button>
        </div>
      </section>

      <!-- Without Arrow -->
      <section class="example-section">
        <h2>No Arrow</h2>
        <div class="button-row">
          <button class="btn" libTooltip="Tooltip without arrow" [libTooltipShowArrow]="false">
            No Arrow
          </button>
        </div>
      </section>

      <!-- Icon Buttons -->
      <section class="example-section">
        <h2>Icon Button Tooltips</h2>
        <p class="hint">Tooltips are essential for icon-only buttons.</p>
        <div class="icon-row">
          <button class="icon-btn" libTooltip="Home">🏠</button>
          <button class="icon-btn" libTooltip="Settings">⚙️</button>
          <button class="icon-btn" libTooltip="Notifications">🔔</button>
          <button class="icon-btn" libTooltip="Profile">👤</button>
          <button class="icon-btn" libTooltip="Search">🔍</button>
        </div>
      </section>

      <!-- Keyboard -->
      <section class="example-section">
        <h2>Keyboard Accessibility</h2>
        <p class="hint">Use Tab to focus, Escape to dismiss. Tooltips appear on focus.</p>
        <div class="button-row">
          <button class="btn" libTooltip="Press Tab to focus me">
            Focus me with Tab
          </button>
          <button class="btn" libTooltip="Press Escape to hide">
            Then press Escape
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .example-page {
      padding: var(--lib-spacing-6, 24px);
      max-width: 800px;
    }

    h1 {
      font-size: var(--lib-font-size-2xl, 1.5rem);
      margin-block-end: var(--lib-spacing-6, 24px);
      color: var(--lib-color-neutral-900, #18181b);
    }

    .example-section {
      margin-block-end: var(--lib-spacing-8, 32px);
      padding: var(--lib-spacing-4, 16px);
      background: var(--lib-color-neutral-50, #fafafa);
      border-radius: var(--lib-border-radius-lg, 8px);
    }

    .example-section h2 {
      font-size: var(--lib-font-size-lg, 1.125rem);
      margin-block-end: var(--lib-spacing-3, 12px);
      color: var(--lib-color-neutral-800, #27272a);
    }

    .hint {
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
      margin-block-end: var(--lib-spacing-4, 16px);
    }

    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lib-spacing-3, 12px);
    }

    .btn {
      padding: var(--lib-spacing-2, 8px) var(--lib-spacing-4, 16px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      font-weight: 500;
      font-family: inherit;
      border-radius: var(--lib-border-radius-md, 6px);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease;
      background: var(--lib-color-neutral-700, #374151);
      color: white;
    }

    .btn:hover {
      background: var(--lib-color-neutral-600, #4b5563);
    }

    .btn:focus-visible {
      outline: 2px solid var(--lib-color-primary-500, #6366f1);
      outline-offset: 2px;
    }

    .btn--sm {
      padding: var(--lib-spacing-1, 4px) var(--lib-spacing-3, 12px);
      font-size: var(--lib-font-size-xs, 0.75rem);
    }

    .btn--info { background: var(--lib-color-info, #3b82f6); }
    .btn--warning { background: var(--lib-color-warning, #f59e0b); }
    .btn--error { background: var(--lib-color-error, #ef4444); }

    /* Position demo */
    .position-demo {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-4, 16px);
      align-items: center;
      padding: var(--lib-spacing-6, 24px);
    }

    .position-row {
      display: flex;
      gap: var(--lib-spacing-3, 12px);
    }

    .position-row--sides {
      justify-content: space-between;
      width: 300px;
    }

    /* Icon buttons */
    .icon-row {
      display: flex;
      gap: var(--lib-spacing-2, 8px);
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      background: var(--lib-color-neutral-100, #f3f4f6);
      border: 1px solid var(--lib-color-neutral-300, #d1d5db);
      border-radius: var(--lib-border-radius-md, 6px);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .icon-btn:hover {
      background: var(--lib-color-neutral-200, #e5e7eb);
    }

    .icon-btn:focus-visible {
      outline: 2px solid var(--lib-color-primary-500, #6366f1);
      outline-offset: 2px;
    }
  `]
})
export class TooltipExampleComponent {}
