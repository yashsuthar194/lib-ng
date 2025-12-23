# Modern CSS Requirements

## CSS Variable System

> [!CAUTION] > **NEVER hardcode colors, spacing, typography, borders, or shadows.** Everything MUST use CSS variables.

### Variable Categories

| Category    | Pattern                           | Example                   |
| ----------- | --------------------------------- | ------------------------- |
| Colors      | `--lib-color-[name]-[shade]`      | `--lib-color-primary-500` |
| Spacing     | `--lib-spacing-[scale]`           | `--lib-spacing-4`         |
| Typography  | `--lib-font-[property]-[variant]` | `--lib-font-size-sm`      |
| Borders     | `--lib-border-[type]-[variant]`   | `--lib-border-radius-lg`  |
| Shadows     | `--lib-shadow-[size]`             | `--lib-shadow-md`         |
| Transitions | `--lib-transition-[speed]`        | `--lib-transition-fast`   |
| Z-index     | `--lib-z-index-[context]`         | `--lib-z-index-modal`     |

---

## Modern CSS Features

Use latest stable CSS capabilities:

### 1. CSS Logical Properties

```css
/* ✅ Use logical properties for RTL support */
.component {
  padding-inline: var(--lib-spacing-4);
  padding-block: var(--lib-spacing-2);
  margin-inline-start: var(--lib-spacing-2);
  border-inline-end: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
}
```

### 2. CSS Grid and Flexbox

```css
.component-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--lib-spacing-4);
}

.flex-container {
  display: flex;
  align-items: center;
  gap: var(--lib-spacing-2);
}
```

### 3. CSS Nesting

```css
.component {
  padding: var(--lib-spacing-4);

  &__header {
    font-size: var(--lib-font-size-lg);
  }

  &:hover {
    background: var(--lib-color-neutral-50);
  }

  &:focus-visible {
    outline: 2px solid var(--lib-color-primary-500);
    outline-offset: 2px;
  }
}
```

### 4. :has() Selector

```css
.form-field:has(.error-message) {
  border-color: var(--lib-color-error);
}

.dropdown:has([open]) {
  border-bottom-radius: 0;
}
```

### 5. Container Queries

```css
.component-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## Animation Requirements

### Principles

1. **Purposeful** - Animations serve a purpose (feedback, guidance)
2. **Fast** - 150-300ms for most interactions
3. **Smooth** - Use appropriate easing functions
4. **Performant** - Animate only `transform` and `opacity`
5. **Respectful** - Honor `prefers-reduced-motion`

### State Transitions

```css
.button {
  transform: scale(1);
  transition: background var(--lib-transition-fast), transform var(--lib-transition-fast);
}

.button:hover {
  background: var(--lib-color-primary-600);
  transform: scale(1.02);
}

.button:active {
  transform: scale(0.98);
}
```

### Entry Animations

```css
@keyframes fadeScaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-enter {
  animation: fadeScaleIn var(--lib-transition-base) ease-out;
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
```

### Loading States

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-skeleton {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Reduced Motion (MANDATORY)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Tips

1. **Prefer transform and opacity** - GPU-accelerated
2. **Avoid animating** - `left`, `top`, `width`, `height`, `margin`
3. **Use will-change sparingly** - Only for complex animations
4. **Use CSS over JS** - CSS animations are more performant
