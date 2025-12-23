# Select Component Architecture

## Overview

A flexible, high-performance select component using **directive-based options** for maximum flexibility. Supports single/multi-select, search, custom templates (avatars/icons), and complete Reactive Forms integration.

---

## File Structure

```
library/select/
├── core/
│   ├── select.component.ts       # Main component with CVA
│   ├── select.component.html     # Template
│   └── select.component.css      # Styling
├── option/
│   └── option.component.ts       # Individual option
├── option-group/
│   └── option-group.component.ts # Group container
├── types/
│   └── select.types.ts           # TypeScript interfaces
└── index.ts                      # Public API
```

---

## Core Component: SelectComponent

**File:** [select.component.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/select/core/select.component.ts)

### Component Configuration

```typescript
@Component({
  selector: 'lib-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  }],
})
```

### Signal-Based State

| Signal         | Type                       | Purpose                   |
| -------------- | -------------------------- | ------------------------- |
| `isOpen`       | `signal<boolean>`          | Dropdown open state       |
| `searchQuery`  | `signal<string>`           | Current search filter     |
| `focusedIndex` | `signal<number>`           | Keyboard navigation index |
| `_value`       | `signal<T \| T[] \| null>` | Selected value(s)         |

### Computed Derived State

```typescript
readonly filteredOptions = computed(() => {
  const query = this.searchQuery();
  if (!query) return this.options();
  return this.options().filter(opt => opt.matchesSearch(query));
});

readonly displayLabel = computed(() => {
  // Derives display text from selected value
});
```

**Why Computed:**

- Automatically updates when dependencies change
- Cached until dependencies change
- No manual subscription management

### Content Queries

```typescript
readonly options = contentChildren(OptionComponent, { descendants: true });
readonly optionGroups = contentChildren(OptionGroupComponent);
```

**Why `descendants: true`:**

- Finds options nested inside `lib-option-group`
- Supports complex DOM structures

---

## Option Component

**File:** [option.component.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/select/option/option.component.ts)

### Key Features

| Feature             | Implementation        |
| ------------------- | --------------------- |
| Value binding       | `input.required<T>()` |
| Custom search terms | `input<string[]>([])` |
| Selection state     | `signal<boolean>`     |
| Focus state         | `signal<boolean>`     |

### Host Bindings

```typescript
host: {
  'role': 'option',
  '[attr.aria-selected]': 'selected()',
  '[class.lib-option--selected]': 'selected()',
  '(click)': 'onSelect()',
}
```

**Why Host Bindings:**

- State-driven attributes for a11y
- CSS classes applied directly to element
- Event handlers without template wrappers

---

## Keyboard Navigation

| Key               | Action                     |
| ----------------- | -------------------------- |
| `↓` Arrow Down    | Open dropdown / Focus next |
| `↑` Arrow Up      | Focus previous             |
| `Enter` / `Space` | Select focused option      |
| `Escape`          | Close dropdown             |
| `Home`            | Focus first option         |
| `End`             | Focus last option          |

---

## ControlValueAccessor

```typescript
writeValue(value: T | T[] | null): void {
  this._value.set(value);
  this.updateOptionStates();
}

registerOnChange(fn): void { this.onChange = fn; }
registerOnTouched(fn): void { this.onTouched = fn; }
```

**Why This Pattern:**

- Full Angular Forms compatibility
- Works with FormControl, FormGroup, FormArray
- Validation states automatically sync

---

## Performance Optimizations

1. **OnPush Change Detection** - No unnecessary checks
2. **Signal-Based State** - Fine-grained reactivity
3. **Computed Derivations** - Cached values
4. **Content Queries with Signals** - Reactive option lists
5. **TrackBy for Chips** - Minimal DOM updates

---

## Accessibility (WCAG 2.1 AA)

| Feature       | Implementation                   |
| ------------- | -------------------------------- |
| Role          | `combobox` + `listbox`           |
| Keyboard      | Full navigation support          |
| ARIA          | `aria-expanded`, `aria-selected` |
| Focus         | Visual indicator, trap in panel  |
| Screen Reader | Selection announcements          |

---

## Usage Examples

### Basic

```html
<lib-select [(value)]="country">
  <lib-option value="us">United States</lib-option>
  <lib-option value="uk">United Kingdom</lib-option>
</lib-select>
```

### With Conditional Options

```html
<lib-select [(value)]="role">
  <lib-option value="user">User</lib-option>
  @if (isAdmin) {
  <lib-option value="admin">Admin</lib-option>
  }
</lib-select>
```

### Multi-Select with Search

```html
<lib-select [(value)]="tags" [multiple]="true" [searchable]="true">
  @for (tag of tags; track tag.id) {
  <lib-option [value]="tag.id">{{ tag.name }}</lib-option>
  }
</lib-select>
```

### Custom Avatar Template

```html
<lib-select [(value)]="userId">
  @for (user of users; track user.id) {
  <lib-option [value]="user.id">
    <img [src]="user.avatar" class="avatar" />
    <span>{{ user.name }}</span>
  </lib-option>
  }
</lib-select>
```
