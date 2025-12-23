# Contributing Guidelines

## Development Workflow

### 1. Planning Phase

1. Design component API (inputs, outputs, methods)
2. Plan state management approach
3. Identify accessibility requirements
4. Define theming integration

### 2. Implementation Phase

1. Create component with OnPush change detection
2. Implement ControlValueAccessor (if form control)
3. Add accessibility features (ARIA, keyboard nav)
4. Use CSS variables only (no hardcoded values)

### 3. Example Components Phase

1. Create basic usage example
2. Create form integration examples
3. Create theming customization examples
4. Create accessibility demonstration

### 4. Testing Phase

1. Write unit tests (>80% coverage)
2. Write E2E tests for interactions
3. Test keyboard navigation
4. Test with different themes

### 5. Documentation Phase

1. Create component architecture docs
2. Update component catalog
3. Add inline code comments

## Code Standards

### TypeScript

- Strict mode enabled
- Comprehensive JSDoc comments
- Meaningful error messages
- Input validation on public APIs

### CSS

- **NO hardcoded values** - use CSS variables
- Follow naming conventions in [theming docs](../theming/naming-conventions.md)

### Testing

- Unit test coverage >80%
- E2E tests for complex interactions

## Pull Request Checklist

- [ ] OnPush change detection implemented
- [ ] No hardcoded styling values
- [ ] ControlValueAccessor implemented (for form controls)
- [ ] Full keyboard navigation works
- [ ] ARIA attributes correct
- [ ] Unit tests pass with >80% coverage
- [ ] Documentation updated
