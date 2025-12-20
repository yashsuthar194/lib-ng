# CSS Theming System

## Overview

This library uses a comprehensive CSS custom properties (CSS variables) system for complete theming control. **No hardcoded values are permitted anywhere in the codebase.**

## Documentation

| Document                                      | Description                |
| --------------------------------------------- | -------------------------- |
| [Design Tokens](./design-tokens.md)           | Complete token definitions |
| [Naming Conventions](./naming-conventions.md) | Variable naming patterns   |
| [Theme Switching](./theme-switching.md)       | Theme implementation       |
| [Utility Classes](./utility-classes.md)       | Reusable utility patterns  |

## Quick Start

### Using Variables in Components

```css
/* Component styling */
.lib-button {
  color: var(--lib-color-primary-500);
  padding: var(--lib-spacing-3) var(--lib-spacing-4);
  border-radius: var(--lib-radius-md);
  font-size: var(--lib-font-size-sm);
}
```

### Theme Override

```css
/* Custom theme */
:root {
  --lib-color-primary-500: #6366f1; /* Indigo instead of blue */
}

/* Dark theme */
[data-theme="dark"] {
  --lib-color-surface: #1e1e1e;
  --lib-color-text: #ffffff;
}
```

## Mandatory Rule

> [!CAUTION]
> Every styling value MUST use CSS variables. Hardcoded values are never acceptable.
