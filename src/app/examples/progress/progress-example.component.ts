/**
 * Progress Example Component
 * 
 * Demonstrates Progress components with various configurations.
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProgressBarComponent, ProgressCircleComponent } from '../../../library/progress';

@Component({
  selector: 'app-progress-example',
  standalone: true,
  imports: [ProgressBarComponent, ProgressCircleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Progress Examples</h1>
      
      <!-- Linear Progress Bar -->
      <section class="example-section">
        <h2>Linear Progress Bar</h2>
        <p class="hint">Horizontal progress indicators for tasks and loading.</p>
        <div class="progress-stack">
          <lib-progress-bar [value]="25" />
          <lib-progress-bar [value]="50" />
          <lib-progress-bar [value]="75" />
          <lib-progress-bar [value]="100" />
        </div>
      </section>

      <!-- With Labels -->
      <section class="example-section">
        <h2>With Labels</h2>
        <p class="hint">Show the current percentage value.</p>
        <div class="progress-stack">
          <lib-progress-bar [value]="progressValue()" [showLabel]="true" />
          <div class="controls">
            <button class="btn" (click)="decrementProgress()">-10%</button>
            <button class="btn" (click)="incrementProgress()">+10%</button>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="example-section">
        <h2>Color Variants</h2>
        <div class="progress-stack">
          <lib-progress-bar [value]="60" variant="primary" [showLabel]="true" />
          <lib-progress-bar [value]="80" variant="success" [showLabel]="true" />
          <lib-progress-bar [value]="45" variant="warning" [showLabel]="true" />
          <lib-progress-bar [value]="30" variant="error" [showLabel]="true" />
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Sizes</h2>
        <div class="progress-stack">
          <lib-progress-bar [value]="70" size="sm" />
          <lib-progress-bar [value]="70" size="md" />
          <lib-progress-bar [value]="70" size="lg" />
        </div>
      </section>

      <!-- Indeterminate -->
      <section class="example-section">
        <h2>Indeterminate (Loading)</h2>
        <p class="hint">For unknown progress duration.</p>
        <div class="progress-stack">
          <lib-progress-bar [indeterminate]="true" />
          <lib-progress-bar [indeterminate]="true" variant="success" />
        </div>
      </section>

      <!-- Striped -->
      <section class="example-section">
        <h2>Striped Animation</h2>
        <div class="progress-stack">
          <lib-progress-bar [value]="65" [striped]="true" />
          <lib-progress-bar [value]="80" [striped]="true" variant="success" />
        </div>
      </section>

      <!-- Buffer -->
      <section class="example-section">
        <h2>Buffer (Download/Upload)</h2>
        <p class="hint">Shows buffered content ahead of current progress.</p>
        <div class="progress-stack">
          <lib-progress-bar [value]="35" [buffer]="60" />
        </div>
      </section>

      <!-- Circular Progress -->
      <section class="example-section">
        <h2>Circular Progress</h2>
        <p class="hint">Ring-style progress indicators.</p>
        <div class="circle-row">
          <lib-progress-circle [value]="25" />
          <lib-progress-circle [value]="50" />
          <lib-progress-circle [value]="75" />
          <lib-progress-circle [value]="100" />
        </div>
      </section>

      <!-- Circular With Labels -->
      <section class="example-section">
        <h2>Circular With Labels</h2>
        <div class="circle-row">
          <lib-progress-circle [value]="33" [showLabel]="true" size="sm" />
          <lib-progress-circle [value]="66" [showLabel]="true" size="md" />
          <lib-progress-circle [value]="90" [showLabel]="true" size="lg" />
        </div>
      </section>

      <!-- Circular Variants -->
      <section class="example-section">
        <h2>Circular Variants</h2>
        <div class="circle-row">
          <lib-progress-circle [value]="75" [showLabel]="true" variant="primary" />
          <lib-progress-circle [value]="75" [showLabel]="true" variant="success" />
          <lib-progress-circle [value]="75" [showLabel]="true" variant="warning" />
          <lib-progress-circle [value]="75" [showLabel]="true" variant="error" />
        </div>
      </section>

      <!-- Spinner -->
      <section class="example-section">
        <h2>Spinner (Indeterminate Circle)</h2>
        <div class="circle-row">
          <lib-progress-circle [indeterminate]="true" size="sm" />
          <lib-progress-circle [indeterminate]="true" size="md" />
          <lib-progress-circle [indeterminate]="true" size="lg" />
          <lib-progress-circle [indeterminate]="true" variant="success" />
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

    .progress-stack {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-4, 16px);
    }

    .circle-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lib-spacing-4, 16px);
      align-items: center;
    }

    .controls {
      display: flex;
      gap: var(--lib-spacing-2, 8px);
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
      background: var(--lib-color-primary-500, #6366f1);
      color: white;
    }

    .btn:hover {
      background: var(--lib-color-primary-600, #4f46e5);
    }
  `]
})
export class ProgressExampleComponent {
  readonly progressValue = signal(60);

  incrementProgress(): void {
    this.progressValue.update(v => Math.min(100, v + 10));
  }

  decrementProgress(): void {
    this.progressValue.update(v => Math.max(0, v - 10));
  }
}
