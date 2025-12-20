# Testing Strategy

## Test Types

| Type        | Purpose                      | Coverage Target |
| ----------- | ---------------------------- | --------------- |
| Unit        | Individual functions/methods | >80%            |
| Component   | Component behavior           | >80%            |
| Integration | Component interaction        | Key flows       |
| E2E         | Full user flows              | Critical paths  |

## Unit Testing

### Setup

```typescript
describe("TableComponent", () => {
  let component: TableComponent<TestData>;
  let fixture: ComponentFixture<TableComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });
});
```

### Test Categories

1. **Input binding tests** - Verify inputs update state
2. **Output emission tests** - Verify events fire correctly
3. **State transformation tests** - Verify computed values
4. **Accessibility tests** - Verify ARIA attributes

## Accessibility Testing

```typescript
it("should have correct ARIA attributes", () => {
  const table = fixture.nativeElement.querySelector("table");
  expect(table.getAttribute("role")).toBe("grid");
  expect(table.getAttribute("aria-rowcount")).toBeDefined();
});

it("should support keyboard navigation", () => {
  const row = fixture.nativeElement.querySelector("tr");
  row.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
  // Verify focus moved
});
```

## Performance Testing

```typescript
it("should handle large datasets efficiently", () => {
  const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  component.dataSource = new ArrayDataSource(largeData);

  const start = performance.now();
  fixture.detectChanges();
  const duration = performance.now() - start;

  expect(duration).toBeLessThan(100); // 100ms threshold
});
```

## E2E Testing

For complex interactions (sorting, filtering, pagination), write E2E tests using Playwright or Cypress.
