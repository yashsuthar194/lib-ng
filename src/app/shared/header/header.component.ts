import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeColor } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-brand">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--lib-color-primary-500)"/>
            <path d="M16 6L26 26H6L16 6Z" fill="white" opacity="0.9"/>
            <circle cx="16" cy="18" r="4" fill="white"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">Angular UI</span>
          <span class="brand-tag">Component Library</span>
        </div>
      </div>

      <div class="header-actions">
        <!-- Theme Color Selector -->
        <div class="theme-selector" (click)="toggleDropdown($event)">
          <button class="theme-btn">
            <span 
              class="color-swatch" 
              [style.background]="currentThemePreview()"
            ></span>
            <span class="theme-label">{{ currentThemeName() }}</span>
            <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 6l4 4 4-4"/>
            </svg>
          </button>
          
          @if (dropdownOpen()) {
            <div class="theme-dropdown">
              @for (theme of themeService.themeColors; track theme.id) {
                <button 
                  class="theme-option"
                  [class.active]="themeService.themeColor() === theme.id"
                  (click)="selectTheme(theme.id, $event)"
                >
                  <span class="color-swatch" [style.background]="theme.preview"></span>
                  <span>{{ theme.name }}</span>
                  @if (themeService.themeColor() === theme.id) {
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                    </svg>
                  }
                </button>
              }
            </div>
          }
        </div>

        <!-- Dark Mode Toggle -->
        <button 
          class="mode-toggle" 
          (click)="themeService.toggleMode()"
          [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          @if (themeService.isDarkMode()) {
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
          } @else {
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--lib-header-height);
      padding-inline: var(--lib-spacing-6);
      background: var(--lib-header-bg);
      border-block-end: var(--lib-border-width-thin) solid var(--lib-header-border);
      position: sticky;
      top: 0;
      z-index: var(--lib-z-index-sticky);
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-3);
    }

    .logo svg {
      display: block;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-size: var(--lib-font-size-lg);
      font-weight: var(--lib-font-weight-bold);
      color: var(--lib-color-neutral-900);
      line-height: 1.2;
    }

    .brand-tag {
      font-size: var(--lib-font-size-xs);
      color: var(--lib-color-neutral-500);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-3);
    }

    .theme-selector {
      position: relative;
    }

    .theme-btn {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2);
      padding: var(--lib-spacing-2) var(--lib-spacing-3);
      background: var(--lib-color-neutral-100);
      border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
      border-radius: var(--lib-border-radius-md);
      cursor: pointer;
      font-size: var(--lib-font-size-sm);
      font-weight: var(--lib-font-weight-medium);
      color: var(--lib-color-neutral-700);
      transition: all var(--lib-transition-fast);
    }

    .theme-btn:hover {
      background: var(--lib-color-neutral-200);
    }

    .color-swatch {
      width: 16px;
      height: 16px;
      border-radius: var(--lib-border-radius-full);
      flex-shrink: 0;
    }

    .dropdown-icon {
      opacity: 0.5;
    }

    .theme-dropdown {
      position: absolute;
      top: calc(100% + var(--lib-spacing-1));
      right: 0;
      min-width: 180px;
      background: var(--lib-color-neutral-0);
      border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
      border-radius: var(--lib-border-radius-lg);
      box-shadow: var(--lib-shadow-lg);
      padding: var(--lib-spacing-1);
      z-index: var(--lib-z-index-dropdown);
      animation: slideDown 150ms ease-out;
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

    .theme-option {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-2);
      width: 100%;
      padding: var(--lib-spacing-2) var(--lib-spacing-3);
      background: transparent;
      border: none;
      border-radius: var(--lib-border-radius-base);
      cursor: pointer;
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-700);
      transition: background var(--lib-transition-fast);
      text-align: left;
    }

    .theme-option:hover {
      background: var(--lib-color-neutral-100);
    }

    .theme-option.active {
      background: var(--lib-color-primary-50);
      color: var(--lib-color-primary-700);
    }

    .check-icon {
      margin-inline-start: auto;
      color: var(--lib-color-primary-500);
    }

    .mode-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--lib-color-neutral-100);
      border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
      border-radius: var(--lib-border-radius-md);
      cursor: pointer;
      color: var(--lib-color-neutral-600);
      transition: all var(--lib-transition-fast);
    }

    .mode-toggle:hover {
      background: var(--lib-color-neutral-200);
      color: var(--lib-color-neutral-900);
    }
  `]
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly dropdownOpen = signal(false);

  currentThemeName() {
    const theme = this.themeService.themeColors.find(
      t => t.id === this.themeService.themeColor()
    );
    return theme?.name || 'Indigo';
  }

  currentThemePreview() {
    const theme = this.themeService.themeColors.find(
      t => t.id === this.themeService.themeColor()
    );
    return theme?.preview || '#6366f1';
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen.update(v => !v);
    
    if (this.dropdownOpen()) {
      // Close dropdown when clicking outside
      const closeDropdown = () => {
        this.dropdownOpen.set(false);
        document.removeEventListener('click', closeDropdown);
      };
      setTimeout(() => document.addEventListener('click', closeDropdown), 0);
    }
  }

  selectTheme(color: ThemeColor, event: Event): void {
    event.stopPropagation();
    this.themeService.setThemeColor(color);
    this.dropdownOpen.set(false);
  }
}
