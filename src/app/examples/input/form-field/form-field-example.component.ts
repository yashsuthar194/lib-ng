import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { 
  InputDirective, 
  FormFieldComponent, 
  PrefixDirective, 
  SuffixDirective 
} from '../../../../library/input';

/**
 * Form Field Examples
 * 
 * Demonstrates form-field wrapper with labels, validation, and icons.
 */
@Component({
  selector: 'app-form-field-example',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    InputDirective, 
    FormFieldComponent, 
    PrefixDirective, 
    SuffixDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Form Field</h1>
      <p class="description">
        Using lib-form-field wrapper for forms with labels, hints, and validation.
      </p>

      <!-- Login Form Example -->
      <section class="example-section">
        <h2>Login Form</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="form">
          <lib-form-field 
            label="Email" 
            [required]="true"
            [error]="emailError()"
          >
            <svg libPrefix viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <input 
              libInput 
              type="email" 
              formControlName="email"
              autocomplete="email"
            />
          </lib-form-field>

          <lib-form-field 
            label="Password" 
            [required]="true"
            [error]="passwordError()"
          >
            <svg libPrefix viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <input 
              libInput 
              [type]="showPassword() ? 'text' : 'password'" 
              formControlName="password"
              autocomplete="current-password"
            />
            <button 
              libSuffix 
              type="button"
              (click)="togglePassword()"
              [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
            >
              {{ showPassword() ? '🙈' : '👁️' }}
            </button>
          </lib-form-field>

          <button type="submit" class="submit-btn" [disabled]="loginForm.invalid">
            Sign In
          </button>
        </form>
      </section>

      <!-- Various Field States -->
      <section class="example-section">
        <h2>Field States</h2>
        <div class="form">
          <lib-form-field 
            label="Normal Field" 
            hint="This is a helpful hint text"
          >
            <input libInput type="text" placeholder="Enter text..." />
          </lib-form-field>

          <lib-form-field 
            label="Required Field" 
            [required]="true"
            hint="This field is required"
          >
            <input libInput type="text" placeholder="Required..." />
          </lib-form-field>

          <lib-form-field 
            label="Disabled Field"
          >
            <input libInput type="text" disabled value="Cannot edit this" />
          </lib-form-field>

          <lib-form-field 
            label="Readonly Field"
          >
            <input libInput type="text" [readonly]="true" value="Read only content" />
          </lib-form-field>
        </div>
      </section>

      <!-- Textarea with Counter -->
      <section class="example-section">
        <h2>Textarea with Character Counter</h2>
        <div class="form">
          <lib-form-field 
            label="Bio" 
            hint="Tell us about yourself"
            [showCharCount]="true"
            [maxLength]="200"
          >
            <textarea 
              libInput 
              [(ngModel)]="bioValue"
              placeholder="Enter your bio..."
              maxlength="200"
            ></textarea>
          </lib-form-field>
        </div>
      </section>

      <!-- Auto-Resize Textarea -->
      <section class="example-section">
        <h2>Auto-Expanding Textarea</h2>
        <p class="hint">This textarea automatically expands as you type more content.</p>
        <div class="form">
          <lib-form-field 
            label="Comments" 
            hint="Textarea grows with content (min 2 rows, max 10 rows)"
          >
            <textarea 
              libInput 
              [(ngModel)]="commentsValue"
              placeholder="Start typing... the textarea will expand as you add more lines"
              [autoResize]="true"
              [minRows]="2"
              [maxRows]="10"
            ></textarea>
          </lib-form-field>

          <lib-form-field 
            label="Unlimited Growth" 
            hint="No max rows - grows indefinitely"
          >
            <textarea 
              libInput 
              [(ngModel)]="unlimitedValue"
              placeholder="This textarea has no maximum height limit"
              [autoResize]="true"
              [minRows]="3"
            ></textarea>
          </lib-form-field>
        </div>
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
    }
    
    .example-section h2 {
      font-size: var(--lib-font-size-lg);
      margin-block-end: var(--lib-spacing-4);
    }
    
    .form {
      max-width: 400px;
    }
    
    .submit-btn {
      width: 100%;
      padding: var(--lib-spacing-3);
      background: var(--lib-color-primary-500);
      color: white;
      border: none;
      border-radius: var(--lib-border-radius-md);
      font-weight: var(--lib-font-weight-semibold);
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
    
    lib-form-field svg {
      width: 20px;
      height: 20px;
    }
  `],
})
export class FormFieldExampleComponent {
  private readonly fb = new FormBuilder();
  
  readonly showPassword = signal(false);
  readonly bioValue = signal('');
  readonly commentsValue = signal('');
  readonly unlimitedValue = signal('');
  
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    bio: [''],
  });
  
  readonly emailError = () => {
    const control = this.loginForm.get('email');
    if (control?.hasError('required') && control?.touched) {
      return 'Email is required';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Please enter a valid email';
    }
    return '';
  };
  
  readonly passwordError = () => {
    const control = this.loginForm.get('password');
    if (control?.hasError('required') && control?.touched) {
      return 'Password is required';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };
  
  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
  
  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      alert('Login submitted! Check console for values.');
    }
  }
}
