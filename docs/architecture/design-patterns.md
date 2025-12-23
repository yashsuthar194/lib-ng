# Design Patterns

## Patterns Used Across the Library

### 1. Composition Pattern

Components are designed to be composed together rather than using deep inheritance hierarchies.

```html
<lib-table [dataSource]="dataSource">
  <lib-column field="name" header="Name"></lib-column>
  <lib-column field="email" header="Email"></lib-column>
</lib-table>
```

**Benefits:**

- Flexible component assembly
- Clear ownership of features
- Easy to understand and test

### 2. Data Source Pattern

Data-driven components use abstract data source classes:

```typescript
abstract class DataSource<T> {
  abstract connect(): Observable<T[]>;
  abstract disconnect(): void;
}
```

**Implementations:**

- `ArrayDataSource<T>` - Static arrays
- `ObservableDataSource<T>` - Observable streams
- `PaginatedDataSource<T>` - Paginated data

### 3. Directive-Based Features

Optional features are implemented as directives:

```html
<!-- Base table -->
<lib-table [dataSource]="data">
  <!-- With optional sorting -->
  <lib-table [dataSource]="data" libSortable>
    <!-- With optional selection -->
    <lib-table [dataSource]="data" libSelectable></lib-table></lib-table
></lib-table>
```

### 4. Template Outlet Pattern

Allow consumers to customize rendering:

```typescript
@ContentChild('cellTemplate') cellTemplate: TemplateRef<any>;
```

```html
<lib-column field="status">
  <ng-template #cellTemplate let-value>
    <span [class]="getStatusClass(value)">{{ value }}</span>
  </ng-template>
</lib-column>
```

### 5. Strategy Pattern

Interchangeable algorithms (sorting, filtering):

```typescript
interface SortStrategy<T> {
  sort(data: T[], column: string, direction: "asc" | "desc"): T[];
}
```
