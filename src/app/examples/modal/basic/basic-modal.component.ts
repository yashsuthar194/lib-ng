import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { ModalService, ModalCloseResult } from '../../../../library/modal';
import { AlertDialogComponent, ConfirmDialogComponent, FormDialogComponent } from '../dialogs/example-dialogs';

/**
 * Basic Modal Example
 * 
 * Demonstrates simple modal usage with different dialog types.
 */
@Component({
  selector: 'app-basic-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Basic Modal</h1>
      <p class="description">Simple modal dialogs with data passing and close tracking.</p>

      <!-- Alert Dialog -->
      <section class="example-section">
        <h2>Alert Dialog</h2>
        <p class="hint">A simple alert modal with a message and OK button.</p>
        <button class="btn btn--primary" (click)="openAlert()">
          Show Alert
        </button>
        @if (alertResult()) {
          <p class="result">Alert closed via: {{ alertResult() }}</p>
        }
      </section>

      <!-- Confirm Dialog -->
      <section class="example-section">
        <h2>Confirmation Dialog</h2>
        <p class="hint">Confirm/Cancel dialog that returns a boolean result.</p>
        <button class="btn btn--danger" (click)="openConfirm()">
          Delete Item
        </button>
        @if (confirmResult()) {
          <p class="result">
            Result: {{ confirmResult()!.result ? 'Confirmed' : 'Cancelled' }} 
            (via {{ confirmResult()!.reason }})
          </p>
        }
      </section>

      <!-- Form Dialog -->
      <section class="example-section">
        <h2>Form Dialog</h2>
        <p class="hint">Modal with form that returns data when saved.</p>
        <button class="btn btn--secondary" (click)="openForm()">
          Edit Profile
        </button>
        @if (formResult()) {
          <p class="result">
            @if (formResult()!.result?.saved) {
              Saved: {{ formResult()!.result?.name }} ({{ formResult()!.result?.email }})
            } @else {
              Cancelled (via {{ formResult()!.reason }})
            }
          </p>
        }
      </section>
    </div>
  `,
  styles: [`
    .example-page {
      padding: var(--lib-spacing-6);
      max-width: 800px;
    }
    
    .description {
      color: var(--lib-color-neutral-600);
      margin-block-end: var(--lib-spacing-6);
    }
    
    .example-section {
      margin-block-end: var(--lib-spacing-8);
      padding: var(--lib-spacing-5);
      background: var(--lib-color-neutral-50);
      border-radius: var(--lib-border-radius-lg);
    }
    
    .example-section h2 {
      font-size: var(--lib-font-size-lg);
      margin-block-end: var(--lib-spacing-2);
    }
    
    .hint {
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-500);
      margin-block-end: var(--lib-spacing-4);
    }
    
    .result {
      margin-block-start: var(--lib-spacing-3);
      padding: var(--lib-spacing-3);
      background: var(--lib-color-primary-50);
      border-radius: var(--lib-border-radius-md);
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-primary-700);
    }
    
    .btn {
      padding: var(--lib-spacing-2) var(--lib-spacing-4);
      border-radius: var(--lib-border-radius-md);
      font-weight: var(--lib-font-weight-medium);
      cursor: pointer;
      border: none;
      font-size: var(--lib-font-size-sm);
    }
    
    .btn--primary {
      background: var(--lib-color-primary-500);
      color: white;
    }
    
    .btn--secondary {
      background: var(--lib-color-neutral-100);
      color: var(--lib-color-neutral-700);
      border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
    }
    
    .btn--danger {
      background: var(--lib-color-error);
      color: white;
    }
  `],
})
export class BasicModalExampleComponent {
  private readonly modalService = inject(ModalService);

  readonly alertResult = signal<string | null>(null);
  readonly confirmResult = signal<ModalCloseResult<boolean> | null>(null);
  readonly formResult = signal<ModalCloseResult<{ name: string; email: string; saved: boolean } | null> | null>(null);

  openAlert(): void {
    const modalRef = this.modalService.open(AlertDialogComponent, {
      data: { 
        title: 'Information', 
        message: 'This is an informational alert message.' 
      },
      animation: 'scale',
    });

    modalRef.afterClosed$.subscribe(({ reason }) => {
      this.alertResult.set(reason);
    });
  }

  openConfirm(): void {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Item?',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmLabel: 'Delete',
      },
      animation: 'scale',
      closeOnBackdrop: false, // Require explicit choice
    });

    modalRef.afterClosed$.subscribe((result) => {
      this.confirmResult.set(result as ModalCloseResult<boolean>);
    });
  }

  openForm(): void {
    const modalRef = this.modalService.open(FormDialogComponent, {
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      animation: 'slide-up',
      width: '450px',
    });

    modalRef.afterClosed$.subscribe((result) => {
      this.formResult.set(result as ModalCloseResult<{ name: string; email: string; saved: boolean } | null>);
    });
  }
}
