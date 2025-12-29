/**
 * Accordion Example Component
 *
 * Demonstrates all Accordion features including:
 * - Basic usage and variants
 * - Single and multiple expand modes
 * - Programmatic control
 * - Lazy loading and forms
 * - Custom headers
 */

import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {
  AccordionComponent,
  AccordionItemComponent,
  AccordionContentDirective,
} from '../../../library/accordion';

@Component({
  selector: 'app-accordion-example',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    AccordionComponent,
    AccordionItemComponent,
    AccordionContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Accordion Examples</h1>

      <!-- Basic Usage -->
      <section class="example-section">
        <h2>Basic Usage (Single Expand)</h2>
        <p class="hint">Click a panel to expand. Other panels auto-collapse.</p>
        <lib-accordion>
          <lib-accordion-item header="What is Angular?">
            Angular is a platform for building mobile and desktop web applications. It provides a
            comprehensive set of tools for developing, testing, and deploying applications.
          </lib-accordion-item>
          <lib-accordion-item header="What are Signals?">
            Signals are a reactive primitive that provides fine-grained reactivity. They
            automatically track dependencies and notify consumers of changes.
          </lib-accordion-item>
          <lib-accordion-item header="What is OnPush?">
            OnPush is a change detection strategy that only checks a component when its inputs
            change or an event is triggered within it.
          </lib-accordion-item>
        </lib-accordion>
      </section>

      <!-- Multiple Expand Mode -->
      <section class="example-section">
        <h2>Multiple Expand Mode</h2>
        <p class="hint">Multiple panels can be open at the same time.</p>
        <lib-accordion [multiple]="true">
          <lib-accordion-item header="Panel 1" [expanded]="true">
            This panel starts expanded. You can open others without closing this.
          </lib-accordion-item>
          <lib-accordion-item header="Panel 2"> Open me while Panel 1 is open! </lib-accordion-item>
          <lib-accordion-item header="Panel 3">
            All panels can be open simultaneously.
          </lib-accordion-item>
        </lib-accordion>
      </section>

      <!-- Programmatic Control -->
      <section class="example-section">
        <h2>Programmatic Control</h2>
        <p class="hint">Control accordion via component methods.</p>
        <div class="button-row">
          <button (click)="controlledAccordion.expand(0)">Open First</button>
          <button (click)="controlledAccordion.collapse(0)">Close First</button>
          <button (click)="controlledAccordion.toggle(1)">Toggle Second</button>
          <button (click)="controlledAccordion.expandAll()">Expand All</button>
          <button (click)="controlledAccordion.collapseAll()">Collapse All</button>
        </div>
        <lib-accordion
          #controlledAccordion
          [multiple]="true"
          (accordionChange)="onAccordionChange($event)"
        >
          <lib-accordion-item header="Panel 1">Content 1</lib-accordion-item>
          <lib-accordion-item header="Panel 2">Content 2</lib-accordion-item>
          <lib-accordion-item header="Panel 3">Content 3</lib-accordion-item>
        </lib-accordion>
        @if (lastChange()) {
          <p class="change-info">
            Last change: Panel {{ lastChange()!.index + 1 }}
            {{ lastChange()!.expanded ? 'expanded' : 'collapsed' }}
            ({{ lastChange()!.source }})
          </p>
        }
      </section>

      <!-- Variants -->
      <section class="example-section">
        <h2>Style Variants</h2>
        <div class="variant-grid">
          <div>
            <h3>Bordered</h3>
            <lib-accordion variant="bordered">
              <lib-accordion-item header="Item 1">Bordered content 1</lib-accordion-item>
              <lib-accordion-item header="Item 2">Bordered content 2</lib-accordion-item>
            </lib-accordion>
          </div>
          <div>
            <h3>Separated</h3>
            <lib-accordion variant="separated">
              <lib-accordion-item header="Item 1">Separated content 1</lib-accordion-item>
              <lib-accordion-item header="Item 2">Separated content 2</lib-accordion-item>
            </lib-accordion>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Sizes</h2>
        <div class="variant-grid">
          <div>
            <h3>Small</h3>
            <lib-accordion size="sm" variant="bordered">
              <lib-accordion-item header="Small Item">Small content</lib-accordion-item>
            </lib-accordion>
          </div>
          <div>
            <h3>Medium (Default)</h3>
            <lib-accordion size="md" variant="bordered">
              <lib-accordion-item header="Medium Item">Medium content</lib-accordion-item>
            </lib-accordion>
          </div>
          <div>
            <h3>Large</h3>
            <lib-accordion size="lg" variant="bordered">
              <lib-accordion-item header="Large Item">Large content</lib-accordion-item>
            </lib-accordion>
          </div>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="example-section">
        <h2>Disabled Panel</h2>
        <p class="hint">The second panel is disabled and cannot be expanded.</p>
        <lib-accordion variant="bordered">
          <lib-accordion-item header="Enabled Panel">This panel works normally.</lib-accordion-item>
          <lib-accordion-item header="Disabled Panel" [disabled]="true">
            This content is hidden because the panel is disabled.
          </lib-accordion-item>
          <lib-accordion-item header="Another Enabled">This also works.</lib-accordion-item>
        </lib-accordion>
      </section>

      <!-- Lazy Loading -->
      <section class="example-section">
        <h2>Lazy Content Loading</h2>
        <p class="hint">Content is only rendered when panel first opens. Check console.</p>
        <lib-accordion variant="bordered">
          <lib-accordion-item header="Lazy Loaded Content">
            <ng-template libAccordionContent>
              {{ logRender('Lazy content rendered!') }}
              This content was lazily loaded when you opened the panel.
            </ng-template>
          </lib-accordion-item>
        </lib-accordion>
      </section>

      <!-- Form with Keep Mounted -->
      <section class="example-section">
        <h2>Form with Keep Mounted</h2>
        <p class="hint">
          Form state is preserved when collapsed. Try filling the form, collapsing, and re-opening.
        </p>
        <lib-accordion variant="bordered" [multiple]="true">
          <lib-accordion-item header="User Details" [keepMounted]="true" [expanded]="true">
            <ng-template libAccordionContent>
              <div class="form-grid">
                <label>
                  Name:
                  <input type="text" [(ngModel)]="formData.name" placeholder="Enter name" />
                </label>
                <label>
                  Email:
                  <input type="email" [(ngModel)]="formData.email" placeholder="Enter email" />
                </label>
              </div>
            </ng-template>
          </lib-accordion-item>
          <lib-accordion-item header="Address" [keepMounted]="true">
            <ng-template libAccordionContent>
              <div class="form-grid">
                <label>
                  Street:
                  <input type="text" [(ngModel)]="formData.street" placeholder="Street address" />
                </label>
                <label>
                  City:
                  <input type="text" [(ngModel)]="formData.city" placeholder="City" />
                </label>
              </div>
            </ng-template>
          </lib-accordion-item>
        </lib-accordion>
        <p class="form-state">Form data: {{ formData | json }}</p>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        padding: var(--lib-spacing-6, 24px);
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
        margin-block-end: var(--lib-spacing-2, 8px);
        color: var(--lib-color-neutral-800, #27272a);
      }

      .example-section h3 {
        font-size: var(--lib-font-size-sm, 0.875rem);
        margin-block-end: var(--lib-spacing-2, 8px);
        color: var(--lib-color-neutral-600, #52525b);
      }

      .hint {
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-500, #71717a);
        margin-block-end: var(--lib-spacing-4, 16px);
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--lib-spacing-2, 8px);
        margin-block-end: var(--lib-spacing-4, 16px);
      }

      .button-row button {
        padding: var(--lib-spacing-2, 8px) var(--lib-spacing-3, 12px);
        border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
        border-radius: var(--lib-border-radius-md, 6px);
        background: var(--lib-color-neutral-0, #fff);
        cursor: pointer;
        font-size: var(--lib-font-size-sm, 0.875rem);
      }

      .button-row button:hover {
        background: var(--lib-color-neutral-100, #f4f4f5);
      }

      .change-info {
        margin-block-start: var(--lib-spacing-3, 12px);
        padding: var(--lib-spacing-2, 8px) var(--lib-spacing-3, 12px);
        background: var(--lib-color-primary-100, #dbeafe);
        color: var(--lib-color-primary-700, #1d4ed8);
        border-radius: var(--lib-border-radius-md, 6px);
        font-size: var(--lib-font-size-sm, 0.875rem);
      }

      .variant-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--lib-spacing-4, 16px);
      }

      .form-grid {
        display: grid;
        gap: var(--lib-spacing-3, 12px);
      }

      .form-grid label {
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-1, 4px);
        font-size: var(--lib-font-size-sm, 0.875rem);
      }

      .form-grid input {
        padding: var(--lib-spacing-2, 8px);
        border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
        border-radius: var(--lib-border-radius-md, 6px);
        font-size: var(--lib-font-size-base, 1rem);
      }

      .form-state {
        margin-block-start: var(--lib-spacing-3, 12px);
        padding: var(--lib-spacing-2, 8px);
        background: var(--lib-color-neutral-100, #f4f4f5);
        border-radius: var(--lib-border-radius-md, 6px);
        font-family: monospace;
        font-size: var(--lib-font-size-sm, 0.875rem);
      }
    `,
  ],
})
export class AccordionExampleComponent {
  @ViewChild('controlledAccordion') controlledAccordion!: AccordionComponent;

  readonly lastChange = signal<{ index: number; expanded: boolean; source: string } | null>(null);

  readonly formData = {
    name: '',
    email: '',
    street: '',
    city: '',
  };

  onAccordionChange(event: { index: number; expanded: boolean; source: string }): void {
    this.lastChange.set(event);
  }

  logRender(message: string): string {
    console.log(message);
    return '';
  }
}
