# AI Development Guidelines

## Overview

This section provides comprehensive guidelines for AI agents developing features in this component library. All AI agents MUST follow these standards to ensure consistency, performance, and accessibility.

## Guidelines Index

| Document                                                  | Description                              |
| --------------------------------------------------------- | ---------------------------------------- |
| [Development Standards](./development-standards.md)       | Core development principles              |
| [Code Quality](./code-quality.md)                         | TypeScript and code quality requirements |
| [Performance Checklist](./performance-checklist.md)       | Performance optimization requirements    |
| [Forms Integration](./forms-integration.md)               | ControlValueAccessor implementation      |
| [Accessibility Checklist](./accessibility-checklist.md)   | WCAG 2.1 AA compliance                   |
| [Theming Requirements](./theming-requirements.md)         | CSS variables mandate                    |
| [Modern CSS](./modern-css.md)                             | CSS features, animations, performance    |
| [Documentation Components](./documentation-components.md) | Interactive docs page structure          |
| [Feature Completion](./feature-completion-checklist.md)   | Definition of "done"                     |

## Non-Negotiable Requirements

> [!CAUTION]
> The following requirements are **MANDATORY** for every feature:

1. **OnPush Change Detection** - Every component
2. **No Hardcoded Styling** - Use CSS variables only
3. **ControlValueAccessor** - For all form controls
4. **Keyboard Navigation** - Full support required
5. **ARIA Attributes** - Complete implementation
6. **Unit Test Coverage** - Minimum 80%

## Quick Reference

```typescript
// ✅ ALWAYS do this
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// ❌ NEVER do this
.button { color: #2196f3; } // Hardcoded color!
```
