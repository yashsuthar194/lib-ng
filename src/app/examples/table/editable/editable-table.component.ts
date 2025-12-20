import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TableComponent,
  ColumnDefDirective,
  FormArrayDataSource,
} from '../../../../library/table';

interface UserFormData {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-editable-table-example',
  standalone: true,
  imports: [TableComponent, ColumnDefDirective, ReactiveFormsModule],
  template: `
    <div class="example-container">
      <h1>Editable Table (FormArray)</h1>
      <p class="description">
        Inline editing with Reactive Forms. Each row is a FormGroup.
      </p>

      <div class="actions">
        <button class="btn btn-primary" (click)="addRow()">+ Add Row</button>
        <button class="btn btn-secondary" (click)="logFormValue()">
          Log Form Value
        </button>
      </div>

      <div class="example-card">
        <lib-table [dataSource]="formArray.controls">
          <ng-container libColumnDef="name">
            <ng-template #header>Name</ng-template>
            <ng-template #cell let-row let-i="index">
              <input
                type="text"
                class="form-input"
                [formControl]="getControl(i, 'name')"
                placeholder="Enter name"
              />
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="email">
            <ng-template #header>Email</ng-template>
            <ng-template #cell let-row let-i="index">
              <input
                type="email"
                class="form-input"
                [formControl]="getControl(i, 'email')"
                placeholder="Enter email"
              />
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="role">
            <ng-template #header>Role</ng-template>
            <ng-template #cell let-row let-i="index">
              <select class="form-select" [formControl]="getControl(i, 'role')">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="actions">
            <ng-template #header>Actions</ng-template>
            <ng-template #cell let-row let-i="index">
              <button class="btn-icon btn-delete" (click)="removeRow(i)">
                🗑
              </button>
            </ng-template>
          </ng-container>
        </lib-table>
      </div>

      @if (formArray.length === 0) {
      <div class="empty-state">
        <p>No rows yet. Click "Add Row" to start.</p>
      </div>
      }
    </div>
  `,
  styles: [
    `
      h1 {
        margin-bottom: 0.5rem;
        color: #1a1a2e;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
      }

      .btn-primary {
        background: #0d6efd;
        color: #fff;
      }
      .btn-primary:hover {
        background: #0b5ed7;
      }
      .btn-secondary {
        background: #6c757d;
        color: #fff;
      }
      .btn-secondary:hover {
        background: #5c636a;
      }

      .example-card {
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .form-input,
      .form-select {
        width: 100%;
        padding: 0.375rem 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        font-size: 0.875rem;
      }

      .form-input:focus,
      .form-select:focus {
        outline: none;
        border-color: #86b7fe;
        box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
      }

      .btn-icon {
        padding: 0.25rem 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
      }

      .btn-delete:hover {
        color: #dc3545;
      }

      .empty-state {
        text-align: center;
        padding: 2rem;
        color: #666;
      }
    `,
  ],
})
export class EditableTableExampleComponent {
  formArray: FormArray<FormGroup>;

  constructor(private fb: FormBuilder) {
    this.formArray = this.fb.array<FormGroup>([
      this.createRow('John Doe', 'john@example.com', 'admin'),
      this.createRow('Jane Smith', 'jane@example.com', 'manager'),
      this.createRow('Bob Wilson', 'bob@example.com', 'user'),
    ]);
  }

  private createRow(name = '', email = '', role = 'user'): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      role: [role, Validators.required],
    });
  }

  getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  getControl(index: number, name: string): FormControl {
    return this.getFormGroup(index).get(name) as FormControl;
  }

  addRow() {
    this.formArray.push(this.createRow());
  }

  removeRow(index: number) {
    this.formArray.removeAt(index);
  }

  logFormValue() {
    console.log('Form Value:', this.formArray.getRawValue());
    alert('Check console for form value');
  }
}
