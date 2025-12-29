/**
 * Toast Example Component
 *
 * Demonstrates toast notifications with different variants, positions, and features.
 */

import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../library/toast';
import type { ToastPosition, ToastVariant } from '../../../library/toast';

@Component({
  selector: 'app-toast-example',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Toast / Snackbar Examples</h1>

      <!-- Quick Actions -->
      <section class="example-section">
        <h2>Quick Toast Actions</h2>
        <p class="hint">Click buttons to show toasts with default settings.</p>
        <div class="button-row">
          <button class="btn btn--success" (click)="showSuccess()">✓ Success</button>
          <button class="btn btn--error" (click)="showError()">✕ Error</button>
          <button class="btn btn--warning" (click)="showWarning()">⚠ Warning</button>
          <button class="btn btn--info" (click)="showInfo()">ℹ Info</button>
        </div>
      </section>

      <!-- With Action Button -->
      <section class="example-section">
        <h2>Toast with Action Button</h2>
        <p class="hint">Toast with an "Undo" action that triggers a callback.</p>
        <div class="button-row">
          <button class="btn" (click)="showWithAction()">Show Toast with Undo Action</button>
        </div>
        @if (lastAction()) {
          <p class="status">Last action: {{ lastAction() }}</p>
        }
      </section>

      <!-- Position Options -->
      <section class="example-section">
        <h2>Position Options</h2>
        <p class="hint">Toast can appear in 6 different positions.</p>
        <div class="position-grid">
          @for (pos of positions; track pos) {
            <button
              class="btn btn--outline"
              [class.btn--active]="selectedPosition() === pos"
              (click)="selectedPosition.set(pos)"
            >
              {{ pos }}
            </button>
          }
        </div>
        <div class="button-row">
          <button class="btn btn--primary" (click)="showAtPosition()">
            Show Toast at {{ selectedPosition() }}
          </button>
        </div>
      </section>

      <!-- Stacking Demo -->
      <section class="example-section">
        <h2>Stacking (Max 5)</h2>
        <p class="hint">Multiple toasts stack. When max (5) is reached, oldest is removed.</p>
        <div class="button-row">
          <button class="btn" (click)="showMultiple(3)">Show 3 Toasts</button>
          <button class="btn" (click)="showMultiple(6)">Show 6 Toasts (triggers removal)</button>
          <button class="btn btn--outline" (click)="dismissAll()">Dismiss All</button>
        </div>
      </section>

      <!-- Custom Duration -->
      <section class="example-section">
        <h2>Custom Duration</h2>
        <p class="hint">Control how long the toast stays visible (hover pauses timer).</p>
        <div class="button-row">
          <button class="btn" (click)="showWithDuration(2000)">2 seconds</button>
          <button class="btn" (click)="showWithDuration(5000)">5 seconds</button>
          <button class="btn" (click)="showWithDuration(0)">Infinite (no auto-dismiss)</button>
        </div>
      </section>

      <!-- No Icon / No Dismiss -->
      <section class="example-section">
        <h2>Customization Options</h2>
        <div class="button-row">
          <button class="btn" (click)="showNoIcon()">No Icon</button>
          <button class="btn" (click)="showNoDismiss()">No Dismiss Button</button>
          <button class="btn" (click)="showMinimal()">Minimal (no icon, no dismiss)</button>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
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

      .status {
        margin-block-start: var(--lib-spacing-3, 12px);
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-primary-600, #4f46e5);
        font-weight: 500;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--lib-spacing-3, 12px);
      }

      .position-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--lib-spacing-2, 8px);
        margin-block-end: var(--lib-spacing-4, 16px);
        max-width: 400px;
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

      .btn--success {
        background: var(--lib-color-success, #22c55e);
      }
      .btn--success:hover {
        background: #16a34a;
      }

      .btn--error {
        background: var(--lib-color-error, #ef4444);
      }
      .btn--error:hover {
        background: #dc2626;
      }

      .btn--warning {
        background: var(--lib-color-warning, #f59e0b);
      }
      .btn--warning:hover {
        background: #d97706;
      }

      .btn--info {
        background: var(--lib-color-info, #3b82f6);
      }
      .btn--info:hover {
        background: #2563eb;
      }

      .btn--primary {
        background: var(--lib-color-primary-500, #6366f1);
      }
      .btn--primary:hover {
        background: var(--lib-color-primary-600, #4f46e5);
      }

      .btn--outline {
        background: transparent;
        border: 1px solid var(--lib-color-neutral-400, #9ca3af);
        color: var(--lib-color-neutral-700, #374151);
      }
      .btn--outline:hover {
        background: var(--lib-color-neutral-100, #f3f4f6);
      }

      .btn--active {
        background: var(--lib-color-primary-500, #6366f1);
        border-color: var(--lib-color-primary-500, #6366f1);
        color: white;
      }
      .btn--active:hover {
        background: var(--lib-color-primary-600, #4f46e5);
      }
    `,
  ],
})
export class ToastExampleComponent {
  private readonly toast = inject(ToastService);

  // Position options
  readonly positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];
  readonly selectedPosition = signal<ToastPosition>('bottom-right');

  // Track last action for demo
  readonly lastAction = signal<string>('');

  // Counter for stacking demo
  private counter = 0;

  // Quick toast methods
  showSuccess(): void {
    this.toast.success('Operation completed successfully!');
  }

  showError(): void {
    this.toast.error('Something went wrong. Please try again.');
  }

  showWarning(): void {
    this.toast.warning('Your session will expire in 5 minutes.');
  }

  showInfo(): void {
    this.toast.info('New updates are available.');
  }

  // With action button
  showWithAction(): void {
    this.toast.show({
      message: 'Item deleted from your list',
      variant: 'warning',
      action: {
        label: 'Undo',
        callback: () => {
          this.lastAction.set('Undo clicked at ' + new Date().toLocaleTimeString());
          this.toast.success('Action undone!');
        },
      },
    });
  }

  // Position demo
  showAtPosition(): void {
    this.toast.info(`Toast at ${this.selectedPosition()}`, {
      position: this.selectedPosition(),
    });
  }

  // Stacking demo
  showMultiple(count: number): void {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.counter++;
        const variants: ToastVariant[] = ['success', 'error', 'warning', 'info'];
        const variant = variants[this.counter % 4];
        this.toast.show({
          message: `Toast #${this.counter}`,
          variant,
        });
      }, i * 200); // Stagger for visual effect
    }
  }

  // Dismiss all
  dismissAll(): void {
    this.toast.dismissAll();
  }

  // Duration demo
  showWithDuration(duration: number): void {
    const label = duration === 0 ? 'infinite' : `${duration / 1000}s`;
    this.toast.info(`This toast has ${label} duration`, {
      duration,
    });
  }

  // Customization options
  showNoIcon(): void {
    this.toast.success('Toast without icon', { icon: false });
  }

  showNoDismiss(): void {
    this.toast.info('Toast without dismiss button', { dismissible: false });
  }

  showMinimal(): void {
    this.toast.show({
      message: 'Minimal toast - just text',
      icon: false,
      dismissible: false,
      duration: 3000,
    });
  }
}
