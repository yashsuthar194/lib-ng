# Feature Completion Checklist

A feature is **NOT complete** until ALL items are checked:

## Implementation

- [ ] Component created with standalone: true
- [ ] `ChangeDetectionStrategy.OnPush` applied
- [ ] All `*ngFor` loops have `trackBy` / `track`
- [ ] Signals used for state management
- [ ] TypeScript strict mode compliant
- [ ] Comprehensive JSDoc comments on public APIs

## Theming

- [ ] **ZERO hardcoded styling values**
- [ ] All colors use CSS variables
- [ ] All spacing uses CSS variables
- [ ] All typography uses CSS variables
- [ ] Works with light theme
- [ ] Works with dark theme

## Modern CSS & Animations

- [ ] Uses CSS logical properties (padding-inline, etc.)
- [ ] Smooth state transitions added
- [ ] Entry/exit animations where appropriate
- [ ] `prefers-reduced-motion` respected
- [ ] Focus animations implemented

## Forms (if applicable)

- [ ] `ControlValueAccessor` implemented
- [ ] Works with `FormControl`
- [ ] Works with `FormGroup`
- [ ] Works with `FormArray`
- [ ] Disabled state supported
- [ ] Validation errors display correctly

## Accessibility

- [ ] Correct ARIA attributes
- [ ] Full keyboard navigation
- [ ] Visible focus indicators
- [ ] Screen reader tested
- [ ] Color contrast compliant
- [ ] Respects `prefers-reduced-motion`

## Examples Created

- [ ] Basic usage example
- [ ] Advanced configuration examples
- [ ] Form integration examples (if applicable)
- [ ] Theming customization example
- [ ] Accessibility demonstration

## Testing

- [ ] Unit tests written
- [ ] Coverage > 80%
- [ ] E2E tests for complex interactions
- [ ] Tested with large datasets (if applicable)

## Documentation

- [ ] Architecture documentation written
- [ ] Inline code comments explain "why"
- [ ] Component catalog updated
- [ ] API reference complete

---

## Sign-off Template

```
Feature: [Component Name]
Completed: [Date]

✅ Implementation complete
✅ Theming complete
✅ Forms integration complete (or N/A)
✅ Accessibility complete
✅ Examples created
✅ Tests passing
✅ Documentation complete
```
