import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, ColumnDefDirective } from '../../../../library/table';
import { Project, ProjectStatus } from '../../../dummy/models';
import { PROJECTS } from '../../../dummy/data';

@Component({
  selector: 'app-columns-table-example',
  standalone: true,
  imports: [CommonModule, TableComponent, ColumnDefDirective],
  template: `
    <div class="example-container">
      <h1>Column Definitions Example</h1>
      <p class="description">
        Declarative column definitions with custom cell templates and widths.
      </p>

      <div class="example-card">
        <lib-table [dataSource]="projects">
          <ng-container libColumnDef="name" [width]="'200px'">
            <ng-template #header>Project Name</ng-template>
            <ng-template #cell let-row>
              <strong>{{ row.name }}</strong>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="description">
            <ng-template #header>Description</ng-template>
            <ng-template #cell let-row>
              <span class="description-cell">{{ row.description }}</span>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="status" [width]="'120px'">
            <ng-template #header>Status</ng-template>
            <ng-template #cell let-row>
              <span class="status-badge" [attr.data-status]="row.status">
                {{ row.status }}
              </span>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="budget" [width]="'120px'">
            <ng-template #header>Budget</ng-template>
            <ng-template #cell let-row>
              {{ row.budget | currency }}
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="dates" [width]="'180px'">
            <ng-template #header>Timeline</ng-template>
            <ng-template #cell let-row>
              <span class="date-range">
                {{ row.startDate }} → {{ row.endDate }}
              </span>
            </ng-template>
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

      .description-cell {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 0.85rem;
        color: #666;
      }

      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
      }

      .status-badge[data-status='active'] {
        background: #d4edda;
        color: #155724;
      }

      .status-badge[data-status='completed'] {
        background: #cce5ff;
        color: #004085;
      }

      .status-badge[data-status='on-hold'] {
        background: #fff3cd;
        color: #856404;
      }

      .date-range {
        font-size: 0.85rem;
        color: #666;
      }
    `,
  ],
})
export class ColumnsTableExampleComponent {
  projects: Project[] = PROJECTS.slice(0, 8);
}
