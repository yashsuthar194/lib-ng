# Theme Switching

## Implementation Strategy

Themes are implemented using CSS custom property overrides at the document level.

## Default Theme (Light)

Define all tokens at `:root`:

```css
:root {
  /* Color tokens */
  --lib-color-surface: #ffffff;
  --lib-color-background: #fafafa;
  --lib-color-text: #18181b;
  --lib-color-text-muted: #71717a;
  --lib-color-border: #e4e4e7;

  /* ... other tokens */
}
```

## Dark Theme

Override tokens with `[data-theme="dark"]`:

```css
[data-theme="dark"] {
  --lib-color-surface: #1e1e1e;
  --lib-color-background: #121212;
  --lib-color-text: #fafafa;
  --lib-color-text-muted: #a1a1aa;
  --lib-color-border: #3f3f46;

  /* Primary colors for dark mode */
  --lib-color-primary-500: #60a5fa;
}
```

## Theme Switching in Angular

```typescript
@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly _theme = signal<"light" | "dark">("light");
  readonly theme = this._theme.asReadonly();

  toggleTheme(): void {
    const newTheme = this._theme() === "light" ? "dark" : "light";
    this._theme.set(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  setTheme(theme: "light" | "dark"): void {
    this._theme.set(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
}
```

## System Preference Detection

```typescript
detectSystemPreference(): void {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  this.setTheme(prefersDark.matches ? 'dark' : 'light');

  prefersDark.addEventListener('change', (e) => {
    this.setTheme(e.matches ? 'dark' : 'light');
  });
}
```

## Custom Themes

Consumers can create custom themes:

```css
[data-theme="brand"] {
  --lib-color-primary-500: #6366f1; /* Custom purple */
  --lib-color-surface: #0f0f23;
  /* Override any tokens */
}
```
