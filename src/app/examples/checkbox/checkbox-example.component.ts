/**
 * Checkbox Example Component
 * 
 * Demonstrates checkbox and switch components, their variants, sizes, states, and features.
 */

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  CheckboxComponent, 
  SwitchComponent,
  SwitchCheckedIconDirective,
  SwitchUncheckedIconDirective,
  CheckboxGroupComponent,
  CheckboxOption 
} from '../../../library/checkbox';

@Component({
  selector: 'app-checkbox-example',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CheckboxComponent, 
    SwitchComponent, 
    SwitchCheckedIconDirective,
    SwitchUncheckedIconDirective,
    CheckboxGroupComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Checkbox & Switch Examples</h1>
      
      <!-- Basic Checkbox -->
      <section class="example-section">
        <h2>Basic Checkbox</h2>
        <div class="checkbox-row">
          <lib-checkbox [(ngModel)]="basic">Accept terms and conditions</lib-checkbox>
        </div>
        <p class="status">Value: {{ basic() }}</p>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Checkbox Sizes</h2>
        <div class="checkbox-row">
          <lib-checkbox size="sm" [(ngModel)]="sizeSm">Small</lib-checkbox>
          <lib-checkbox size="md" [(ngModel)]="sizeMd">Medium (default)</lib-checkbox>
          <lib-checkbox size="lg" [(ngModel)]="sizeLg">Large</lib-checkbox>
        </div>
      </section>

      <!-- Switch Component (separate from checkbox) -->
      <section class="example-section">
        <h2>Switch/Toggle Component</h2>
        <p class="hint">Switches are now a separate component for better design control.</p>
        <div class="checkbox-column">
          <lib-switch [(ngModel)]="darkMode">
            Dark Mode
          </lib-switch>
          <lib-switch [(ngModel)]="notifications">
            Enable Notifications
          </lib-switch>
          <lib-switch size="sm" [(ngModel)]="compact">
            Compact (small)
          </lib-switch>
          <lib-switch size="lg" [(ngModel)]="premium">
            Premium Features (large)
          </lib-switch>
        </div>
      </section>

      <!-- Switch with Icons -->
      <section class="example-section">
        <h2>Switch with Icons</h2>
        <p class="hint">Custom icons for checked/unchecked states with smooth crossfade animation.</p>
        <div class="checkbox-column">
          <!-- Theme toggle with emoji -->
          <lib-switch [(ngModel)]="themeSwitch">
            <ng-template libSwitchCheckedIcon>🌙</ng-template>
            <ng-template libSwitchUncheckedIcon>☀️</ng-template>
            Theme ({{ themeSwitch() ? 'Dark' : 'Light' }})
          </lib-switch>
          
          <!-- Notification with emoji -->
          <lib-switch [(ngModel)]="notifSwitch">
            <ng-template libSwitchCheckedIcon>🔔</ng-template>
            <ng-template libSwitchUncheckedIcon>🔕</ng-template>
            Notifications
          </lib-switch>
          
          <!-- Sound toggle with large size -->
          <lib-switch size="lg" [(ngModel)]="soundSwitch">
            <ng-template libSwitchCheckedIcon>🔊</ng-template>
            <ng-template libSwitchUncheckedIcon>🔇</ng-template>
            Sound (Large)
          </lib-switch>
          
          <!-- WiFi with small size -->
          <lib-switch size="sm" [(ngModel)]="wifiSwitch">
            <ng-template libSwitchCheckedIcon>📶</ng-template>
            <ng-template libSwitchUncheckedIcon>✕</ng-template>
            WiFi (Small)
          </lib-switch>
        </div>
      </section>

      <!-- Indeterminate State -->
      <section class="example-section">
        <h2>Indeterminate State (Select All)</h2>
        <div class="checkbox-column">
          <lib-checkbox 
            [checked]="allSelected()" 
            [indeterminate]="someSelected()" 
            (checkedChange)="toggleAll($event)">
            <strong>Select All</strong>
          </lib-checkbox>
          <div class="indent">
            <lib-checkbox [(ngModel)]="items[0]">Item 1</lib-checkbox>
            <lib-checkbox [(ngModel)]="items[1]">Item 2</lib-checkbox>
            <lib-checkbox [(ngModel)]="items[2]">Item 3</lib-checkbox>
          </div>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="example-section">
        <h2>Disabled State</h2>
        <div class="checkbox-row">
          <lib-checkbox [disabled]="true">Disabled unchecked</lib-checkbox>
          <lib-checkbox [disabled]="true" [checked]="true">Disabled checked</lib-checkbox>
          <lib-switch [disabled]="true">Disabled switch</lib-switch>
        </div>
      </section>

      <!-- Label Position -->
      <section class="example-section">
        <h2>Label Position</h2>
        <div class="checkbox-row">
          <lib-checkbox labelPosition="after">Label after (default)</lib-checkbox>
          <lib-checkbox labelPosition="before">Label before</lib-checkbox>
        </div>
      </section>

      <!-- Dynamic Label (Switch) -->
      <section class="example-section">
        <h2>Dynamic Label (Switch)</h2>
        <div class="checkbox-column">
          <lib-switch 
            [(ngModel)]="dynamicLabel"
            checkedLabel="Enabled ✓"
            uncheckedLabel="Disabled ✗">
          </lib-switch>
        </div>
      </section>

      <!-- With Ripple -->
      <section class="example-section">
        <h2>With Ripple Effect (Opt-in)</h2>
        <div class="checkbox-row">
          <lib-checkbox [ripple]="true" [(ngModel)]="rippleCheckbox">Checkbox with ripple</lib-checkbox>
          <lib-switch [ripple]="true" [(ngModel)]="rippleSwitch">Switch with ripple</lib-switch>
        </div>
        <p class="hint">Click to see the ripple animation</p>
      </section>

      <!-- Checkbox Group -->
      <section class="example-section">
        <h2>Checkbox Group</h2>
        <lib-checkbox-group 
          [(ngModel)]="selectedFruits" 
          [options]="fruitOptions"
          orientation="vertical"
          label="Select your favorite fruits">
        </lib-checkbox-group>
        <p class="status">Selected: {{ selectedFruits() | json }}</p>
      </section>

      <!-- Horizontal Group -->
      <section class="example-section">
        <h2>Horizontal Checkbox Group</h2>
        <lib-checkbox-group 
          [(ngModel)]="selectedColors" 
          [options]="colorOptions"
          orientation="horizontal"
          label="Select colors">
        </lib-checkbox-group>
        <p class="status">Selected: {{ selectedColors() | json }}</p>
      </section>
    </div>
  `,
  styles: [`
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
      margin-block-end: var(--lib-spacing-4, 16px);
      color: var(--lib-color-neutral-800, #27272a);
    }

    .checkbox-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lib-spacing-4, 16px);
      align-items: center;
    }

    .checkbox-column {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-3, 12px);
    }

    .indent {
      margin-inline-start: var(--lib-spacing-6, 24px);
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-2, 8px);
    }

    .status {
      margin-block-start: var(--lib-spacing-3, 12px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
    }

    .hint {
      margin-block-start: var(--lib-spacing-3, 12px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
      font-style: italic;
    }
  `],
})
export class CheckboxExampleComponent {
  // Basic checkbox
  readonly basic = signal(false);

  // Sizes
  readonly sizeSm = signal(false);
  readonly sizeMd = signal(true);
  readonly sizeLg = signal(false);

  // Switch examples
  readonly darkMode = signal(false);
  readonly notifications = signal(true);
  readonly compact = signal(false);
  readonly premium = signal(true);

  // Icon switch examples
  readonly themeSwitch = signal(false);
  readonly notifSwitch = signal(true);
  readonly soundSwitch = signal(true);
  readonly wifiSwitch = signal(false);

  // Indeterminate (parent-child)
  items = [false, true, false];

  allSelected(): boolean {
    return this.items.every(item => item);
  }

  someSelected(): boolean {
    return this.items.some(item => item) && !this.allSelected();
  }

  toggleAll(checked: boolean): void {
    this.items = this.items.map(() => checked);
  }

  // Dynamic label
  readonly dynamicLabel = signal(false);

  // Ripple
  readonly rippleCheckbox = signal(false);
  readonly rippleSwitch = signal(true);

  // Checkbox group
  readonly fruitOptions: CheckboxOption<string>[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'mango', label: 'Mango', disabled: true },
  ];
  readonly selectedFruits = signal<string[]>(['apple']);

  // Horizontal group
  readonly colorOptions: CheckboxOption<string>[] = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ];
  readonly selectedColors = signal<string[]>([]);
}
