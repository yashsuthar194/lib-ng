import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MODAL_REF } from '../../../../library/modal';

/**
 * Simple alert dialog component.
 */
@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">{{ modalRef.data.title }}</h2>
      </div>
      <div class="dialog__content">
        <p>{{ modalRef.data.message }}</p>
      </div>
      <div class="dialog__actions">
        <button class="btn btn--primary" (click)="close()">OK</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        padding: var(--lib-spacing-6);
        min-width: 300px;
      }

      .dialog__header {
        margin-block-end: var(--lib-spacing-4);
      }

      .dialog__title {
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
        margin: 0;
      }

      .dialog__content {
        margin-block-end: var(--lib-spacing-6);
        color: var(--lib-color-neutral-600);
      }

      .dialog__actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--lib-spacing-2);
      }

      .btn {
        padding: var(--lib-spacing-2) var(--lib-spacing-4);
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        border: none;
      }

      .btn--primary {
        background: var(--lib-color-primary-500);
        color: white;
      }

      .btn--primary:hover {
        background: var(--lib-color-primary-600);
      }
    `,
  ],
})
export class AlertDialogComponent {
  readonly modalRef = inject(MODAL_REF) as {
    data: { title: string; message: string };
    close: () => void;
  };

  close(): void {
    this.modalRef.close();
  }
}

/**
 * Confirmation dialog with Yes/No result.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">{{ data.title || 'Confirm' }}</h2>
      </div>
      <div class="dialog__content">
        <p>{{ data.message }}</p>
      </div>
      <div class="dialog__actions">
        <button class="btn btn--secondary" (click)="cancel()">Cancel</button>
        <button class="btn btn--danger" (click)="confirm()">
          {{ data.confirmLabel || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        padding: var(--lib-spacing-6);
        min-width: 350px;
      }

      .dialog__header {
        margin-block-end: var(--lib-spacing-4);
      }

      .dialog__title {
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
        margin: 0;
      }

      .dialog__content {
        margin-block-end: var(--lib-spacing-6);
        color: var(--lib-color-neutral-600);
      }

      .dialog__actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--lib-spacing-2);
      }

      .btn {
        padding: var(--lib-spacing-2) var(--lib-spacing-4);
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        border: none;
      }

      .btn--secondary {
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
      }

      .btn--secondary:hover {
        background: var(--lib-color-neutral-200);
      }

      .btn--danger {
        background: var(--lib-color-error);
        color: white;
      }

      .btn--danger:hover {
        background: color-mix(in srgb, var(--lib-color-error) 85%, black);
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  private readonly modalRef = inject(MODAL_REF) as {
    data: { title?: string; message: string; confirmLabel?: string };
    close: (result: boolean) => void;
  };

  get data() {
    return this.modalRef.data;
  }

  confirm(): void {
    this.modalRef.close(true);
  }

  cancel(): void {
    this.modalRef.close(false);
  }
}

/**
 * Form dialog that returns form data.
 */
@Component({
  selector: 'app-form-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Edit Profile</h2>
      </div>
      <div class="dialog__content">
        <div class="form-field">
          <label class="label">Name</label>
          <input
            type="text"
            class="input"
            [value]="name"
            (input)="name = $any($event.target).value"
          />
        </div>
        <div class="form-field">
          <label class="label">Email</label>
          <input
            type="email"
            class="input"
            [value]="email"
            (input)="email = $any($event.target).value"
          />
        </div>
      </div>
      <div class="dialog__actions">
        <button class="btn btn--secondary" (click)="cancel()">Cancel</button>
        <button class="btn btn--primary" (click)="save()">Save Changes</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        padding: var(--lib-spacing-6);
        min-width: 400px;
      }

      .dialog__header {
        margin-block-end: var(--lib-spacing-5);
      }

      .dialog__title {
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
        margin: 0;
      }

      .dialog__content {
        margin-block-end: var(--lib-spacing-6);
      }

      .form-field {
        margin-block-end: var(--lib-spacing-4);
      }

      .label {
        display: block;
        font-size: var(--lib-font-size-sm);
        font-weight: var(--lib-font-weight-medium);
        margin-block-end: var(--lib-spacing-1);
        color: var(--lib-color-neutral-700);
      }

      .input {
        width: 100%;
        padding: var(--lib-spacing-2) var(--lib-spacing-3);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
        border-radius: var(--lib-border-radius-md);
        font-size: var(--lib-font-size-sm);
      }

      .input:focus {
        outline: none;
        border-color: var(--lib-color-primary-500);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--lib-color-primary-500) 20%, transparent);
      }

      .dialog__actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--lib-spacing-2);
      }

      .btn {
        padding: var(--lib-spacing-2) var(--lib-spacing-4);
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        border: none;
      }

      .btn--secondary {
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
      }

      .btn--primary {
        background: var(--lib-color-primary-500);
        color: white;
      }
    `,
  ],
})
export class FormDialogComponent {
  private readonly modalRef = inject(MODAL_REF) as {
    data: { name: string; email: string };
    close: (result: { name: string; email: string; saved: boolean } | null) => void;
  };

  name = '';
  email = '';

  constructor() {
    this.name = this.modalRef.data.name;
    this.email = this.modalRef.data.email;
  }

  save(): void {
    this.modalRef.close({ name: this.name, email: this.email, saved: true });
  }

  cancel(): void {
    this.modalRef.close(null);
  }
}
