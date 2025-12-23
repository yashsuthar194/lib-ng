# Code Quality Requirements

## TypeScript Standards

### Strict Mode Compliance

All code MUST compile with TypeScript strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true
  }
}
```

### JSDoc Comments

Every public API MUST have comprehensive JSDoc:

````typescript
/**
 * A data-driven table component with sorting, filtering, and pagination.
 *
 * @example
 * ```html
 * <lib-table [dataSource]="dataSource">
 *   <lib-column field="name" header="Name"></lib-column>
 * </lib-table>
 * ```
 */
@Component({...})
export class TableComponent<T> { }

/**
 * Emits when a row is selected.
 * @emits The selected row data of type T
 */
@Output() rowSelected = new EventEmitter<T>();
````

## Error Handling

### Input Validation

Validate all public API inputs:

```typescript
@Input()
set pageSize(value: number) {
  if (value < 1) {
    throw new Error('pageSize must be at least 1');
  }
  this._pageSize.set(value);
}
```

### Meaningful Error Messages

```typescript
// ❌ Bad
throw new Error("Invalid input");

// ✅ Good
throw new Error(`[LibTable] Invalid pageSize: ${value}. ` + `Expected a positive number, got ${typeof value}.`);
```

## Naming Conventions

| Type          | Convention                      | Example                   |
| ------------- | ------------------------------- | ------------------------- |
| Components    | PascalCase + Component suffix   | `TableComponent`          |
| Directives    | PascalCase + Directive suffix   | `ColumnDefDirective`      |
| Services      | PascalCase + Service suffix     | `TableDataService`        |
| Interfaces    | PascalCase, prefix with context | `TableColumn`, `TableRow` |
| CSS Variables | kebab-case with `--lib-` prefix | `--lib-color-primary`     |
| Files         | kebab-case                      | `table.component.ts`      |
