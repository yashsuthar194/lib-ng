# Example Patterns

## Overview

This section documents the patterns and requirements for creating example components that demonstrate library features.

## Related Documents

| Document                       | Description       |
| ------------------------------ | ----------------- |
| [Examples README](./README.md) | Examples overview |

## Example Component Requirements

Every library component MUST have corresponding example components:

### Required Example Types

1. **Basic Usage** - Simplest working example
2. **Advanced Configuration** - Demonstrating all options
3. **Form Integration** (if applicable):
   - FormControl example
   - FormGroup example
   - FormArray example
   - Validation example
4. **Theming** - Custom theme demonstration
5. **Accessibility** - Keyboard navigation, screen reader demo

## File Structure

```
src/app/examples/
├── [component]/
│   ├── basic/
│   │   └── basic-[component]-example.component.ts
│   ├── advanced/
│   │   └── advanced-[component]-example.component.ts
│   ├── forms/
│   │   ├── form-control-example.component.ts
│   │   ├── form-group-example.component.ts
│   │   └── form-array-example.component.ts
│   ├── theming/
│   │   └── themed-[component]-example.component.ts
│   └── [component]-examples.routes.ts
```

## Example Component Template

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
// Import library component
import { LibComponent } from "@lib/[component]";

@Component({
  standalone: true,
  imports: [CommonModule, LibComponent],
  template: ` <!-- Example usage --> `,
})
export class BasicExampleComponent {
  // Example data and logic
}
```

## Integration with Documentation

Example components are imported into documentation pages to show:

1. **Live rendered output** - Interactive, working example
2. **Source code** - The code that produces the output
3. **Configurability** - Toggle options to see different states
