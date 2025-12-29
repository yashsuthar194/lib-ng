import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SelectComponent, OptionComponent } from '../../../../library/select';

@Component({
  selector: 'app-forms-select-example',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, SelectComponent, OptionComponent],
  template: `
    <div class="example-page">
      <header class="example-header">
        <h1>Forms Integration</h1>
        <p>Full Reactive Forms support with validation.</p>
      </header>

      <section class="example-section">
        <h2>Registration Form</h2>
        <div class="example-demo">
          <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
            <div class="form-field">
              <label>Country *</label>
              <lib-select formControlName="country" placeholder="Select your country">
                <lib-option value="us">United States</lib-option>
                <lib-option value="uk">United Kingdom</lib-option>
                <lib-option value="ca">Canada</lib-option>
                <lib-option value="au">Australia</lib-option>
              </lib-select>
              @if (
                registrationForm.get('country')?.touched &&
                registrationForm.get('country')?.hasError('required')
              ) {
                <span class="error-message">Country is required</span>
              }
            </div>

            <div class="form-field">
              <label>Role *</label>
              <lib-select formControlName="role" placeholder="Select your role">
                <lib-option value="developer">Developer</lib-option>
                <lib-option value="designer">Designer</lib-option>
                <lib-option value="manager">Manager</lib-option>
                <lib-option value="other">Other</lib-option>
              </lib-select>
              @if (
                registrationForm.get('role')?.touched &&
                registrationForm.get('role')?.hasError('required')
              ) {
                <span class="error-message">Role is required</span>
              }
            </div>

            <div class="form-field">
              <label>Interests (optional)</label>
              <lib-select
                formControlName="interests"
                [multiple]="true"
                [searchable]="true"
                placeholder="Select your interests..."
              >
                <lib-option value="frontend">Frontend Development</lib-option>
                <lib-option value="backend">Backend Development</lib-option>
                <lib-option value="devops">DevOps</lib-option>
                <lib-option value="mobile">Mobile Development</lib-option>
                <lib-option value="ai">AI/ML</lib-option>
                <lib-option value="security">Security</lib-option>
              </lib-select>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn" [disabled]="registrationForm.invalid">
                Submit
              </button>
              <button type="button" class="reset-btn" (click)="resetForm()">Reset</button>
            </div>
          </form>

          <div class="example-output">
            <strong>Form Value:</strong>
            <pre>{{ registrationForm.value | json }}</pre>
            <strong>Form Status:</strong> {{ registrationForm.status }}
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>Disabled State</h2>
        <div class="example-demo">
          <lib-select [(value)]="disabledValue" [disabled]="true" placeholder="This is disabled">
            <lib-option value="1">Option 1</lib-option>
            <lib-option value="2">Option 2</lib-option>
          </lib-select>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        max-width: 600px;
      }

      .example-header {
        margin-block-end: var(--lib-spacing-8);
      }

      .example-header h1 {
        font-size: var(--lib-font-size-2xl);
        font-weight: var(--lib-font-weight-bold);
        color: var(--lib-color-neutral-900);
        margin-block-end: var(--lib-spacing-2);
      }

      .example-header p {
        color: var(--lib-color-neutral-600);
        margin: 0;
      }

      .example-section {
        margin-block-end: var(--lib-spacing-8);
      }

      .example-section h2 {
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
        color: var(--lib-color-neutral-800);
        margin-block-end: var(--lib-spacing-4);
      }

      .example-demo {
        padding: var(--lib-spacing-6);
        background: var(--lib-color-neutral-0);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
        border-radius: var(--lib-border-radius-lg);
      }

      .form-field {
        margin-block-end: var(--lib-spacing-5);
      }

      .form-field label {
        display: block;
        font-size: var(--lib-font-size-sm);
        font-weight: var(--lib-font-weight-medium);
        color: var(--lib-color-neutral-700);
        margin-block-end: var(--lib-spacing-2);
      }

      .error-message {
        display: block;
        margin-block-start: var(--lib-spacing-1);
        font-size: var(--lib-font-size-xs);
        color: var(--lib-color-error);
      }

      .form-actions {
        display: flex;
        gap: var(--lib-spacing-3);
        margin-block-start: var(--lib-spacing-6);
      }

      .submit-btn {
        padding: var(--lib-spacing-3) var(--lib-spacing-5);
        background: var(--lib-color-primary-500);
        color: white;
        border: none;
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        transition: background var(--lib-transition-fast);
      }

      .submit-btn:hover:not(:disabled) {
        background: var(--lib-color-primary-600);
      }

      .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .reset-btn {
        padding: var(--lib-spacing-3) var(--lib-spacing-5);
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
        border-radius: var(--lib-border-radius-md);
        font-weight: var(--lib-font-weight-medium);
        cursor: pointer;
        transition: background var(--lib-transition-fast);
      }

      .reset-btn:hover {
        background: var(--lib-color-neutral-200);
      }

      .example-output {
        margin-block-start: var(--lib-spacing-6);
        padding: var(--lib-spacing-4);
        background: var(--lib-color-neutral-50);
        border-radius: var(--lib-border-radius-base);
        font-size: var(--lib-font-size-sm);
      }

      .example-output pre {
        margin: var(--lib-spacing-2) 0;
        padding: var(--lib-spacing-2);
        background: var(--lib-color-neutral-900);
        color: var(--lib-color-neutral-100);
        border-radius: var(--lib-border-radius-base);
        overflow-x: auto;
      }
    `,
  ],
})
export class FormsSelectExampleComponent {
  registrationForm: FormGroup;
  disabledValue = signal<string | null>('1');

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      country: ['', Validators.required],
      role: ['', Validators.required],
      interests: [[]],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      alert('Form submitted! Check console for values.');
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
  }
}
