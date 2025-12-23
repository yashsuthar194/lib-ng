# Accessibility Checklist (WCAG 2.1 AA)

## Pre-Implementation Planning

- [ ] Identified required ARIA roles and attributes
- [ ] Planned keyboard navigation flow
- [ ] Designed focus management strategy
- [ ] Verified color contrast in design

## ARIA Attributes

### Required for All Interactive Elements

| Attribute          | When to Use                                 |
| ------------------ | ------------------------------------------- |
| `role`             | When semantic HTML is insufficient          |
| `aria-label`       | When visible label is absent                |
| `aria-labelledby`  | Reference visible label element             |
| `aria-describedby` | Additional descriptions                     |
| `aria-expanded`    | Expandable elements (dropdowns, accordions) |
| `aria-selected`    | Selectable items                            |
| `aria-checked`     | Checkboxes, switches                        |
| `aria-disabled`    | Disabled state (in addition to `disabled`)  |
| `aria-invalid`     | Form validation errors                      |
| `aria-live`        | Dynamic content updates                     |

### Implementation Example

```html
<button role="combobox" aria-label="Select an option" aria-expanded="false" aria-haspopup="listbox" aria-controls="dropdown-list"></button>
```

## Keyboard Navigation

### Required Keys

| Key               | Action                               |
| ----------------- | ------------------------------------ |
| `Tab`             | Move focus to next focusable element |
| `Shift+Tab`       | Move focus to previous element       |
| `Enter` / `Space` | Activate focused element             |
| `Escape`          | Close/cancel current context         |
| `Arrow keys`      | Navigate within component            |
| `Home` / `End`    | Jump to first/last item              |

### Focus Management

- [ ] Visible focus indicator (outline)
- [ ] Focus trapped in modals/dialogs
- [ ] Focus restored after modal close
- [ ] Skip links for complex components

## Screen Reader Testing

- [ ] Tested with NVDA (Windows)
- [ ] Tested with VoiceOver (macOS)
- [ ] All content announced correctly
- [ ] State changes announced

## Color and Contrast

- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text)
- [ ] Non-text contrast ratio ≥ 3:1
- [ ] Color not sole indicator of state

## Motion and Animation

- [ ] Respects `prefers-reduced-motion`
- [ ] No auto-playing animations
- [ ] Animations can be paused

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
