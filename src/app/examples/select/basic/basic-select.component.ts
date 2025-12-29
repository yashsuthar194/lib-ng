import { Component, signal } from '@angular/core';
import { SelectComponent, OptionComponent } from '../../../../library/select';

@Component({
  selector: 'app-basic-select-example',
  standalone: true,
  imports: [SelectComponent, OptionComponent],
  template: `
    <div class="example-page">
      <header class="example-header">
        <h1>Basic Select</h1>
        <p>Simple single-select dropdown with static options.</p>
      </header>

      <section class="example-section">
        <h2>Default Select</h2>
        <div class="example-demo">
          <lib-select [(value)]="selectedCountry" placeholder="Select a country">
            <lib-option value="us">United States</lib-option>
            <lib-option value="uk">United Kingdom</lib-option>
            <lib-option value="ca">Canada</lib-option>
            <lib-option value="au">Australia</lib-option>
            <lib-option value="de">Germany</lib-option>
            <lib-option value="fr">France</lib-option>
          </lib-select>

          <div class="example-output">
            <strong>Selected:</strong> {{ selectedCountry() || 'None' }}
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>With Disabled Options</h2>
        <div class="example-demo">
          <lib-select [(value)]="selectedPlan" placeholder="Select a plan">
            <lib-option value="free">Free Plan</lib-option>
            <lib-option value="starter">Starter - $9/mo</lib-option>
            <lib-option value="pro">Pro - $29/mo</lib-option>
            <lib-option value="enterprise" [disabled]="true">Enterprise (Coming Soon)</lib-option>
          </lib-select>
        </div>
      </section>

      <section class="example-section">
        <h2>Clearable Select</h2>
        <div class="example-demo">
          <lib-select [(value)]="selectedSize" placeholder="Select size" [clearable]="true">
            <lib-option value="xs">Extra Small</lib-option>
            <lib-option value="sm">Small</lib-option>
            <lib-option value="md">Medium</lib-option>
            <lib-option value="lg">Large</lib-option>
            <lib-option value="xl">Extra Large</lib-option>
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

      .example-output {
        margin-block-start: var(--lib-spacing-4);
        padding: var(--lib-spacing-3);
        background: var(--lib-color-neutral-50);
        border-radius: var(--lib-border-radius-base);
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-600);
      }
    `,
  ],
})
export class BasicSelectExampleComponent {
  selectedCountry = signal<string | null>(null);
  selectedPlan = signal<string | null>(null);
  selectedSize = signal<string | null>(null);
}
