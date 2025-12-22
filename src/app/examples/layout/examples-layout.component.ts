import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

interface NavSection {
  title: string;
  icon: string;
  links: NavLink[];
  comingSoon?: boolean;
}

interface NavLink {
  path: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-examples-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
  template: `
    <div class="app-layout">
      <app-header />
      
      <div class="main-layout">
        <aside class="sidebar">
          <nav class="sidebar-nav">
            @for (section of navSections; track section.title; let i = $index) {
              <div class="nav-section" [class.nav-section--expanded]="expandedSections().has(i)">
                <button 
                  class="section-header"
                  [class.section-header--disabled]="section.comingSoon"
                  (click)="toggleSection(i, section.comingSoon)"
                  [attr.aria-expanded]="expandedSections().has(i)"
                  [attr.aria-controls]="'section-' + i"
                >
                  <span class="section-icon" [innerHTML]="section.icon"></span>
                  <span class="section-title">{{ section.title }}</span>
                  @if (section.comingSoon) {
                    <span class="coming-soon-badge">Soon</span>
                  } @else {
                    <span class="link-count">{{ section.links.length }}</span>
                    <svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                    </svg>
                  }
                </button>
                
                @if (!section.comingSoon && expandedSections().has(i)) {
                  <div class="section-links" [id]="'section-' + i">
                    @for (link of section.links; track link.path) {
                      <a 
                        [routerLink]="link.path"
                        routerLinkActive="active"
                        class="nav-link"
                      >
                        <span class="nav-label">{{ link.label }}</span>
                        <span class="nav-description">{{ link.description }}</span>
                      </a>
                    }
                  </div>
                }
              </div>
            }
          </nav>
        </aside>
        
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-layout {
      display: grid;
      grid-template-columns: var(--lib-sidebar-width) 1fr;
      flex: 1;
    }

    .sidebar {
      background: var(--lib-sidebar-bg);
      border-inline-end: var(--lib-border-width-thin) solid var(--lib-color-neutral-800);
      overflow-y: auto;
      height: calc(100vh - var(--lib-header-height));
      position: sticky;
      top: var(--lib-header-height);
    }

    .sidebar-nav {
      padding: var(--lib-spacing-3);
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-1);
    }

    .nav-section {
      display: flex;
      flex-direction: column;
      border-radius: var(--lib-border-radius-md);
      overflow: hidden;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2);
      padding: var(--lib-spacing-3) var(--lib-spacing-3);
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--lib-color-neutral-400);
      font-size: var(--lib-font-size-sm);
      font-weight: var(--lib-font-weight-medium);
      font-family: inherit;
      text-align: left;
      width: 100%;
      border-radius: var(--lib-border-radius-md);
      transition: all var(--lib-transition-fast);
    }
    
    .section-header:hover:not(.section-header--disabled) {
      background: var(--lib-sidebar-hover-bg);
      color: var(--lib-color-neutral-200);
    }
    
    .section-header--disabled {
      cursor: default;
      opacity: 0.7;
    }
    
    .nav-section--expanded .section-header {
      color: var(--lib-color-neutral-200);
      background: var(--lib-color-neutral-800);
      border-radius: var(--lib-border-radius-md) var(--lib-border-radius-md) 0 0;
    }

    .section-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .section-icon :global(svg) {
      width: 100%;
      height: 100%;
    }

    .section-title {
      flex: 1;
    }
    
    .link-count {
      font-size: var(--lib-font-size-xs);
      background: var(--lib-color-neutral-700);
      color: var(--lib-color-neutral-300);
      padding: 2px 8px;
      border-radius: var(--lib-border-radius-full);
      font-weight: var(--lib-font-weight-medium);
    }
    
    .nav-section--expanded .link-count {
      background: var(--lib-color-neutral-600);
    }
    
    .chevron {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      transition: transform var(--lib-transition-fast);
    }
    
    .nav-section--expanded .chevron {
      transform: rotate(180deg);
    }

    .coming-soon-badge {
      font-size: 10px;
      font-weight: var(--lib-font-weight-medium);
      text-transform: uppercase;
      letter-spacing: 0.02em;
      padding: 2px 6px;
      background: var(--lib-color-primary-500);
      color: white;
      border-radius: var(--lib-border-radius-full);
    }

    .section-links {
      display: flex;
      flex-direction: column;
      gap: var(--lib-spacing-1);
      padding: var(--lib-spacing-2);
      background: var(--lib-color-neutral-800);
      border-radius: 0 0 var(--lib-border-radius-md) var(--lib-border-radius-md);
      animation: slideDown 0.2s ease-out;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      padding: var(--lib-spacing-2) var(--lib-spacing-3);
      border-radius: var(--lib-border-radius-md);
      text-decoration: none;
      color: var(--lib-sidebar-text);
      transition: all var(--lib-transition-fast);
      border-inline-start: 2px solid transparent;
    }

    .nav-link:hover {
      background: var(--lib-sidebar-hover-bg);
      color: var(--lib-sidebar-text-hover);
    }

    .nav-link.active {
      background: linear-gradient(to right, 
        color-mix(in srgb, var(--lib-color-primary-500) 20%, transparent),
        transparent
      );
      border-inline-start-color: var(--lib-color-primary-500);
      color: var(--lib-sidebar-text-hover);
    }

    .nav-link.active .nav-label {
      color: var(--lib-color-primary-400);
    }

    .nav-label {
      font-weight: var(--lib-font-weight-medium);
      font-size: var(--lib-font-size-sm);
      line-height: 1.3;
    }

    .nav-description {
      font-size: var(--lib-font-size-xs);
      color: var(--lib-color-neutral-500);
      margin-block-start: 2px;
      line-height: 1.3;
    }

    .content {
      background: var(--lib-content-bg);
      padding: var(--lib-spacing-8);
      overflow-y: auto;
      min-height: calc(100vh - var(--lib-header-height));
    }
  `]
})
export class ExamplesLayoutComponent {
  /** Track which sections are expanded */
  expandedSections = signal<Set<number>>(new Set([0])); // First section expanded by default

  /** Toggle section expansion */
  toggleSection(index: number, comingSoon?: boolean): void {
    if (comingSoon) return;
    
    this.expandedSections.update(current => {
      const newSet = new Set(current);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }

  navSections: NavSection[] = [
    {
      title: 'Table',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"/></svg>`,
      links: [
        { path: 'table/basic', label: 'Basic Table', description: 'Simple array data binding' },
        { path: 'table/observable', label: 'Observable Data', description: 'Async data with loading state' },
        { path: 'table/columns', label: 'Column Definitions', description: 'Declarative column templates' },
        { path: 'table/sorting', label: 'Sorting', description: 'Sortable columns' },
        { path: 'table/pagination', label: 'Pagination', description: 'Page navigation' },
        { path: 'table/editable', label: 'Editable Table', description: 'FormArray with inline editing' },
      ]
    },
    {
      title: 'Select',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>`,
      links: [
        { path: 'select/basic', label: 'Basic Select', description: 'Single select with static options' },
        { path: 'select/searchable', label: 'Searchable', description: 'Type-ahead search filtering' },
        { path: 'select/multi', label: 'Multi-Select', description: 'Multiple selections with chips' },
        { path: 'select/template', label: 'Custom Templates', description: 'Avatars, groups, conditional' },
        { path: 'select/forms', label: 'Forms Integration', description: 'Reactive Forms validation' },
      ]
    },
    {
      title: 'Tabs',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 4a2 2 0 012-2h5l2 2h5a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 3a1 1 0 000 2h12a1 1 0 100-2H4z"/></svg>`,
      links: [
        { path: 'tabs/basic', label: 'Basic Tabs', description: 'Icons, badges, disabled states' },
        { path: 'tabs/programmatic', label: 'Programmatic', description: 'API control and events' },
        { path: 'tabs/animated', label: 'Animated', description: 'Slide and fade transitions' },
        { path: 'tabs/lazy', label: 'Lazy Loading', description: 'On-demand content loading' },
      ]
    },
    {
      title: 'Button',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z"/></svg>`,
      links: [],
      comingSoon: true
    },
    {
      title: 'Input',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"/></svg>`,
      links: [
        { path: 'input/basic', label: 'Basic Input', description: 'Sizes, variants, types, states' },
        { path: 'input/search', label: 'Search Input', description: 'Standalone with debounce' },
        { path: 'input/form-field', label: 'Form Field', description: 'Labels, validation, icons' },
      ]
    },
    {
      title: 'Checkbox',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>`,
      links: [],
      comingSoon: true
    },
    {
      title: 'Modal',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"/></svg>`,
      links: [
        { path: 'modal/basic', label: 'Basic Modal', description: 'Dialogs with data passing' },
        { path: 'modal/animated', label: 'Animated', description: 'Origin and other animations' },
      ]
    },
  ];
}

