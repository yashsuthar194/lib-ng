# Utility Classes

## Purpose

Utility classes provide reusable styling patterns using CSS variables. All utility classes MUST use variables - never hardcoded values.

## Spacing Utilities

```css
/* Padding */
.lib-p-0 {
  padding: var(--lib-spacing-0);
}
.lib-p-1 {
  padding: var(--lib-spacing-1);
}
.lib-p-2 {
  padding: var(--lib-spacing-2);
}
.lib-p-4 {
  padding: var(--lib-spacing-4);
}

.lib-px-4 {
  padding-left: var(--lib-spacing-4);
  padding-right: var(--lib-spacing-4);
}
.lib-py-2 {
  padding-top: var(--lib-spacing-2);
  padding-bottom: var(--lib-spacing-2);
}

/* Margin */
.lib-m-0 {
  margin: var(--lib-spacing-0);
}
.lib-m-4 {
  margin: var(--lib-spacing-4);
}
.lib-mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Gap */
.lib-gap-2 {
  gap: var(--lib-spacing-2);
}
.lib-gap-4 {
  gap: var(--lib-spacing-4);
}
```

## Typography Utilities

```css
.lib-text-xs {
  font-size: var(--lib-font-size-xs);
}
.lib-text-sm {
  font-size: var(--lib-font-size-sm);
}
.lib-text-base {
  font-size: var(--lib-font-size-base);
}
.lib-text-lg {
  font-size: var(--lib-font-size-lg);
}

.lib-font-medium {
  font-weight: var(--lib-font-weight-medium);
}
.lib-font-semibold {
  font-weight: var(--lib-font-weight-semibold);
}
.lib-font-bold {
  font-weight: var(--lib-font-weight-bold);
}
```

## Color Utilities

```css
.lib-text-primary {
  color: var(--lib-color-primary-500);
}
.lib-text-muted {
  color: var(--lib-color-text-muted);
}
.lib-text-error {
  color: var(--lib-color-error-500);
}

.lib-bg-surface {
  background-color: var(--lib-color-surface);
}
.lib-bg-primary {
  background-color: var(--lib-color-primary-500);
}
```

## Border Utilities

```css
.lib-border {
  border: 1px solid var(--lib-color-border);
}
.lib-border-0 {
  border: none;
}
.lib-rounded-md {
  border-radius: var(--lib-radius-md);
}
.lib-rounded-lg {
  border-radius: var(--lib-radius-lg);
}
.lib-rounded-full {
  border-radius: var(--lib-radius-full);
}
```

## Shadow Utilities

```css
.lib-shadow-sm {
  box-shadow: var(--lib-shadow-sm);
}
.lib-shadow-md {
  box-shadow: var(--lib-shadow-md);
}
.lib-shadow-lg {
  box-shadow: var(--lib-shadow-lg);
}
```

## Transition Utilities

```css
.lib-transition-fast {
  transition: all var(--lib-transition-fast);
}
.lib-transition-normal {
  transition: all var(--lib-transition-normal);
}
```

## Guidelines

1. **Prefix all utilities with `lib-`** to avoid conflicts
2. **Always use CSS variables** - no hardcoded values
3. **Keep utilities focused** - one responsibility per class
4. **Document additions** - update this file when adding new utilities
