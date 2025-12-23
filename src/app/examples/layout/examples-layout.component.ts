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
      links: [
        { path: 'button', label: 'Button Examples', description: 'Variants, sizes, loading, icons' },
      ]
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
      links: [
        { path: 'checkbox', label: 'Checkbox Examples', description: 'Checkbox, switch, groups' },
      ]
    },
    {
      title: 'Modal',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"/></svg>`,
      links: [
        { path: 'modal/basic', label: 'Basic Modal', description: 'Dialogs with data passing' },
        { path: 'modal/animated', label: 'Animated', description: 'Origin and other animations' },
      ]
    },
    // ============================================
    // Tier 1: Essential Feedback & Overlays
    // ============================================
    {
      title: 'Toast',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"/></svg>`,
      links: [
        { path: 'toast', label: 'Toast Examples', description: 'Notifications, positions, stacking' },
      ]
    },
    {
      title: 'Tooltip',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>`,
      links: [
        { path: 'tooltip', label: 'Tooltip Examples', description: 'Positions, variants, accessibility' },
      ]
    },
    {
      title: 'Alert',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/></svg>`,
      links: [
        { path: 'alert', label: 'Alert Examples', description: 'Variants, appearances, dismissible' },
      ]
    },
    {
      title: 'Progress',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>`,
      links: [
        { path: 'progress', label: 'Progress Examples', description: 'Bar, circular, spinner indicators' },
      ]
    },
    // ============================================
    // Tier 2: Data Display Components
    // ============================================
    {
      title: 'Card',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>`,
      links: [
        { path: 'card/basic', label: 'Basic Card', description: 'Container with sections' },
      ],
      comingSoon: true
    },
    {
      title: 'Badge',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>`,
      links: [
        { path: 'badge/basic', label: 'Basic Badge', description: 'Status and count indicators' },
      ],
      comingSoon: true
    },
    {
      title: 'Avatar',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>`,
      links: [
        { path: 'avatar/basic', label: 'Basic Avatar', description: 'User profile images' },
      ],
      comingSoon: true
    },
    {
      title: 'Skeleton',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/></svg>`,
      links: [
        { path: 'skeleton/basic', label: 'Basic Skeleton', description: 'Loading placeholders' },
      ],
      comingSoon: true
    },
    {
      title: 'Accordion',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/></svg>`,
      links: [
        { path: 'accordion/basic', label: 'Basic Accordion', description: 'Collapsible content panels' },
      ],
      comingSoon: true
    },
    // ============================================
    // Tier 3: Navigation Components
    // ============================================
    {
      title: 'Breadcrumb',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>`,
      links: [
        { path: 'breadcrumb/basic', label: 'Basic Breadcrumb', description: 'Navigation path' },
      ],
      comingSoon: true
    },
    {
      title: 'Stepper',
      icon: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"/></svg>`,
      links: [
        { path: 'stepper/basic', label: 'Basic Stepper', description: 'Multi-step wizard' },
      ],
      comingSoon: true
    },
  ];
}

