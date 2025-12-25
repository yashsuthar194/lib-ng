/**
 * Skeleton Example Component
 *
 * Comprehensive showcase of skeleton loading components with all variants,
 * presets, and interactive demos.
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SkeletonComponent,
  SkeletonTextComponent,
  SkeletonGroupComponent,
  SkeletonDirective,
} from '../../../library/skeleton';

@Component({
  selector: 'app-skeleton-example',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    SkeletonTextComponent,
    SkeletonGroupComponent,
    SkeletonDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Skeleton Examples</h1>
      <p class="page-description">
        GPU-accelerated skeleton loading components for improved perceived performance.
      </p>

      <!-- Shape Variants -->
      <section class="example-section">
        <h2>Shape Variants</h2>
        <p class="hint">Different skeleton shapes for various content types.</p>
        <div class="shape-grid">
          <div class="shape-item">
            <lib-skeleton variant="text" width="150px" />
            <span class="label">Text</span>
          </div>
          <div class="shape-item">
            <lib-skeleton variant="circle" size="lg" />
            <span class="label">Circle</span>
          </div>
          <div class="shape-item">
            <lib-skeleton variant="rectangle" width="100px" height="60px" />
            <span class="label">Rectangle</span>
          </div>
          <div class="shape-item">
            <lib-skeleton variant="rounded" width="100px" height="60px" />
            <span class="label">Rounded</span>
          </div>
          <div class="shape-item">
            <lib-skeleton variant="square" size="lg" />
            <span class="label">Square</span>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Size Presets</h2>
        <div class="size-demo">
          <div class="size-row">
            <lib-skeleton variant="circle" size="xs" />
            <lib-skeleton variant="circle" size="sm" />
            <lib-skeleton variant="circle" size="md" />
            <lib-skeleton variant="circle" size="lg" />
            <lib-skeleton variant="circle" size="xl" />
            <lib-skeleton variant="circle" size="2xl" />
          </div>
          <div class="size-labels">
            <span>XS</span><span>SM</span><span>MD</span><span>LG</span><span>XL</span><span>2XL</span>
          </div>
        </div>
      </section>

      <!-- Animation Types -->
      <section class="example-section">
        <h2>Animation Types</h2>
        <p class="hint">All animations use GPU-accelerated CSS (transform/opacity only).</p>
        <div class="animation-demo">
          <div class="animation-card">
            <lib-skeleton animation="shimmer" width="100%" height="60px" variant="rounded" />
            <span class="label">Shimmer (default)</span>
          </div>
          <div class="animation-card">
            <lib-skeleton animation="pulse" width="100%" height="60px" variant="rounded" />
            <span class="label">Pulse</span>
          </div>
          <div class="animation-card">
            <lib-skeleton animation="wave" width="100%" height="60px" variant="rounded" />
            <span class="label">Wave</span>
          </div>
          <div class="animation-card">
            <lib-skeleton animation="none" width="100%" height="60px" variant="rounded" />
            <span class="label">None (static)</span>
          </div>
        </div>
      </section>

      <!-- Animation Speed -->
      <section class="example-section">
        <h2>Animation Speed</h2>
        <div class="speed-demo">
          <div class="speed-item">
            <lib-skeleton speed="slow" width="100%" height="40px" variant="rounded" />
            <span class="label">Slow (2s)</span>
          </div>
          <div class="speed-item">
            <lib-skeleton speed="normal" width="100%" height="40px" variant="rounded" />
            <span class="label">Normal (1.5s)</span>
          </div>
          <div class="speed-item">
            <lib-skeleton speed="fast" width="100%" height="40px" variant="rounded" />
            <span class="label">Fast (1s)</span>
          </div>
        </div>
      </section>

      <!-- Multiple Skeletons -->
      <section class="example-section">
        <h2>Multiple Skeletons (count)</h2>
        <div class="multiple-demo">
          <lib-skeleton [count]="4" gap="sm" />
        </div>
      </section>

      <!-- Text Skeletons -->
      <section class="example-section">
        <h2>Text Skeletons</h2>
        <p class="hint">Realistic multi-line text with automatic width variation.</p>
        <div class="text-demo">
          <div class="text-item">
            <lib-skeleton-text [heading]="true" />
            <span class="label">Heading</span>
          </div>
          <div class="text-item">
            <lib-skeleton-text [lines]="3" />
            <span class="label">Paragraph (3 lines)</span>
          </div>
          <div class="text-item">
            <lib-skeleton-text [lines]="4" [lastLineWidth]="50" />
            <span class="label">With shorter last line</span>
          </div>
        </div>
      </section>

      <!-- Preset Gallery -->
      <section class="example-section">
        <h2>Layout Presets</h2>
        <p class="hint">40+ pre-built layouts for common UI patterns.</p>

        <!-- Cards -->
        <h3 class="preset-category">Content Cards</h3>
        <div class="preset-grid">
          <div class="preset-item">
            <lib-skeleton-group preset="card" />
            <span class="preset-label">card</span>
          </div>
          <div class="preset-item">
            <lib-skeleton-group preset="product-card" />
            <span class="preset-label">product-card</span>
          </div>
        </div>

        <!-- Lists -->
        <h3 class="preset-category">Lists & Items</h3>
        <div class="preset-stack">
          <lib-skeleton-group preset="list-item-avatar" [repeat]="3" />
        </div>
        <span class="preset-label">list-item-avatar × 3</span>

        <!-- Social -->
        <h3 class="preset-category">Social & Feed</h3>
        <div class="preset-item preset-item--full">
          <lib-skeleton-group preset="social-post" />
          <span class="preset-label">social-post</span>
        </div>

        <!-- Dashboard -->
        <h3 class="preset-category">Dashboard</h3>
        <div class="preset-grid preset-grid--4">
          <lib-skeleton-group preset="stat-card" />
          <lib-skeleton-group preset="stat-card" />
          <lib-skeleton-group preset="stat-card" />
          <lib-skeleton-group preset="stat-card" />
        </div>
        <span class="preset-label">stat-card × 4</span>

        <!-- Table -->
        <h3 class="preset-category">Tables</h3>
        <div class="preset-stack">
          <lib-skeleton-group preset="table-row" [columns]="4" [repeat]="5" />
        </div>
        <span class="preset-label">table-row (4 cols) × 5</span>
      </section>

      <!-- Interactive Demo -->
      <section class="example-section">
        <h2>Interactive Loading Demo</h2>
        <p class="hint">Toggle loading state to see skeleton transition.</p>
        <div class="interactive-controls">
          <button class="btn" (click)="toggleLoading()">
            {{ isLoading() ? 'Show Content' : 'Show Skeleton' }}
          </button>
        </div>
        <div class="interactive-demo">
          <div *libSkeleton="isLoading(); preset: 'card'" class="demo-card">
            <img src="https://picsum.photos/400/160" alt="Demo image" />
            <div class="demo-card__body">
              <h3>Real Card Content</h3>
              <p>This content appears when loading is complete.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Directive Usage -->
      <section class="example-section">
        <h2>Directive Usage</h2>
        <p class="hint">Use the *libSkeleton directive for conditional rendering.</p>
        <div class="code-block">
          <code>&lt;div *libSkeleton="isLoading; preset: 'card'"&gt;</code>
          <code>  Actual content here</code>
          <code>&lt;/div&gt;</code>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        padding: var(--lib-spacing-6, 24px);
      }

      h1 {
        font-size: var(--lib-font-size-2xl, 1.5rem);
        margin-block-end: var(--lib-spacing-2, 8px);
        color: var(--lib-color-neutral-900, #18181b);
      }

      .page-description {
        font-size: var(--lib-font-size-base, 1rem);
        color: var(--lib-color-neutral-600, #52525b);
        margin-block-end: var(--lib-spacing-6, 24px);
      }

      .example-section {
        margin-block-end: var(--lib-spacing-8, 32px);
        padding: var(--lib-spacing-5, 20px);
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

      /* Shape Grid */
      .shape-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--lib-spacing-6, 24px);
        align-items: flex-end;
      }

      .shape-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--lib-spacing-2, 8px);
      }

      .label {
        font-size: var(--lib-font-size-xs, 0.75rem);
        color: var(--lib-color-neutral-500, #71717a);
      }

      /* Size Demo */
      .size-demo {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-2, 8px);
      }

      .size-row {
        display: flex;
        gap: var(--lib-spacing-4, 16px);
        align-items: center;
      }

      .size-labels {
        display: flex;
        gap: var(--lib-spacing-4, 16px);
        font-size: var(--lib-font-size-xs, 0.75rem);
        color: var(--lib-color-neutral-500, #71717a);
      }

      .size-labels span {
        width: 24px;
        text-align: center;
      }

      .size-labels span:nth-child(2) {
        width: 32px;
      }
      .size-labels span:nth-child(3) {
        width: 40px;
      }
      .size-labels span:nth-child(4) {
        width: 48px;
      }
      .size-labels span:nth-child(5) {
        width: 64px;
      }
      .size-labels span:nth-child(6) {
        width: 80px;
      }

      /* Animation Demo */
      .animation-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: var(--lib-spacing-4, 16px);
      }

      .animation-card {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-2, 8px);
      }

      /* Speed Demo */
      .speed-demo {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--lib-spacing-4, 16px);
      }

      .speed-item {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-2, 8px);
      }

      /* Multiple Demo */
      .multiple-demo {
        max-width: 400px;
      }

      /* Text Demo */
      .text-demo {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-6, 24px);
      }

      .text-item {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-2, 8px);
        max-width: 400px;
      }

      /* Preset Gallery */
      .preset-category {
        font-size: var(--lib-font-size-base, 1rem);
        color: var(--lib-color-neutral-700, #3f3f46);
        margin-block: var(--lib-spacing-4, 16px) var(--lib-spacing-3, 12px);
        padding-block-start: var(--lib-spacing-4, 16px);
        border-top: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      }

      .preset-category:first-of-type {
        border-top: none;
        padding-block-start: 0;
        margin-block-start: var(--lib-spacing-2, 8px);
      }

      .preset-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--lib-spacing-4, 16px);
      }

      .preset-grid--4 {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }

      .preset-item {
        background: var(--lib-color-neutral-0, #fff);
        padding: var(--lib-spacing-4, 16px);
        border-radius: var(--lib-border-radius-lg, 8px);
        border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      }

      .preset-item--full {
        max-width: 500px;
        margin-block-end: var(--lib-spacing-2, 8px);
      }

      .preset-stack {
        background: var(--lib-color-neutral-0, #fff);
        padding: var(--lib-spacing-4, 16px);
        border-radius: var(--lib-border-radius-lg, 8px);
        border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
        margin-block-end: var(--lib-spacing-2, 8px);
      }

      .preset-label {
        display: block;
        font-size: var(--lib-font-size-xs, 0.75rem);
        color: var(--lib-color-neutral-500, #71717a);
        margin-block-start: var(--lib-spacing-2, 8px);
        font-family: monospace;
      }

      /* Interactive Demo */
      .interactive-controls {
        margin-block-end: var(--lib-spacing-4, 16px);
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

      .interactive-demo {
        max-width: 400px;
      }

      .demo-card {
        background: var(--lib-color-neutral-0, #fff);
        border-radius: var(--lib-border-radius-lg, 8px);
        overflow: hidden;
        border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      }

      .demo-card img {
        width: 100%;
        height: 160px;
        object-fit: cover;
      }

      .demo-card__body {
        padding: var(--lib-spacing-4, 16px);
      }

      .demo-card__body h3 {
        font-size: var(--lib-font-size-lg, 1.125rem);
        margin-block-end: var(--lib-spacing-2, 8px);
      }

      .demo-card__body p {
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-600, #52525b);
      }

      /* Code Block */
      .code-block {
        background: var(--lib-color-neutral-900, #18181b);
        color: var(--lib-color-neutral-100, #f4f4f5);
        padding: var(--lib-spacing-4, 16px);
        border-radius: var(--lib-border-radius-md, 6px);
        font-family: monospace;
        font-size: var(--lib-font-size-sm, 0.875rem);
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-1, 4px);
      }
    `,
  ],
})
export class SkeletonExampleComponent {
  readonly isLoading = signal(true);

  toggleLoading(): void {
    this.isLoading.update((v) => !v);
  }
}
