import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeColor = 'indigo' | 'ocean' | 'emerald' | 'rose' | 'amber' | 'violet';
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  color: ThemeColor;
  mode: ThemeMode;
}

export interface ThemeOption {
  id: ThemeColor;
  name: string;
  preview: string; // CSS color for preview swatch
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'lib-theme';

  // Available theme options
  readonly themeColors: ThemeOption[] = [
    { id: 'indigo', name: 'Indigo', preview: '#6366f1' },
    { id: 'ocean', name: 'Ocean', preview: '#06b6d4' },
    { id: 'emerald', name: 'Emerald', preview: '#10b981' },
    { id: 'rose', name: 'Rose', preview: '#f43f5e' },
    { id: 'amber', name: 'Amber', preview: '#f59e0b' },
    { id: 'violet', name: 'Violet', preview: '#8b5cf6' },
  ];

  // State signals
  private readonly _themeColor = signal<ThemeColor>('indigo');
  private readonly _themeMode = signal<ThemeMode>('light');

  // Public readonly signals
  readonly themeColor = this._themeColor.asReadonly();
  readonly themeMode = this._themeMode.asReadonly();
  readonly isDarkMode = computed(() => this._themeMode() === 'dark');

  constructor() {
    this.loadFromStorage();

    // Effect to apply theme changes to DOM
    effect(() => {
      const color = this._themeColor();
      const mode = this._themeMode();
      this.applyTheme(color, mode);
      this.saveToStorage({ color, mode });
    });
  }

  /**
   * Set the color theme
   */
  setThemeColor(color: ThemeColor): void {
    this._themeColor.set(color);
  }

  /**
   * Set the theme mode (light/dark)
   */
  setThemeMode(mode: ThemeMode): void {
    this._themeMode.set(mode);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    this._themeMode.update(mode => (mode === 'light' ? 'dark' : 'light'));
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(color: ThemeColor, mode: ThemeMode): void {
    const root = document.documentElement;

    // Set color theme attribute (indigo is default, so we remove it)
    if (color === 'indigo') {
      root.removeAttribute('data-theme-color');
    } else {
      root.setAttribute('data-theme-color', color);
    }

    // Set mode attribute
    if (mode === 'light') {
      root.removeAttribute('data-theme-mode');
    } else {
      root.setAttribute('data-theme-mode', mode);
    }
  }

  /**
   * Load theme from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const config: ThemeConfig = JSON.parse(stored);
        this._themeColor.set(config.color || 'indigo');
        this._themeMode.set(config.mode || 'light');
      } else {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this._themeMode.set('dark');
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveToStorage(config: ThemeConfig): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }
}
