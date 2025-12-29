import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableComponent, ColumnDefDirective } from '../../../../library/table';
import { User } from '../../../dummy/models';
import { MockApiService } from '../../../dummy/services';

@Component({
  selector: 'app-observable-table-example',
  standalone: true,
  imports: [TableComponent, ColumnDefDirective],
  template: `
    <div class="example-container">
      <h1>Observable Data Example</h1>
      <p class="description">Table with Observable data converted to Signal for reactivity.</p>

      <div class="actions">
        <button class="btn" (click)="loadData()">Reload Data</button>
      </div>

      <div class="example-card">
        <lib-table [dataSource]="users()" [loading]="loading()" [striped]="true">
          <ng-container libColumnDef="name">
            <ng-template #header>Name</ng-template>
            <ng-template #cell let-row>
              <div class="user-cell">
                <img [src]="row.avatarUrl" [alt]="row.name" class="avatar" />
                <span>{{ row.name }}</span>
              </div>
            </ng-template>
          </ng-container>

          <ng-container libColumnDef="email">
            <ng-template #header>Email</ng-template>
            <ng-template #cell let-row>{{ row.email }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="role">
            <ng-template #header>Role</ng-template>
            <ng-template #cell let-row>{{ row.role }}</ng-template>
          </ng-container>

          <ng-container libColumnDef="company">
            <ng-template #header>Company ID</ng-template>
            <ng-template #cell let-row>{{ row.companyId }}</ng-template>
          </ng-container>

          <ng-template #loadingTpl>
            <div class="custom-loading">
              <div class="spinner"></div>
              <p>Fetching users from API...</p>
            </div>
          </ng-template>
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
        margin-bottom: 1rem;
      }

      .actions {
        margin-bottom: 1rem;
      }

      .btn {
        padding: 0.5rem 1rem;
        background: #0d6efd;
        color: #fff;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
      }

      .btn:hover {
        background: #0b5ed7;
      }

      .example-card {
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .user-cell {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .custom-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem;
        color: #666;
      }

      .spinner {
        width: 2.5rem;
        height: 2.5rem;
        border: 3px solid #e9ecef;
        border-top-color: #0d6efd;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 1rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class ObservableTableExampleComponent {
  // Use toSignal() at component level (outside reactive context)
  private usersSignal = toSignal(MockApiService.getUsers(), {
    initialValue: [] as User[],
  });

  users = this.usersSignal;
  loading = signal(false);

  loadData() {
    this.loading.set(true);
    MockApiService.getUsers().subscribe(_data => {
      // Since we can't reassign the signal, we'll simulate reload
      // In a real app, you'd use a Subject or refresh mechanism
      this.loading.set(false);
    });
  }
}
