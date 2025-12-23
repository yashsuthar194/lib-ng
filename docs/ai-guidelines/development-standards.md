# Development Standards

## Core Development Principles

### 1. Flexibility Requirements

Every component MUST support:

- **Multiple API patterns**: Template-driven AND reactive approaches
- **Configurable behavior**: All visual/behavioral aspects configurable
- **Composability**: Components work together seamlessly
- **Extensibility**: Consumers can extend functionality

```typescript
// ✅ Good: Multiple ways to use the component
// Template-driven
<lib-select [(value)]="selectedValue">

// Reactive Forms
<lib-select [formControl]="myControl">

// Event-based
<lib-select (valueChange)="handleChange($event)">
```

### 2. Performance Requirements

**MANDATORY** for every component:

| Requirement  | Implementation                                    |
| ------------ | ------------------------------------------------- |
| OnPush       | `changeDetection: ChangeDetectionStrategy.OnPush` |
| trackBy      | Implement for ALL `*ngFor` loops                  |
| Signals      | Use for reactive state management                 |
| Lazy Loading | Lazy load heavy dependencies                      |

### 3. Forms Integration Requirements

For form-compatible components, implement `ControlValueAccessor`:

- ✅ Support `FormControl` binding
- ✅ Support `FormGroup` integration
- ✅ Support `FormArray` usage
- ✅ Proper validation error handling
- ✅ Disabled state support
- ✅ Touched/Dirty state propagation

### 4. Accessibility Requirements (WCAG 2.1 AA)

Every component MUST have:

- Proper ARIA attributes
- Complete keyboard navigation
- Focus management and visible indicators
- Screen reader compatibility
- Color contrast compliance

### 5. Theming Requirements

**CRITICAL**: No hardcoded styling values anywhere.

```css
/* ❌ NEVER */
.button {
  color: #2196f3;
  padding: 16px;
}

/* ✅ ALWAYS */
.button {
  color: var(--lib-color-primary-500);
  padding: var(--lib-spacing-4);
}
```
