import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective } from '../../../../library/input';

/**
 * Search Input Example
 *
 * Demonstrates standalone input for search with debounce.
 */
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, InputDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Search Input</h1>
      <p class="description">
        Using libInput directive standalone for search - no wrapper needed! Built-in debounce
        support for performance.
      </p>

      <!-- Basic Search -->
      <section class="example-section">
        <h2>Basic Search</h2>
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            libInput
            type="search"
            variant="filled"
            placeholder="Search..."
            [(ngModel)]="searchQuery"
          />
          @if (searchQuery()) {
            <button class="clear-btn" (click)="clearSearch()">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          }
        </div>
        <p class="result">Current query: "{{ searchQuery() }}"</p>
      </section>

      <!-- Debounced Search -->
      <section class="example-section">
        <h2>Debounced Search (300ms)</h2>
        <p class="hint">Type to see debounced output - only emits after 300ms pause.</p>
        <div class="search-container search-container--outline">
          <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            libInput
            type="search"
            variant="outline"
            placeholder="Debounced search..."
            [debounce]="300"
            (valueChange)="onDebouncedSearch($event)"
          />
        </div>
        <div class="search-log">
          <p>Debounced values:</p>
          @for (value of searchLog(); track $index) {
            <span class="log-item">{{ value }}</span>
          } @empty {
            <span class="log-empty">Type to see debounced output...</span>
          }
        </div>
      </section>

      <!-- Table Filter -->
      <section class="example-section">
        <h2>Inline Table Filter</h2>
        <div class="table-filter">
          <input
            libInput
            type="text"
            size="sm"
            variant="filled"
            placeholder="Filter items..."
            [(ngModel)]="filterQuery"
          />
        </div>
        <ul class="filter-list">
          @for (item of filteredItems(); track item) {
            <li>{{ item }}</li>
          } @empty {
            <li class="no-results">No items match "{{ filterQuery() }}"</li>
          }
        </ul>
      </section>
    </div>
  `,
  styles: [
    `
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
        margin-block-end: var(--lib-spacing-3);
      }

      .hint {
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-500);
        margin-block-end: var(--lib-spacing-3);
      }

      /* Search container - wrapper that contains icon + input */
      .search-container {
        display: flex;
        align-items: center;
        max-width: 400px;
        position: relative;
        background: var(--lib-color-neutral-100);
        border-radius: var(--lib-border-radius-lg);
        border: var(--lib-border-width-thin, 1px) solid transparent;
        padding-inline-start: var(--lib-spacing-3);
        transition: all var(--lib-transition-fast);
      }

      /* Focus state handled by the container - no double border */
      .search-container:focus-within {
        background: var(--lib-color-neutral-0);
        border-color: var(--lib-color-primary-500);
      }

      /* Outline variant */
      .search-container--outline {
        background: var(--lib-color-neutral-0);
        border: var(--lib-border-width-thin, 1px) solid var(--lib-color-neutral-300);
      }

      .search-container--outline:focus-within {
        border-color: var(--lib-color-primary-500);
      }

      /* Input inside container - remove all internal styling */
      .search-container input.lib-input {
        flex: 1;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        min-width: 0;
        padding-inline-start: var(--lib-spacing-2);
      }

      /* Remove input focus ring when inside container (container handles it) */
      .search-container input.lib-input:focus {
        box-shadow: none !important;
        outline: none !important;
      }

      .search-icon {
        width: 20px;
        height: 20px;
        color: var(--lib-color-neutral-400);
        flex-shrink: 0;
      }

      .clear-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--lib-spacing-2) var(--lib-spacing-3);
        border-radius: var(--lib-border-radius-md);
        color: var(--lib-color-neutral-500);
        transition: all var(--lib-transition-fast);
      }

      .clear-btn:hover {
        background: var(--lib-color-neutral-100);
        color: var(--lib-color-neutral-700);
      }

      .clear-btn svg {
        width: 18px;
        height: 18px;
      }

      .result {
        margin-block-start: var(--lib-spacing-3);
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-500);
      }

      .search-log {
        margin-block-start: var(--lib-spacing-3);
        padding: var(--lib-spacing-4);
        background: var(--lib-color-neutral-900);
        border-radius: var(--lib-border-radius-md);
        font-family: var(--lib-font-family-mono, 'JetBrains Mono', monospace);
        font-size: var(--lib-font-size-xs);
        color: var(--lib-color-neutral-100);
      }

      .search-log p {
        color: var(--lib-color-neutral-400);
        margin-block-end: var(--lib-spacing-2);
      }

      .log-item {
        display: inline-block;
        background: var(--lib-color-primary-500);
        color: var(--lib-color-neutral-0);
        padding: var(--lib-spacing-1) var(--lib-spacing-2);
        border-radius: var(--lib-border-radius-md);
        margin-inline-end: var(--lib-spacing-2);
        margin-block-end: var(--lib-spacing-1);
      }

      .log-empty {
        color: var(--lib-color-neutral-500);
        font-style: italic;
      }

      .table-filter {
        max-width: 300px;
        margin-block-end: var(--lib-spacing-3);
      }

      .filter-list {
        list-style: none;
        padding: 0;
        margin: 0;
        border: var(--lib-border-width-thin, 1px) solid var(--lib-color-neutral-200);
        border-radius: var(--lib-border-radius-md);
        overflow: hidden;
      }

      .filter-list li {
        padding: var(--lib-spacing-3) var(--lib-spacing-4);
        border-block-end: var(--lib-border-width-thin, 1px) solid var(--lib-color-neutral-100);
      }

      .filter-list li:last-child {
        border-block-end: none;
      }

      .no-results {
        color: var(--lib-color-neutral-500);
        font-style: italic;
      }
    `,
  ],
})
export class SearchInputExampleComponent {
  readonly searchQuery = signal('');
  readonly filterQuery = signal('');
  readonly searchLog = signal<string[]>([]);

  private readonly items = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];

  readonly filteredItems = () => {
    const query = this.filterQuery().toLowerCase();
    if (!query) return this.items;
    return this.items.filter(item => item.toLowerCase().includes(query));
  };

  clearSearch(): void {
    this.searchQuery.set('');
  }

  onDebouncedSearch(value: string): void {
    if (value) {
      this.searchLog.update(log => [value, ...log.slice(0, 9)]);
    }
  }
}
