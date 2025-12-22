import { Component, signal } from '@angular/core';
import { SelectComponent, OptionComponent, OptionGroupComponent } from '../../../../library/select';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
}

@Component({
  selector: 'app-template-select-example',
  standalone: true,
  imports: [SelectComponent, OptionComponent, OptionGroupComponent],
  template: `
    <div class="example-page">
      <header class="example-header">
        <h1>Custom Templates</h1>
        <p>Use avatars, icons, and rich content in your options.</p>
      </header>

      <section class="example-section">
        <h2>User Select with Avatars</h2>
        <div class="example-demo">
          <lib-select 
            [(value)]="selectedUser" 
            [searchable]="true"
            placeholder="Assign to team member..."
          >
            @for (user of users; track user.id) {
              <lib-option [value]="user.id" [searchTerms]="[user.name, user.email, user.role]">
                <div class="user-option">
                  <img [src]="user.avatar" class="user-avatar" [alt]="user.name" />
                  <div class="user-info">
                    <span class="user-name">{{ user.name }}</span>
                    <span class="user-email">{{ user.email }}</span>
                  </div>
                  <span class="user-role">{{ user.role }}</span>
                </div>
              </lib-option>
            }
          </lib-select>
          
          <div class="example-output">
            <strong>Selected:</strong> {{ getUserName(selectedUser()) }}
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>Grouped by Department</h2>
        <div class="example-demo">
          <lib-select 
            [(value)]="selectedGroupedUser" 
            placeholder="Select by department..."
          >
            @for (dept of departments; track dept) {
              <lib-option-group [label]="dept">
                @for (user of getUsersByDept(dept); track user.id) {
                  <lib-option [value]="user.id">
                    <div class="user-option-simple">
                      <img [src]="user.avatar" class="user-avatar-sm" [alt]="user.name" />
                      <span>{{ user.name }}</span>
                    </div>
                  </lib-option>
                }
              </lib-option-group>
            }
          </lib-select>
        </div>
      </section>

      <section class="example-section">
        <h2>Role-Based Conditional Options</h2>
        <p class="section-description">Toggle admin mode to see additional options appear.</p>
        
        <div class="toggle-container">
          <label class="toggle-label">
            <input 
              type="checkbox" 
              [checked]="isAdmin()"
              (change)="isAdmin.set(!isAdmin())"
            />
            Admin Mode
          </label>
        </div>
        
        <div class="example-demo">
          <lib-select [(value)]="selectedPermission" placeholder="Select permission level...">
            <lib-option value="read">Read Only</lib-option>
            <lib-option value="write">Read & Write</lib-option>
            
            @if (isAdmin()) {
              <lib-option value="admin">Administrator</lib-option>
              <lib-option value="super">Super Admin</lib-option>
              <lib-option value="owner">Owner</lib-option>
            }
          </lib-select>
          
          <div class="example-hint">
            @if (isAdmin()) {
              <span class="admin-badge">Admin options visible</span>
            } @else {
              Enable admin mode to see more options
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
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

    .section-description {
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-500);
      margin-block-end: var(--lib-spacing-3);
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

    .example-hint {
      margin-block-start: var(--lib-spacing-3);
      font-size: var(--lib-font-size-xs);
      color: var(--lib-color-neutral-500);
    }

    /* User option styles */
    .user-option {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-3);
      width: 100%;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: var(--lib-border-radius-full);
      object-fit: cover;
    }

    .user-avatar-sm {
      width: 24px;
      height: 24px;
      border-radius: var(--lib-border-radius-full);
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: var(--lib-font-weight-medium);
      color: var(--lib-color-neutral-900);
    }

    .user-email {
      font-size: var(--lib-font-size-xs);
      color: var(--lib-color-neutral-500);
    }

    .user-role {
      font-size: var(--lib-font-size-xs);
      padding: var(--lib-spacing-1) var(--lib-spacing-2);
      background: var(--lib-color-neutral-100);
      border-radius: var(--lib-border-radius-full);
      color: var(--lib-color-neutral-600);
    }

    .user-option-simple {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2);
    }

    /* Toggle styles */
    .toggle-container {
      margin-block-end: var(--lib-spacing-4);
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2);
      font-size: var(--lib-font-size-sm);
      cursor: pointer;
    }

    .admin-badge {
      display: inline-block;
      padding: var(--lib-spacing-1) var(--lib-spacing-2);
      background: var(--lib-color-success-light);
      color: var(--lib-color-success);
      border-radius: var(--lib-border-radius-full);
      font-weight: var(--lib-font-weight-medium);
    }
  `]
})
export class TemplateSelectExampleComponent {
  selectedUser = signal<string | null>(null);
  selectedGroupedUser = signal<string | null>(null);
  selectedPermission = signal<string | null>(null);
  isAdmin = signal(false);

  users: User[] = [
    { id: '1', name: 'Alice Chen', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Developer', department: 'Engineering' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Designer', department: 'Design' },
    { id: '3', name: 'Carol White', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?img=3', role: 'PM', department: 'Product' },
    { id: '4', name: 'David Brown', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?img=4', role: 'Developer', department: 'Engineering' },
    { id: '5', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Designer', department: 'Design' },
    { id: '6', name: 'Frank Miller', email: 'frank@example.com', avatar: 'https://i.pravatar.cc/150?img=6', role: 'PM', department: 'Product' },
  ];

  departments = ['Engineering', 'Design', 'Product'];

  getUsersByDept(dept: string): User[] {
    return this.users.filter(u => u.department === dept);
  }

  getUserName(id: string | null): string {
    if (!id) return 'None';
    return this.users.find(u => u.id === id)?.name || id;
  }
}
