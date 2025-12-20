# Performance Optimization Checklist

## Pre-Implementation Checklist

Before writing any component code:

- [ ] Identified potential performance bottlenecks
- [ ] Planned signal-based state management
- [ ] Designed for minimal re-renders
- [ ] Identified lazy-loadable dependencies

## Implementation Checklist

### Change Detection

- [ ] `ChangeDetectionStrategy.OnPush` applied
- [ ] No direct DOM manipulation outside Angular
- [ ] Using signals for reactive state

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ Required
})
```

### Iteration Performance

- [ ] `trackBy` implemented for ALL `*ngFor`
- [ ] Using `@for` with `track` expression (Angular 17+)

```html
<!-- Angular 17+ control flow -->
@for (item of items(); track item.id) {
<div>{{ item.name }}</div>
}

<!-- Legacy NgFor with trackBy -->
<div *ngFor="let item of items; trackBy: trackById"></div>
```

### Signal Usage

- [ ] Using `signal()` for mutable state
- [ ] Using `computed()` for derived values
- [ ] Using `effect()` sparingly for side effects

```typescript
// ✅ Correct signal usage
private readonly _data = signal<T[]>([]);
readonly sortedData = computed(() =>
  this.sortService.sort(this._data(), this.sortColumn())
);
```

### Bundle Optimization

- [ ] Heavy dependencies lazy loaded
- [ ] Tree-shakeable exports
- [ ] No circular dependencies

## Performance Testing

- [ ] Tested with large datasets (1000+ items)
- [ ] Profiled with Angular DevTools
- [ ] No unnecessary change detection cycles
- [ ] Memory usage stable (no leaks)
