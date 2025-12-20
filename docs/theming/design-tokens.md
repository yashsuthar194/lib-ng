# Design Tokens

Complete CSS variable definitions for the component library.

---

## Color Tokens

### Primary Palette

```css
--lib-color-primary-50: #eff6ff;
--lib-color-primary-100: #dbeafe;
--lib-color-primary-200: #bfdbfe;
--lib-color-primary-300: #93c5fd;
--lib-color-primary-400: #60a5fa;
--lib-color-primary-500: #3b82f6; /* Base */
--lib-color-primary-600: #2563eb;
--lib-color-primary-700: #1d4ed8;
--lib-color-primary-800: #1e40af;
--lib-color-primary-900: #1e3a8a;
```

### Neutral Palette

```css
--lib-color-neutral-0: #ffffff;
--lib-color-neutral-50: #fafafa;
--lib-color-neutral-100: #f4f4f5;
--lib-color-neutral-200: #e4e4e7;
--lib-color-neutral-300: #d4d4d8;
--lib-color-neutral-400: #a1a1aa;
--lib-color-neutral-500: #71717a;
--lib-color-neutral-600: #52525b;
--lib-color-neutral-700: #3f3f46;
--lib-color-neutral-800: #27272a;
--lib-color-neutral-900: #18181b;
--lib-color-neutral-1000: #09090b;
```

### Semantic Colors

```css
--lib-color-success: #22c55e;
--lib-color-success-light: #dcfce7;
--lib-color-warning: #f59e0b;
--lib-color-warning-light: #fef3c7;
--lib-color-error: #ef4444;
--lib-color-error-light: #fee2e2;
--lib-color-info: #0ea5e9;
--lib-color-info-light: #e0f2fe;
```

---

## Spacing Scale

```css
--lib-spacing-0: 0;
--lib-spacing-1: 0.25rem; /* 4px */
--lib-spacing-2: 0.5rem; /* 8px */
--lib-spacing-3: 0.75rem; /* 12px */
--lib-spacing-4: 1rem; /* 16px */
--lib-spacing-5: 1.25rem; /* 20px */
--lib-spacing-6: 1.5rem; /* 24px */
--lib-spacing-8: 2rem; /* 32px */
--lib-spacing-10: 2.5rem; /* 40px */
--lib-spacing-12: 3rem; /* 48px */
--lib-spacing-16: 4rem; /* 64px */
```

---

## Typography

### Font Family

```css
--lib-font-family-base: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--lib-font-family-mono: ui-monospace, "Cascadia Code", "Fira Code", monospace;
```

### Font Sizes

```css
--lib-font-size-xs: 0.75rem; /* 12px */
--lib-font-size-sm: 0.875rem; /* 14px */
--lib-font-size-base: 1rem; /* 16px */
--lib-font-size-lg: 1.125rem; /* 18px */
--lib-font-size-xl: 1.25rem; /* 20px */
--lib-font-size-2xl: 1.5rem; /* 24px */
--lib-font-size-3xl: 1.875rem; /* 30px */
```

### Font Weights

```css
--lib-font-weight-light: 300;
--lib-font-weight-normal: 400;
--lib-font-weight-medium: 500;
--lib-font-weight-semibold: 600;
--lib-font-weight-bold: 700;
```

### Line Heights

```css
--lib-line-height-tight: 1.25;
--lib-line-height-normal: 1.5;
--lib-line-height-relaxed: 1.75;
```

---

## Borders

### Border Widths

```css
--lib-border-width-thin: 1px;
--lib-border-width-medium: 2px;
--lib-border-width-thick: 4px;
```

### Border Radius

```css
--lib-border-radius-none: 0;
--lib-border-radius-sm: 0.125rem; /* 2px */
--lib-border-radius-base: 0.25rem; /* 4px */
--lib-border-radius-md: 0.375rem; /* 6px */
--lib-border-radius-lg: 0.5rem; /* 8px */
--lib-border-radius-xl: 0.75rem; /* 12px */
--lib-border-radius-2xl: 1rem; /* 16px */
--lib-border-radius-full: 9999px;
```

---

## Shadows

```css
--lib-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--lib-shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--lib-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--lib-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--lib-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

---

## Transitions

```css
--lib-transition-fast: 150ms ease;
--lib-transition-base: 200ms ease;
--lib-transition-slow: 300ms ease;
```

---

## Z-Index

```css
--lib-z-index-dropdown: 1000;
--lib-z-index-sticky: 1020;
--lib-z-index-fixed: 1030;
--lib-z-index-modal-backdrop: 1040;
--lib-z-index-modal: 1050;
--lib-z-index-popover: 1060;
--lib-z-index-tooltip: 1070;
```

---

## Usage Example

```css
.my-component {
  /* Colors */
  background: var(--lib-color-neutral-0);
  color: var(--lib-color-neutral-900);
  border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);

  /* Spacing */
  padding: var(--lib-spacing-4);
  margin-block-end: var(--lib-spacing-4);

  /* Typography */
  font-family: var(--lib-font-family-base);
  font-size: var(--lib-font-size-base);

  /* Borders */
  border-radius: var(--lib-border-radius-lg);

  /* Shadows */
  box-shadow: var(--lib-shadow-sm);

  /* Transitions */
  transition: box-shadow var(--lib-transition-fast);
}

.my-component:hover {
  box-shadow: var(--lib-shadow-md);
}
```
