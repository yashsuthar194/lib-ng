# Code Architecture Documentation

## Overview

This section contains detailed technical documentation explaining the "why" and "how" behind implementation decisions in the library.

## Contents

| Document                                  | Description                          |
| ----------------------------------------- | ------------------------------------ |
| [Design Patterns](./design-patterns.md)   | Patterns used across the library     |
| [State Management](./state-management.md) | Signal-based state approach          |
| [Testing Strategy](./testing-strategy.md) | Testing approach and patterns        |
| [Component Docs](./components/)           | Per-component implementation details |

## Purpose

Architecture documentation serves to:

1. **Explain reasoning** - Why specific approaches were chosen
2. **Document trade-offs** - What alternatives were considered
3. **Enable maintenance** - Help future developers understand the code
4. **Share knowledge** - Capture learnings and best practices

## Per-Component Documentation

Each component gets its own architecture document in `./components/`:

```
components/
├── _template.md     # Template for new components
├── table.md         # Table implementation details
├── select.md        # Select implementation details
└── ...
```

See [\_template.md](./components/_template.md) for the required structure.
