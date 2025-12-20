import { Component, signal } from '@angular/core';
import { TableComponent, ColumnDefDirective } from '../../../../library/table';
import { User } from '../../../dummy/models';
import { USERS } from '../../../dummy/data';

@Component({
  selector: 'app-basic-table-example',
  standalone: true,
  imports: [TableComponent, ColumnDefDirective],
  template: `
    <div class="example-container">
      <h1>Basic Table Example</h1>
      <p class="description">
        Simple table with array data binding and legacy template approach.
      </p>

      <div class="example-card">
        <lib-table [dataSource]="users" [striped]="true" [hoverable]="true">
          <ng-container libColumnDef="name">
            <ng-template #header>Name</ng-template>
            <ng-template #cell let-row>{{ row.name }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="email">
            <ng-template #header>Email</ng-template>
            <ng-template #cell let-row>{{ row.email }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="role">
            <ng-template #header>Role</ng-template>
            <ng-template #cell let-row>
              <span class="badge" [class]="'badge--' + row.role">{{
                row.role
              }}</span>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="status">
            <ng-template #header>Status</ng-template>
            <ng-template #cell let-row>
              <span class="status" [class.status--active]="row.isActive">
                {{ row.isActive ? 'Active' : 'Inactive' }}
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

      .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .badge--admin {
        background: #e3f2fd;
        color: #1565c0;
      }

      .badge--manager {
        background: #f3e5f5;
        color: #7b1fa2;
      }

      .badge--user {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .badge--guest {
        background: #fff3e0;
        color: #ef6c00;
      }

      .status {
        color: #dc3545;
      }

      .status--active {
        color: #28a745;
      }
    `,
  ],
})
export class BasicTableExampleComponent {
  users: User[] = USERS;
}
