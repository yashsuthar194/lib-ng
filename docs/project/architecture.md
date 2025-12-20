# Library Architecture

## Directory Structure

```
src/
├── library/                    # Library components
│   ├── table/                  # Table component module
│   │   ├── core/               # Core table component
│   │   ├── column/             # Column components
│   │   ├── column-def/         # Column definition directives
│   │   ├── header/             # Header components
│   │   ├── data-sources/       # Data source implementations
│   │   └── types/              # TypeScript interfaces
│   ├── select/                 # Select component module
│   └── [component]/            # Future components
│
├── app/                        # Demo/documentation app
│   └── examples/               # Interactive examples
│       ├── table/              # Table examples
│       └── [component]/        # Component examples
│
└── core/                       # Shared utilities
```

## Component Design Patterns

### 1. Composition over Inheritance

Components are designed to be composed together rather than extended.

### 2. Directive-Based Features

Complex features are implemented as directives that can be optionally applied.

### 3. Data Source Pattern

Data-driven components use abstract data source classes for flexibility:

- Array data sources
- Observable data sources
- Paginated data sources

### 4. Template Outlet Pattern

Components expose template outlets for custom content rendering.

## State Management

### Signals

Primary state management uses Angular signals:

- `signal()` for local state
- `computed()` for derived state
- `effect()` for side effects

### When to Use RxJS

- External data streams
- Complex async operations
- Interop with existing RxJS code

## Change Detection Strategy

All components MUST use `OnPush`:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

This ensures:

- Minimal re-renders
- Predictable update cycles
- Better performance at scale
