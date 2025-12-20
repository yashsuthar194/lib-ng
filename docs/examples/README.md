# Example Components

## Overview

This section contains documentation about example component patterns used for:

1. **Testing** - Manual and automated testing of library components
2. **Documentation** - Interactive demos in documentation pages
3. **Reference** - Real-world usage patterns for developers

## Documentation

| Document                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| [Patterns](./patterns.md) | Example component requirements and structure |

## Example Location

All example components are located in:

```
src/app/examples/
├── [component]/           # Per-component examples
│   ├── basic/
│   ├── advanced/
│   ├── forms/
│   └── theming/
└── examples.routes.ts     # Example routing
```

## Purpose

Examples serve multiple purposes:

| Purpose                 | Description                                |
| ----------------------- | ------------------------------------------ |
| **Development Testing** | Test component behavior during development |
| **Documentation Demos** | Live examples embedded in docs             |
| **Usage Reference**     | Show how to use components                 |
| **QA Testing**          | Manual testing scenarios                   |

## Guidelines

- Keep examples **focused** - one feature per example
- Make examples **self-contained** - no external dependencies
- Include **comments** explaining key concepts
- Show **best practices** in example code
