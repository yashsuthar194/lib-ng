import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective } from '../../../../library/input';

/**
 * Basic Input Examples
 * 
 * Demonstrates standalone input directive usage without wrapper.
 */
@Component({
  selector: 'app-basic-input',
  standalone: true,
  imports: [FormsModule, InputDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Basic Input</h1>
      <p class="description">The libInput directive can be used standalone without a wrapper.</p>

      <!-- Size Variants -->
      <section class="example-section">
        <h2>Size Variants</h2>
        <div class="input-stack">
          <input libInput size="sm" placeholder="Small input" />
          <input libInput size="md" placeholder="Medium input (default)" />
          <input libInput size="lg" placeholder="Large input" />
        </div>
      </section>

      <!-- Style Variants -->
      <section class="example-section">
        <h2>Style Variants</h2>
        <div class="input-stack">
          <input libInput variant="outline" placeholder="Outline (default)" />
          <input libInput variant="filled" placeholder="Filled" />
          <input libInput variant="underline" placeholder="Underline" />
        </div>
      </section>

      <!-- Input Types -->
      <section class="example-section">
        <h2>Input Types</h2>
        <div class="input-stack">
          <input libInput type="text" placeholder="Text" />
          <input libInput type="email" placeholder="Email" />
          <input libInput type="password" placeholder="Password" />
          <input libInput type="number" placeholder="Number" />
          <input libInput type="tel" placeholder="Phone" />
          <input libInput type="url" placeholder="URL" />
          <input libInput type="date" />
        </div>
      </section>

      <!-- States -->
      <section class="example-section">
        <h2>States</h2>
        <div class="input-stack">
          <input libInput placeholder="Normal" [(ngModel)]="normalValue" />
          <input libInput placeholder="Disabled" disabled />
          <input libInput placeholder="Readonly" [readonly]="true" value="Read only value" />
        </div>
        <p class="value-display">Current value: {{ normalValue() }}</p>
      </section>

      <!-- Textarea -->
      <section class="example-section">
        <h2>Textarea</h2>
        <div class="input-stack">
          <textarea libInput size="md" placeholder="Enter your message..."></textarea>
          <textarea libInput size="lg" variant="filled" placeholder="Filled textarea"></textarea>
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
    
    .input-stack {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-3);
      max-width: 400px;
    }
    
    .value-display {
      margin-top: var(--lib-spacing-2);
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-500);
    }
  `],
})
export class BasicInputExampleComponent {
  readonly normalValue = signal('');
}
