# Table Component Architecture

## Overview

The Table component is a data-driven, flexible table implementation that supports multiple data source types including arrays, signals, observables, and FormArrays for inline editing. It uses Angular 17+ features including signal-based inputs, content queries, and the new control flow syntax.

---

## File Structure

```
library/table/
├── core/
│   ├── table.component.ts      # Main table component
│   ├── table.component.html    # Template with control flow
│   ├── table.component.css     # Styling
│   └── index.ts                # Core exports
├── column-def/
│   ├── column-def.directive.ts # Column definition directive
│   └── index.ts
├── data-sources/
│   ├── array-data-source.ts    # Plain array wrapper
│   ├── signal-data-source.ts   # Signal wrapper
│   ├── observable-data-source.ts  # Observable with loading state
│   ├── form-array-data-source.ts  # FormArray for inline editing
│   ├── create-data-source.ts   # Factory function
│   └── index.ts
├── types/
│   └── table.types.ts          # TypeScript interfaces
└── index.ts                    # Public API
```

---

## Core Component: TableComponent

**File:** [table.component.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/core/table.component.ts)

### Component Configuration

```typescript
@Component({
  selector: "lib-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends object> {}
```

**Why these choices:**

| Setting                          | Reasoning                                                            |
| -------------------------------- | -------------------------------------------------------------------- |
| `standalone: true`               | No NgModule needed, enables tree-shaking                             |
| `ChangeDetectionStrategy.OnPush` | **Mandatory** - prevents unnecessary re-renders, optimal performance |
| `<T extends object>`             | Generic constraint ensures type safety for row data                  |

### Signal-Based Inputs (Lines 26-47)

```typescript
readonly dataSource = input.required<T[] | Signal<T[]>>();
readonly trackBy = input<(index: number, item: T) => any>();
readonly loading = input(false);
readonly emptyMessage = input('No data available');
readonly hoverable = input(true);
readonly striped = input(false);
readonly density = input<'compact' | 'normal' | 'comfortable'>('normal');
```

**Why Signal Inputs:**

- Angular 17+ `input()` function creates Signal-based inputs
- Enables fine-grained reactivity - only affected computed values update
- Better performance compared to traditional `@Input()` decorators
- Type inference is automatic

**Input Design Philosophy:**

- `dataSource` is `required` - table needs data to function
- All visual options have sensible defaults (hoverable=true, density=normal)
- Flexibility via union type: accepts both `T[]` and `Signal<T[]>`

### Content Queries (Lines 59-70)

```typescript
readonly columnDefs = contentChildren(ColumnDefDirective);
readonly rowTemplate = contentChild<TemplateRef<RowContext<T>>>('tableRow');
readonly emptyTemplate = contentChild<TemplateRef<void>>('empty');
readonly loadingTemplate = contentChild<TemplateRef<void>>('loading');
```

**Why `contentChildren` / `contentChild`:**

- Signal-based content queries (Angular 17+)
- `contentChildren(ColumnDefDirective)` finds all column definitions projected into the table
- Named template queries (`'tableRow'`, `'empty'`, `'loading'`) allow custom rendering
- Enables composition pattern - users compose table behavior declaratively

### Computed Data Resolution (Lines 72-83)

```typescript
protected readonly data = computed(() => {
  const source = this.dataSource();
  if (isSignal(source)) {
    return source();
  }
  return source;
});

protected readonly isEmpty = computed(() => this.data()?.length === 0);
protected readonly isLoading = computed(() => this.loading());
```

**Why This Pattern:**

1. **Unified Data Access**: Whether user passes `T[]` or `Signal<T[]>`, `data()` always returns `T[]`
2. **Signal Unwrapping**: `isSignal()` check handles both cases at runtime
3. **Derived State**: `isEmpty` and `isLoading` computed from primary signals
4. **Automatic Updates**: When `dataSource` changes, all computed values update automatically

### TrackBy Implementation (Lines 86-92)

```typescript
protected defaultTrackBy = (index: number, _item: T): number => index;

protected getTrackBy(): (index: number, item: T) => any {
  return this.trackBy() ?? this.defaultTrackBy;
}
```

**Why This Approach:**

- Default falls back to index-based tracking (safe but not optimal)
- Users can provide custom `trackBy` for better performance with large datasets
- Null coalescing (`??`) handles undefined trackBy cleanly
- **Performance Impact**: Proper `trackBy` prevents DOM recreation on data changes

### Row Context Generation (Lines 99-110)

```typescript
protected getRowContext(item: T, index: number): RowContext<T> {
  const data = this.data();
  return {
    $implicit: item,
    index,
    first: index === 0,
    last: index === data.length - 1,
    even: index % 2 === 0,
    odd: index % 2 !== 0,
  };
}
```

**Why This Context Shape:**

- `$implicit` allows `let-row` syntax in templates
- Index/first/last/even/odd match Angular's `*ngFor` context
- Enables custom row templates with full context access
- Consistent API familiar to Angular developers

---

## Column Definition: ColumnDefDirective

**File:** [column-def.directive.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/column-def/column-def.directive.ts)

```typescript
@Directive({
  selector: "[libColumnDef]",
  standalone: true,
})
export class ColumnDefDirective {
  readonly name = input.required<string>({ alias: "libColumnDef" });
  readonly sortable = input(false);
  readonly width = input<string>();
  readonly cellClass = input<string>();
  readonly headerTemplate = contentChild<TemplateRef<any>>("header");
  readonly cellTemplate = contentChild<TemplateRef<any>>("cell");
}
```

**Design Decisions:**

| Feature                                   | Reasoning                                         |
| ----------------------------------------- | ------------------------------------------------- |
| Attribute selector `[libColumnDef]`       | Applied to `<ng-container>`, no extra DOM element |
| Aliased input `{ alias: 'libColumnDef' }` | Enables `libColumnDef="name"` syntax              |
| Named templates `#header`, `#cell`        | Declarative custom rendering                      |
| `standalone: true`                        | Independent, tree-shakeable                       |

**Usage Pattern:**

```html
<lib-table [dataSource]="users">
  <ng-container libColumnDef="name" [sortable]="true">
    <ng-template #header>Full Name</ng-template>
    <ng-template #cell let-row>{{ row.firstName }} {{ row.lastName }}</ng-template>
  </ng-container>
</lib-table>
```

---

## Data Source Pattern

### Why Data Sources?

Data sources abstract the underlying data format, providing a unified `Signal<T[]>` interface regardless of input type:

| Input Type             | Use Case                       |
| ---------------------- | ------------------------------ |
| `T[]`                  | Static or rarely changing data |
| `Signal<T[]>`          | Reactive state management      |
| `Observable<T[]>`      | HTTP requests, real-time data  |
| `FormArray<FormGroup>` | Inline editing with forms      |

### Base Interface

**File:** [table.types.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/types/table.types.ts#L49-L56)

```typescript
export interface TableDataSource<T> {
  readonly data: Signal<T[]>;
  readonly loading?: Signal<boolean>;
  readonly totalCount?: Signal<number>;

  connect?(): void;
  disconnect?(): void;
}
```

**Why This Interface:**

- `data` as `Signal` enables reactive updates throughout the component
- Optional `loading` and `totalCount` for advanced use cases
- `connect/disconnect` lifecycle hooks for resource management

### ArrayDataSource

**File:** [array-data-source.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/data-sources/array-data-source.ts)

```typescript
export class ArrayDataSource<T> implements TableDataSource<T> {
  private readonly _data = signal<T[]>([]);

  readonly data: Signal<T[]> = this._data.asReadonly();
  readonly loading = signal(false);
  readonly totalCount: Signal<number> = computed(() => this._data().length);

  constructor(initialData: T[] = []) {
    this._data.set(initialData);
  }

  setData(data: T[]): void { this._data.set(data); }
  add(item: T): void { this._data.update(current => [...current, item]); }
  remove(predicate: (item: T) => boolean): void { ... }
  update(predicate: (item: T) => boolean, updater: (item: T) => T): void { ... }
}
```

**Why This Implementation:**

1. **Private Writable, Public Readonly**: `_data` is private, exposed as readonly via `asReadonly()`
2. **Immutable Updates**: `update()` creates new array, triggering change detection
3. **CRUD Methods**: Enables programmatic data manipulation
4. **Computed totalCount**: Automatically stays in sync

### ObservableDataSource

**File:** [observable-data-source.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/data-sources/observable-data-source.ts)

```typescript
export class ObservableDataSource<T> implements TableDataSource<T> {
  private readonly _state: Signal<ObservableState<T>>;

  constructor(dataObservable: Observable<T[]>) {
    this._state = toSignal(
      dataObservable.pipe(
        map((data) => ({ data, loading: false, error: null })),
        startWith({ data: [] as T[], loading: true, error: null }),
        catchError((error) => of({ data: [] as T[], loading: false, error }))
      ),
      { initialValue: { data: [], loading: true, error: null } }
    );

    this.data = computed(() => this._state().data);
    this.loading = computed(() => this._state().loading);
    this.error = computed(() => this._state().error);
  }
}
```

**Why This Pattern:**

1. **State Machine**: Single state object tracks data, loading, and error
2. **`toSignal`**: Converts Observable to Signal for reactive integration
3. **`startWith`**: Immediately emits loading state before data arrives
4. **`catchError`**: Graceful error handling without breaking the stream
5. **Derived Signals**: `data`, `loading`, `error` computed from unified state

### FormArrayDataSource

**File:** [form-array-data-source.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/data-sources/form-array-data-source.ts)

```typescript
export class FormArrayDataSource<T> implements TableDataSource<T> {
  readonly formGroups: Signal<FormGroup[]>;

  constructor(private readonly formArray: FormArray<FormGroup>) {
    this.formGroups = toSignal(
      this.formArray.valueChanges.pipe(
        startWith(this.formArray.controls),
        map(() => this.formArray.controls as FormGroup[])
      ),
      { initialValue: this.formArray.controls as FormGroup[] }
    );

    this.data = computed(() =>
      this.formGroups().map(fg => fg.getRawValue() as T)
    );
  }

  getRowContext(index: number): FormRowContext<T> { ... }
  add(formGroup: FormGroup): void { this.formArray.push(formGroup); }
  removeAt(index: number): void { this.formArray.removeAt(index); }
}
```

**Why This Implementation:**

1. **FormArray Integration**: Enables inline table editing
2. **Reactive Updates**: `valueChanges` Observable converted to Signal
3. **FormGroup Context**: `getRowContext()` includes FormGroup for template binding
4. **Two-Way Binding**: Changes in form controls reflect in table display

### Factory Function: createDataSource

**File:** [create-data-source.ts](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/data-sources/create-data-source.ts)

```typescript
export function createDataSource<T>(input: DataInput<T>): TableDataSource<T> {
  if (Array.isArray(input)) return new ArrayDataSource(input);
  if (isSignal(input)) return new SignalDataSource(input as Signal<T[]>);
  if (isObservable(input)) return new ObservableDataSource(input as Observable<T[]>);
  if (input instanceof FormArray) return new FormArrayDataSource(input);

  throw new Error(`Unsupported data source type. Expected T[], Signal<T[]>, Observable<T[]>, or FormArray. ` + `Received: ${typeof input}`);
}
```

**Why a Factory:**

1. **Unified API**: Single function handles all input types
2. **Type Inference**: Runtime type checking with appropriate constructor calls
3. **Error Handling**: Clear error message for unsupported types
4. **Future Extensibility**: Easy to add new data source types

---

## Template Architecture

**File:** [table.component.html](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/core/table.component.html)

### Control Flow (Angular 17+)

```html
@if (isLoading()) {
<!-- Loading state -->
} @else {
<!-- Table content -->
}
```

**Why `@if` over `*ngIf`:**

- New control flow syntax is more performant
- No need for CommonModule import for basic control flow
- Cleaner template syntax
- Better type narrowing in template

### Column Iteration with `@for`

```html
@for (col of columnDefs(); track col.name()) {
<th class="lib-table-header-cell">...</th>
}
```

**Why `track col.name()`:**

- Unique identifier for each column
- Prevents DOM recreation when columns don't change
- **Performance Critical** for tables with many columns

### Template Outlets for Customization

```html
@if (col.headerTemplate()) {
<ng-container *ngTemplateOutlet="col.headerTemplate()!"></ng-container>
} @else { {{ col.name() }} }
```

**Why This Pattern:**

1. **Fallback Behavior**: If no template provided, show column name
2. **Full Customization**: Users can provide any header content
3. **Non-null Assertion (`!`)**: Safe because we checked with `@if`

---

## CSS Architecture

**File:** [table.component.css](file:///f:/P_WORK/Setup%20-%20Libraries/Angular/lb_v1/src/library/table/core/table.component.css)

> [!WARNING]
> Current CSS uses **hardcoded values** which violates theming requirements. This needs refactoring to use CSS variables.

### Density Modifiers

```css
.lib-table--compact .lib-table-cell {
  padding: 0.4rem 0.75rem;
}

.lib-table--comfortable .lib-table-cell {
  padding: 1rem 1.25rem;
}
```

**Why CSS Modifier Classes:**

- BEM-like naming convention (`.lib-table--modifier`)
- Applied via Angular class binding based on `density()` input
- Single source of truth for styling variants

---

## Performance Considerations

1. **OnPush Change Detection**: Prevents unnecessary checks
2. **Signal-Based State**: Fine-grained reactivity
3. **TrackBy Functions**: Minimizes DOM operations
4. **Content Projection**: Lazy evaluation of templates
5. **Computed Derivations**: Cached until dependencies change

---

## Known Limitations

1. **CSS Hardcoding**: Current styles use hardcoded colors/spacing - needs refactoring
2. **No Virtual Scrolling**: Large datasets (1000+ rows) may have performance issues
3. **Basic Sorting**: Sort logic not implemented in core component
4. **No Pagination**: Currently displays all data

---

## Testing Considerations

- Test each data source type independently
- Test trackBy behavior with dataset updates
- Test template fallbacks (empty, loading states)
- Test density variants
- Verify OnPush doesn't cause missed updates
