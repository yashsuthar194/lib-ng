import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ModalService, MODAL_REF } from '../../../../library/modal';
import { AlertDialogComponent } from '../dialogs/example-dialogs';

/**
 * Dialog that can open another modal - demonstrates stacked modals
 */
@Component({
  selector: 'app-nested-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nested-dialog">
      <div class="dialog-header">
        <h2>{{ data.title }}</h2>
        <button class="close-btn" (click)="close()">✕</button>
      </div>

      <div class="dialog-content">
        <p>{{ data.message }}</p>
        <p class="depth-info">
          Modal depth: <strong>{{ data.depth }}</strong>
        </p>

        <div class="actions">
          <button class="btn btn--primary" (click)="openAnother()">🪟 Open Another Modal</button>
          <button class="btn btn--secondary" (click)="openAlert()">ℹ️ Open Alert</button>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn--outline" (click)="close()">Close This Modal</button>
      </div>
    </div>
  `,
  styles: [
    `
      .nested-dialog {
        display: flex;
        flex-direction: column;
        min-width: 400px;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--lib-spacing-4) var(--lib-spacing-5);
        border-bottom: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
      }

      .dialog-header h2 {
        margin: 0;
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: var(--lib-color-neutral-500);
        padding: var(--lib-spacing-1);
        border-radius: var(--lib-border-radius-base);
        transition: all var(--lib-transition-fast);
      }

      .close-btn:hover {
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
      }

      .dialog-content {
        padding: var(--lib-spacing-5);
      }

      .dialog-content p {
        margin: 0 0 var(--lib-spacing-3);
        color: var(--lib-color-neutral-600);
      }

      .depth-info {
        background: var(--lib-color-primary-50);
        padding: var(--lib-spacing-3);
        border-radius: var(--lib-border-radius-md);
        border-left: 3px solid var(--lib-color-primary-500);
      }

      .depth-info strong {
        color: var(--lib-color-primary-700);
        font-size: var(--lib-font-size-xl);
      }

      .actions {
        display: flex;
        gap: var(--lib-spacing-3);
        margin-top: var(--lib-spacing-4);
      }

      .dialog-footer {
        padding: var(--lib-spacing-4) var(--lib-spacing-5);
        border-top: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
        display: flex;
        justify-content: flex-end;
      }

      .btn {
        padding: var(--lib-spacing-2) var(--lib-spacing-4);
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        transition: all var(--lib-transition-fast);
        border: var(--lib-border-width-thin) solid transparent;
      }

      .btn--primary {
        background: var(--lib-color-primary-500);
        color: white;
      }

      .btn--primary:hover {
        background: var(--lib-color-primary-600);
      }

      .btn--secondary {
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
      }

      .btn--secondary:hover {
        background: var(--lib-color-neutral-200);
      }

      .btn--outline {
        background: transparent;
        border-color: var(--lib-color-neutral-300);
        color: var(--lib-color-neutral-600);
      }

      .btn--outline:hover {
        background: var(--lib-color-neutral-50);
        border-color: var(--lib-color-neutral-400);
      }
    `,
  ],
})
export class NestedDialogComponent {
  private readonly modalRef = inject(MODAL_REF);
  private readonly modalService = inject(ModalService);

  get data() {
    return this.modalRef.data as { title: string; message: string; depth: number };
  }

  openAnother(): void {
    const nextDepth = this.data.depth + 1;
    this.modalService.open(NestedDialogComponent, {
      data: {
        title: `Nested Modal (Level ${nextDepth})`,
        message: `This is a modal opened from another modal. You can keep opening more!`,
        depth: nextDepth,
      },
      animation: 'scale',
    });
  }

  openAlert(): void {
    this.modalService.open(AlertDialogComponent, {
      data: {
        title: 'Alert from Nested Modal',
        message: `This alert was opened from a depth-${this.data.depth} modal.`,
      },
      animation: 'slide-up',
    });
  }

  close(): void {
    this.modalRef.close({ closed: true });
  }
}
