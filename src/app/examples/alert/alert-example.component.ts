/**
 * Alert Example Component
 * 
 * Demonstrates Alert component with variants, appearances, and features.
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlertComponent } from '../../../library/alert';

@Component({
  selector: 'app-alert-example',
  standalone: true,
  imports: [AlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Alert Examples</h1>
      
      <!-- Variants -->
      <section class="example-section">
        <h2>Variants</h2>
        <p class="hint">5 semantic variants for different contexts.</p>
        <div class="alert-stack">
          <lib-alert variant="info">
            This is an informational message with helpful details.
          </lib-alert>
          <lib-alert variant="success">
            Your changes have been saved successfully.
          </lib-alert>
          <lib-alert variant="warning">
            Please review your information before submitting.
          </lib-alert>
          <lib-alert variant="error">
            An error occurred while processing your request.
          </lib-alert>
          <lib-alert variant="neutral">
            This is a neutral message without semantic meaning.
          </lib-alert>
        </div>
      </section>

      <!-- Appearances -->
      <section class="example-section">
        <h2>Appearances</h2>
        <p class="hint">3 visual styles: filled, outlined, and soft.</p>
        <div class="alert-stack">
          <lib-alert variant="info" appearance="filled">
            Filled appearance with solid background.
          </lib-alert>
          <lib-alert variant="info" appearance="outlined">
            Outlined appearance with border only.
          </lib-alert>
          <lib-alert variant="info" appearance="soft">
            Soft appearance with no border.
          </lib-alert>
        </div>
      </section>

      <!-- With Title -->
      <section class="example-section">
        <h2>With Title</h2>
        <p class="hint">Add a title for structured content.</p>
        <div class="alert-stack">
          <lib-alert variant="success" title="Payment Successful">
            Your payment of $99.00 has been processed. A confirmation email has been sent.
          </lib-alert>
          <lib-alert variant="error" title="Connection Error">
            Unable to connect to the server. Please check your internet connection and try again.
          </lib-alert>
        </div>
      </section>

      <!-- Dismissible -->
      <section class="example-section">
        <h2>Dismissible Alerts</h2>
        <p class="hint">Alerts can be dismissed by clicking the close button.</p>
        <div class="alert-stack">
          @if (showDismissible1()) {
            <lib-alert 
              variant="info" 
              [dismissible]="true" 
              title="New Feature Available"
              (dismissed)="showDismissible1.set(false)"
            >
              Check out our new dashboard features. Click the X to dismiss this alert.
            </lib-alert>
          }
          @if (showDismissible2()) {
            <lib-alert 
              variant="warning" 
              [dismissible]="true"
              (dismissed)="showDismissible2.set(false)"
            >
              Your session will expire in 10 minutes. Click to dismiss.
            </lib-alert>
          }
          @if (!showDismissible1() || !showDismissible2()) {
            <button class="btn" (click)="resetDismissible()">
              Reset Dismissed Alerts
            </button>
          }
        </div>
      </section>

      <!-- Without Icon -->
      <section class="example-section">
        <h2>Without Icon</h2>
        <div class="alert-stack">
          <lib-alert variant="info" [showIcon]="false">
            This alert has no icon for a cleaner look.
          </lib-alert>
        </div>
      </section>

      <!-- Common Use Cases -->
      <section class="example-section">
        <h2>Common Use Cases</h2>
        <div class="alert-stack">
          <lib-alert variant="info" title="Tip" appearance="soft">
            Press Ctrl+S to save your work quickly.
          </lib-alert>
          <lib-alert variant="warning" title="Required Fields">
            Please fill in all required fields marked with *.
          </lib-alert>
          <lib-alert variant="error" title="Form Errors">
            Please correct the following errors before submitting.
          </lib-alert>
          <lib-alert variant="success" [dismissible]="true">
            🎉 Congratulations! You've completed the onboarding process.
          </lib-alert>
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

    .alert-stack {
      display: flex;
      flex-direction: column;
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
      background: var(--lib-color-primary-500, #6366f1);
      color: white;
      width: fit-content;
    }

    .btn:hover {
      background: var(--lib-color-primary-600, #4f46e5);
    }
  `]
})
export class AlertExampleComponent {
  readonly showDismissible1 = signal(true);
  readonly showDismissible2 = signal(true);

  resetDismissible(): void {
    this.showDismissible1.set(true);
    this.showDismissible2.set(true);
  }
}
