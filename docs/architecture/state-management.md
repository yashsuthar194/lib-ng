# State Management

## Signal-Based Architecture

This library uses Angular signals as the primary state management solution.

## Core Principles

### 1. Signals for Local State

```typescript
@Component({...})
export class TableComponent<T> {
  // Private mutable signal
  private readonly _data = signal<T[]>([]);

  // Public read-only access
  readonly data = this._data.asReadonly();
}
```

### 2. Computed for Derived State

```typescript
// Derived state automatically updates
readonly sortedData = computed(() => {
  const data = this._data();
  const column = this.sortColumn();
  const direction = this.sortDirection();

  return this.sortService.sort(data, column, direction);
});

readonly filteredData = computed(() => {
  return this.sortedData().filter(item =>
    this.filterPredicate()(item, this.filterValue())
  );
});
```

### 3. Effects for Side Effects

```typescript
constructor() {
  // Use sparingly - only for external side effects
  effect(() => {
    const selected = this.selectedRows();
    this.analytics.trackSelection(selected.length);
  });
}
```

## When to Use RxJS

RxJS is still appropriate for:

| Use Case         | Why RxJS                       |
| ---------------- | ------------------------------ |
| HTTP requests    | Built-in retry, error handling |
| External streams | Interop with existing APIs     |
| Complex async    | Operators for complex flows    |
| Event debouncing | `debounceTime`, `throttleTime` |

## Signal + RxJS Interop

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

// Observable to Signal
readonly data = toSignal(this.dataService.getData());

// Signal to Observable
readonly data$ = toObservable(this.dataSignal);
```
