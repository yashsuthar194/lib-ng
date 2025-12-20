# CSS Variable Naming Conventions

## Pattern

All CSS variables follow this pattern:

```
--lib-[category]-[name]-[variant]
```

| Part       | Description       | Example            |
| ---------- | ----------------- | ------------------ |
| `--lib-`   | Library prefix    | `--lib-`           |
| `category` | Token category    | `color`, `spacing` |
| `name`     | Specific token    | `primary`, `text`  |
| `variant`  | Optional modifier | `500`, `sm`        |

## Categories

### Colors: `--lib-color-*`

```css
--lib-color-[palette]-[shade]
--lib-color-primary-500
--lib-color-neutral-100
--lib-color-error-500
```

### Semantic Colors

```css
--lib-color-surface      /* Background surfaces */
--lib-color-text         /* Primary text */
--lib-color-text-muted   /* Secondary text */
--lib-color-border       /* Border color */
```

### Spacing: `--lib-spacing-*`

```css
--lib-spacing-[scale]
--lib-spacing-1   /* 4px */
--lib-spacing-4   /* 16px */
```

### Typography: `--lib-font-*`

```css
--lib-font-[property]-[variant]
--lib-font-size-sm
--lib-font-weight-bold
--lib-line-height-normal
```

### Border Radius: `--lib-radius-*`

```css
--lib-radius-[size]
--lib-radius-md
--lib-radius-full
```

### Shadows: `--lib-shadow-*`

```css
--lib-shadow-[size]
--lib-shadow-sm
--lib-shadow-lg
```

### Transitions: `--lib-transition-*`

```css
--lib-transition-[speed]
--lib-transition-fast
--lib-transition-normal
```

### Z-Index: `--lib-z-*`

```css
--lib-z-[context]
--lib-z-modal
--lib-z-tooltip
```

## Usage Rules

1. **Always use the `--lib-` prefix** for library variables
2. **Use semantic names** over literal values
3. **Prefer existing tokens** over creating new ones
4. **Document new tokens** if absolutely necessary
