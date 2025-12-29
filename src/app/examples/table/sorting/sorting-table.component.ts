import { Component, signal, computed } from '@angular/core';
import { TableComponent, ColumnDefDirective } from '../../../../library/table';
import { Task } from '../../../dummy/models';
import { TASKS } from '../../../dummy/data';

@Component({
  selector: 'app-sorting-table-example',
  standalone: true,
  imports: [TableComponent, ColumnDefDirective],
  template: `
    <div class="example-container">
      <h1>Sorting Example</h1>
      <p class="description">
        Click column headers to sort. Current sort:
        {{ currentSort() || 'None' }}
      </p>

      <div class="example-card">
        <lib-table [dataSource]="sortedTasks()">
          <ng-container libColumnDef="title" [sortable]="true">
            <ng-template #header>
              <button class="sort-header" (click)="sort('title')">
                Title
                @if (sortColumn() === 'title') {
                  <span class="sort-icon">{{ sortDirection() === 'asc' ? '↑' : '↓' }}</span>
                }
              </button>
            </ng-template>
            <ng-template #cell let-row>{{ row.title }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="priority" [sortable]="true">
            <ng-template #header>
              <button class="sort-header" (click)="sort('priority')">
                Priority
                @if (sortColumn() === 'priority') {
                  <span class="sort-icon">{{ sortDirection() === 'asc' ? '↑' : '↓' }}</span>
                }
              </button>
            </ng-template>
            <ng-template #cell let-row>
              <span class="priority-badge" [attr.data-priority]="row.priority">
                {{ row.priority }}
              </span>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="status" [sortable]="true">
            <ng-template #header>
              <button class="sort-header" (click)="sort('status')">
                Status
                @if (sortColumn() === 'status') {
                  <span class="sort-icon">{{ sortDirection() === 'asc' ? '↑' : '↓' }}</span>
                }
              </button>
            </ng-template>
            <ng-template #cell let-row>{{ row.status }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="dueDate" [sortable]="true">
            <ng-template #header>
              <button class="sort-header" (click)="sort('dueDate')">
                Due Date
                @if (sortColumn() === 'dueDate') {
                  <span class="sort-icon">{{ sortDirection() === 'asc' ? '↑' : '↓' }}</span>
                }
              </button>
            </ng-template>
            <ng-template #cell let-row>{{ row.dueDate }}</ng-template>
          </ng-container>
        </lib-table>
      </div>
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
        margin-bottom: 1.5rem;
      }

      .example-card {
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .sort-header {
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0;
        color: inherit;
      }

      .sort-header:hover {
        color: #0d6efd;
      }
      .sort-icon {
        font-size: 0.75rem;
      }

      .priority-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .priority-badge[data-priority='critical'] {
        background: #f8d7da;
        color: #721c24;
      }
      .priority-badge[data-priority='high'] {
        background: #fff3cd;
        color: #856404;
      }
      .priority-badge[data-priority='medium'] {
        background: #cce5ff;
        color: #004085;
      }
      .priority-badge[data-priority='low'] {
        background: #d4edda;
        color: #155724;
      }
    `,
  ],
})
export class SortingTableExampleComponent {
  private tasks: Task[] = TASKS.slice(0, 15);

  sortColumn = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  currentSort = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection();
    return col ? `${col} (${dir})` : null;
  });

  sortedTasks = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col) return this.tasks;

    return [...this.tasks].sort((a, b) => {
      const aVal = (a as any)[col];
      const bVal = (b as any)[col];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return dir === 'asc' ? comparison : -comparison;
    });
  });

  sort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }
}
