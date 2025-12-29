import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, ColumnDefDirective } from '../../../../library/table';
import { Company } from '../../../dummy/models';
import { COMPANIES } from '../../../dummy/data';

@Component({
  selector: 'app-pagination-table-example',
  standalone: true,
  imports: [CommonModule, TableComponent, ColumnDefDirective],
  template: `
    <div class="example-container">
      <h1>Pagination Example</h1>
      <p class="description">
        Navigate through pages of data. Showing {{ startIndex() + 1 }}-{{ endIndex() }} of
        {{ totalItems() }}
      </p>

      <div class="example-card">
        <lib-table [dataSource]="paginatedData()">
          <ng-container libColumnDef="name">
            <ng-template #header>Company Name</ng-template>
            <ng-template #cell let-row>
              <div class="company-cell">
                <img [src]="row.logoUrl" class="company-logo" alt="Logo" />
                <strong>{{ row.name }}</strong>
              </div>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="industry">
            <ng-template #header>Industry</ng-template>
            <ng-template #cell let-row>{{ row.industry }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="location">
            <ng-template #header>Location</ng-template>
            <ng-template #cell let-row
              >{{ row.address.city }}, {{ row.address.country }}</ng-template
            >
          </ng-container>

          <ng-container libColumnDef="employees">
            <ng-template #header>Employees</ng-template>
            <ng-template #cell let-row>{{ row.employeeCount | number }}</ng-template>
          </ng-container>
        </lib-table>

        <!-- Pagination Controls -->
        <div class="pagination">
          <div class="page-size">
            <label>Rows per page:</label>
            <select [value]="pageSize()" (change)="onPageSizeChange($event)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div class="page-info">{{ startIndex() + 1 }}-{{ endIndex() }} of {{ totalItems() }}</div>

          <div class="page-controls">
            <button [disabled]="pageIndex() === 0" (click)="firstPage()">⏮</button>
            <button [disabled]="pageIndex() === 0" (click)="prevPage()">◀</button>
            <button [disabled]="pageIndex() >= totalPages() - 1" (click)="nextPage()">▶</button>
            <button [disabled]="pageIndex() >= totalPages() - 1" (click)="lastPage()">⏭</button>
          </div>
        </div>
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

      .company-cell {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .company-logo {
        width: 32px;
        height: 32px;
        border-radius: 4px;
      }

      .pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2rem;
        padding: 0.75rem 1rem;
        background: #f8f9fa;
        border-top: 1px solid #dee2e6;
      }

      .page-size {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }

      .page-size select {
        padding: 0.25rem 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }

      .page-info {
        font-size: 0.875rem;
        color: #666;
      }

      .page-controls {
        display: flex;
        gap: 0.25rem;
      }

      .page-controls button {
        width: 2rem;
        height: 2rem;
        border: 1px solid #ced4da;
        background: #fff;
        border-radius: 0.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .page-controls button:hover:not(:disabled) {
        background: #e9ecef;
      }

      .page-controls button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
})
export class PaginationTableExampleComponent {
  private allData: Company[] = COMPANIES;

  pageIndex = signal(0);
  pageSize = signal(5);

  totalItems = computed(() => this.allData.length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  startIndex = computed(() => this.pageIndex() * this.pageSize());
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize(), this.totalItems()));

  paginatedData = computed(() => {
    const start = this.startIndex();
    const end = start + this.pageSize();
    return this.allData.slice(start, end);
  });

  onPageSizeChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    this.pageSize.set(value);
    this.pageIndex.set(0);
  }

  firstPage() {
    this.pageIndex.set(0);
  }
  lastPage() {
    this.pageIndex.set(this.totalPages() - 1);
  }
  prevPage() {
    this.pageIndex.update(i => Math.max(0, i - 1));
  }
  nextPage() {
    this.pageIndex.update(i => Math.min(this.totalPages() - 1, i + 1));
  }
}
