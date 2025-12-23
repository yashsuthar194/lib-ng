/**
 * Button Example Component
 * 
 * Demonstrates all button variants, sizes, loading states, and features.
 */

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonGroupDirective } from '../../../library/button';

@Component({
  selector: 'app-button-example',
  standalone: true,
  imports: [CommonModule, ButtonDirective, ButtonGroupDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Button Examples</h1>
      
      <!-- Variants Section -->
      <section class="example-section">
        <h2>Button Variants</h2>
        <div class="button-grid">
          <button libButton variant="primary">Primary</button>
          <button libButton variant="secondary">Secondary</button>
          <button libButton variant="outline">Outline</button>
          <button libButton variant="ghost">Ghost</button>
          <button libButton variant="link">Link</button>
          <button libButton variant="danger">Danger</button>
          <button libButton variant="success">Success</button>
        </div>
      </section>

      <!-- Sizes Section -->
      <section class="example-section">
        <h2>Button Sizes</h2>
        <div class="button-row">
          <button libButton size="sm">Small</button>
          <button libButton size="md">Medium</button>
          <button libButton size="lg">Large</button>
        </div>
      </section>

      <!-- Loading States -->
      <section class="example-section">
        <h2>Loading States</h2>
        <div class="button-row">
          <button libButton [loading]="inlineLoading()" loadingMode="inline" (click)="simulateInlineLoading()">
            {{ inlineLoading() ? 'Saving...' : 'Inline Loading' }}
          </button>
          <button libButton [loading]="replaceLoading()" loadingMode="replace" (click)="simulateReplaceLoading()">
            Replace Loading
          </button>
        </div>
        <p class="hint">Click the buttons to see loading states in action</p>
      </section>

      <!-- Disabled State -->
      <section class="example-section">
        <h2>Disabled State</h2>
        <div class="button-row">
          <button libButton [disabled]="true">Disabled Primary</button>
          <button libButton variant="outline" [disabled]="true">Disabled Outline</button>
          <button libButton variant="danger" [disabled]="true">Disabled Danger</button>
        </div>
      </section>

      <!-- With Icons -->
      <section class="example-section">
        <h2>With Icons</h2>
        <div class="button-row">
          <button libButton>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Add Item
          </button>
          <button libButton variant="outline">
            Download
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
          <button libButton variant="danger">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Delete
          </button>
        </div>
      </section>

      <!-- Icon Only -->
      <section class="example-section">
        <h2>Icon Only Buttons</h2>
        <div class="button-row">
          <button libButton [iconOnly]="true" size="sm" aria-label="Add">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button libButton [iconOnly]="true" aria-label="Settings">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </button>
          <button libButton [iconOnly]="true" size="lg" variant="danger" aria-label="Delete">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- With Ripple Effect -->
      <section class="example-section">
        <h2>Ripple Effect (Opt-in)</h2>
        <div class="button-row">
          <button libButton [ripple]="true">Primary + Ripple</button>
          <button libButton variant="secondary" [ripple]="true">Secondary + Ripple</button>
          <button libButton variant="outline" [ripple]="true">Outline + Ripple</button>
        </div>
        <p class="hint">Click the buttons to see the ripple animation</p>
      </section>

      <!-- Full Width -->
      <section class="example-section">
        <h2>Full Width</h2>
        <div class="form">
          <button libButton [fullWidth]="true">Submit Form</button>
          <button libButton variant="outline" [fullWidth]="true">Cancel</button>
        </div>
      </section>

      <!-- Button Group -->
      <section class="example-section">
        <h2>Button Group</h2>
        <div libButtonGroup>
          <button libButton variant="outline">Left</button>
          <button libButton variant="outline">Center</button>
          <button libButton variant="outline">Right</button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .example-page {
      padding: var(--lib-spacing-6, 24px);
      max-width: 900px;
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
      margin-block-end: var(--lib-spacing-4, 16px);
      color: var(--lib-color-neutral-800, #27272a);
    }

    .button-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lib-spacing-3, 12px);
    }

    .button-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--lib-spacing-3, 12px);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-3, 12px);
      max-width: 300px;
    }

    .hint {
      margin-block-start: var(--lib-spacing-3, 12px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
    }

    /* Button Group Styles */
    .lib-button-group {
      display: inline-flex;
    }

    .lib-button-group .lib-button {
      border-radius: 0;
    }

    .lib-button-group .lib-button:first-child {
      border-start-start-radius: var(--lib-border-radius-md, 6px);
      border-end-start-radius: var(--lib-border-radius-md, 6px);
    }

    .lib-button-group .lib-button:last-child {
      border-start-end-radius: var(--lib-border-radius-md, 6px);
      border-end-end-radius: var(--lib-border-radius-md, 6px);
    }

    .lib-button-group .lib-button:not(:first-child) {
      margin-inline-start: -1px;
    }
  `],
})
export class ButtonExampleComponent {
  readonly inlineLoading = signal(false);
  readonly replaceLoading = signal(false);

  simulateInlineLoading(): void {
    if (this.inlineLoading()) return;
    this.inlineLoading.set(true);
    setTimeout(() => this.inlineLoading.set(false), 2000);
  }

  simulateReplaceLoading(): void {
    if (this.replaceLoading()) return;
    this.replaceLoading.set(true);
    setTimeout(() => this.replaceLoading.set(false), 2000);
  }
}
