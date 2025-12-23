# Theming Requirements

> [!CAUTION] > **NO HARDCODED VALUES** - This is non-negotiable. Every styling value MUST use CSS variables.

## What Must Use CSS Variables

| Category    | Examples                               |
| ----------- | -------------------------------------- |
| Colors      | Text, background, border, shadow       |
| Spacing     | Padding, margin, gap                   |
| Typography  | Font family, size, weight, line-height |
| Borders     | Width, radius                          |
| Shadows     | Box shadows                            |
| Transitions | Duration, timing function              |
| Z-index     | Layering values                        |

## Correct vs Incorrect Examples

```css
/* ❌ NEVER DO THIS - Hardcoded values */
.button {
  color: #2196f3;
  background: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* ✅ ALWAYS DO THIS - CSS Variables */
.button {
  color: var(--lib-color-primary-500);
  background: var(--lib-color-surface);
  padding: var(--lib-spacing-3) var(--lib-spacing-6);
  border-radius: var(--lib-radius-md);
  font-size: var(--lib-font-size-sm);
  box-shadow: var(--lib-shadow-sm);
  transition: all var(--lib-transition-normal);
}
```

## Theme Support Requirements

### Built-in Themes

Every component MUST work with:

- Light theme (default)
- Dark theme

### Custom Theme Support

Consumers MUST be able to:

- Override any CSS variable
- Create complete custom themes
- Apply themes at any DOM level (global or scoped)

## Variable Naming Convention

Follow the pattern: `--lib-[category]-[name]-[variant]`

```css
/* Colors */
--lib-color-primary-500
--lib-color-neutral-100
--lib-color-error-500

/* Spacing */
--lib-spacing-1   /* 4px */
--lib-spacing-2   /* 8px */

/* Typography */
--lib-font-size-sm
--lib-font-weight-medium
```

See [Design Tokens](../theming/design-tokens.md) for complete list.
