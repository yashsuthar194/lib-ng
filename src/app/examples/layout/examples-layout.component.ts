import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface ExampleLink {
  path: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-examples-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="examples-layout">
      <aside class="examples-sidebar">
        <h2 class="sidebar-title">Table Examples</h2>
        <nav class="sidebar-nav">
          @for (link of tableExamples; track link.path) {
            <a 
              [routerLink]="link.path"
              routerLinkActive="active"
              class="nav-link"
            >
              <span class="nav-label">{{ link.label }}</span>
              <span class="nav-description">{{ link.description }}</span>
            </a>
          }
        </nav>
      </aside>
      <main class="examples-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .examples-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: 100vh;
    }
    
    .examples-sidebar {
      background: #1a1a2e;
      color: #fff;
      padding: 1.5rem;
      border-right: 1px solid #2a2a4a;
    }
    
    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #fff;
    }
    
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .nav-link {
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: #a0a0c0;
      transition: all 0.2s;
    }
    
    .nav-link:hover {
      background: #2a2a4a;
      color: #fff;
    }
    
    .nav-link.active {
      background: #3a3a6a;
      color: #fff;
    }
    
    .nav-label {
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .nav-description {
      font-size: 0.75rem;
      opacity: 0.7;
      margin-top: 0.25rem;
    }
    
    .examples-content {
      padding: 2rem;
      background: #f5f5f5;
      overflow-y: auto;
    }
  `]
})
export class ExamplesLayoutComponent {
  tableExamples: ExampleLink[] = [
    { path: 'table/basic', label: 'Basic Table', description: 'Simple array data binding' },
    { path: 'table/observable', label: 'Observable Data', description: 'Async data with loading state' },
    { path: 'table/columns', label: 'Column Definitions', description: 'Declarative column templates' },
    { path: 'table/sorting', label: 'Sorting', description: 'Sortable columns' },
    { path: 'table/pagination', label: 'Pagination', description: 'Page navigation' },
    { path: 'table/editable', label: 'Editable Table', description: 'FormArray with inline editing' },
  ];
}
