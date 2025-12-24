/**
 * Breadcrumb Example Component
 *
 * Demonstrates all Breadcrumb features including:
 * - Static breadcrumbs
 * - Programmatic control
 * - Disabled items
 * - Icons
 * - Separators and sizes
 */

import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbService,
  BreadcrumbItem,
} from '../../../library/breadcrumb';

@Component({
  selector: 'app-breadcrumb-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Breadcrumb Examples</h1>

      <!-- Basic Usage -->
      <section class="example-section">
        <h2>Basic Usage</h2>
        <p class="hint">Click any breadcrumb to navigate (in real app would route).</p>
        <lib-breadcrumb [items]="basicItems" (itemClick)="onItemClick($event)"></lib-breadcrumb>
      </section>

      <!-- With Icons -->
      <section class="example-section">
        <h2>With Icons</h2>
        <lib-breadcrumb [items]="iconItems"></lib-breadcrumb>
      </section>

      <!-- Disabled Item -->
      <section class="example-section">
        <h2>Disabled Item</h2>
        <p class="hint">The "Products" item is disabled and cannot be clicked.</p>
        <lib-breadcrumb [items]="disabledItems"></lib-breadcrumb>
      </section>

      <!-- Separators -->
      <section class="example-section">
        <h2>Separator Variants</h2>
        <div class="variant-grid">
          <div>
            <h3>Chevron (default)</h3>
            <lib-breadcrumb [items]="basicItems" separator="chevron"></lib-breadcrumb>
          </div>
          <div>
            <h3>Slash</h3>
            <lib-breadcrumb [items]="basicItems" separator="slash"></lib-breadcrumb>
          </div>
          <div>
            <h3>Arrow</h3>
            <lib-breadcrumb [items]="basicItems" separator="arrow"></lib-breadcrumb>
          </div>
          <div>
            <h3>Dot</h3>
            <lib-breadcrumb [items]="basicItems" separator="dot"></lib-breadcrumb>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Sizes</h2>
        <div class="size-stack">
          <div>
            <h3>Small</h3>
            <lib-breadcrumb [items]="basicItems" size="sm"></lib-breadcrumb>
          </div>
          <div>
            <h3>Medium (default)</h3>
            <lib-breadcrumb [items]="basicItems" size="md"></lib-breadcrumb>
          </div>
          <div>
            <h3>Large</h3>
            <lib-breadcrumb [items]="basicItems" size="lg"></lib-breadcrumb>
          </div>
        </div>
      </section>

      <!-- Programmatic Control -->
      <section class="example-section">
        <h2>Programmatic Control</h2>
        <p class="hint">Use service methods to update breadcrumbs.</p>
        <div class="button-row">
          <button (click)="addItem()">Push Item</button>
          <button (click)="removeItem()">Pop Item</button>
          <button (click)="updateLabel()">Update "Products" Label</button>
          <button (click)="resetItems()">Reset</button>
        </div>
        <lib-breadcrumb [items]="dynamicItems()"></lib-breadcrumb>
        <p class="info">Current items: {{ dynamicItems().length }}</p>
      </section>

      <!-- Collapse Long Trails -->
      <section class="example-section">
        <h2>Collapse Long Trails</h2>
        <p class="hint">With maxItems=4, middle items collapse to "..."</p>
        <lib-breadcrumb [items]="longTrail" [maxItems]="4"></lib-breadcrumb>
      </section>
    </div>
  `,
  styles: [`
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

    .variant-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--lib-spacing-4, 16px);
    }

    .size-stack {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-4, 16px);
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

    .info {
      margin-block-start: var(--lib-spacing-2, 8px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
    }
  `],
})
export class BreadcrumbExampleComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);

  // Basic items
  readonly basicItems: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'products', label: 'Products', link: '/products' },
    { id: 'electronics', label: 'Electronics', link: '/products/electronics' },
    { id: 'current', label: 'Laptop Pro 16', current: true },
  ];

  // Items with icons
  readonly iconItems: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', link: '/', icon: '🏠' },
    { id: 'docs', label: 'Documentation', link: '/docs', icon: '📚' },
    { id: 'api', label: 'API Reference', current: true, icon: '⚡' },
  ];

  // Items with disabled state
  readonly disabledItems: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'products', label: 'Products', link: '/products', disabled: true },
    { id: 'current', label: 'Item Details', current: true },
  ];

  // Long trail for collapse demo
  readonly longTrail: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'cat1', label: 'Category', link: '/cat' },
    { id: 'cat2', label: 'Subcategory', link: '/cat/sub' },
    { id: 'cat3', label: 'Sub-subcategory', link: '/cat/sub/sub' },
    { id: 'cat4', label: 'Another Level', link: '/cat/sub/sub/level' },
    { id: 'current', label: 'Final Item', current: true },
  ];

  // Dynamic items for programmatic control demo
  readonly dynamicItems = signal<BreadcrumbItem[]>([
    { id: 'home', label: 'Home', link: '/' },
    { id: 'products', label: 'Products', link: '/products' },
    { id: 'current', label: 'Current Page', current: true },
  ]);

  onItemClick(event: { item: BreadcrumbItem; index: number }): void {
    console.log('Breadcrumb clicked:', event.item.label, 'at index', event.index);
  }

  addItem(): void {
    const items = this.dynamicItems();
    // Remove current marker from last item
    const updated = items.map(item => ({ ...item, current: false }));
    // Add new current item
    updated.push({
      id: `item-${Date.now()}`,
      label: `New Item ${items.length}`,
      current: true,
    });
    this.dynamicItems.set(updated);
  }

  removeItem(): void {
    const items = this.dynamicItems();
    if (items.length <= 1) return;

    const updated = items.slice(0, -1);
    // Mark last as current
    updated[updated.length - 1].current = true;
    this.dynamicItems.set(updated);
  }

  updateLabel(): void {
    this.dynamicItems.update(items =>
      items.map(item =>
        item.id === 'products'
          ? { ...item, label: 'Updated Products!' }
          : item
      )
    );
  }

  resetItems(): void {
    this.dynamicItems.set([
      { id: 'home', label: 'Home', link: '/' },
      { id: 'products', label: 'Products', link: '/products' },
      { id: 'current', label: 'Current Page', current: true },
    ]);
  }
}
