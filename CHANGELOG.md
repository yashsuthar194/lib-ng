# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- ESLint configuration with Angular ESLint rules
- Prettier configuration for consistent code formatting
- Husky and lint-staged for pre-commit hooks
- Comprehensive README with documentation links
- Updated component catalog with all 20+ components

### Changed

- Fixed TypeScript `any` type in ModalContainerComponent
- Improved Select component accessibility (ARIA listbox pattern)

### Fixed

- N/A

---

## [0.1.0] - 2024-12-29

### Added

#### Core Infrastructure

- Angular 19.2 project setup with standalone components
- Signal-based state management throughout
- OnPush change detection strategy for all components
- CSS custom properties design token system
- Dark mode support with `data-theme-mode="dark"`
- Multiple color themes (Indigo, Ocean, Emerald, Rose, Amber, Violet)

#### Components

- **Accordion** - Expandable panels with multi-expand mode
- **Alert** - Contextual feedback messages (success, warning, error, info)
- **Avatar** - User profile images with initials fallback and avatar groups
- **Badge** - Status indicators with variants and positioning
- **Breadcrumb** - Navigation trail with auto-generation from routes
- **Button** - Action triggers with variants, sizes, and loading state
- **Card** - Content containers with header, body, and footer sections
- **Checkbox** - Single checkbox and checkbox groups with CVA support
- **Datepicker** - Date, time, datetime, month-year, and range pickers
- **Input** - Text input directive with form field container
- **Modal** - Dialog overlays with multiple animation types
- **Progress** - Bar and circular progress indicators
- **Select** - Single/multi-select with search and option groups
- **Skeleton** - Loading placeholders (shapes, text, groups)
- **Stepper** - Multi-step wizards with validation
- **Switch** - Toggle switches with CVA support
- **Table** - Data tables with column definitions and templates
- **Tabs** - Tabbed content panels with lazy loading
- **Toast** - Notification messages with auto-dismiss
- **Tooltip** - Contextual hover tooltips

#### Shared Utilities

- FocusTrapDirective - Focus management for modals
- ClickOutsideDirective - Click outside detection

#### Documentation

- Project overview and architecture docs
- Theming documentation with design tokens
- AI development guidelines
- Component architecture docs (Table, Select)

### Technical Details

#### Angular Features Used

- `signal()`, `computed()`, `effect()` for reactive state
- `input()`, `output()`, `model()` for component I/O
- `contentChildren()`, `contentChild()` for content queries
- `@if`, `@for`, `@switch` control flow syntax
- `inject()` function for dependency injection
- `DestroyRef` and `takeUntilDestroyed()` for cleanup

#### Accessibility

- ARIA attributes throughout (aria-label, aria-expanded, aria-selected, etc.)
- Keyboard navigation support
- Focus management with focus trap
- `prefers-reduced-motion` media query support

#### Performance

- OnPush change detection on all components
- Proper `track` functions for all `@for` loops
- Computed signals for derived values
- Efficient cleanup patterns

---

## Version History

| Version | Date       | Description                         |
| ------- | ---------- | ----------------------------------- |
| 0.1.0   | 2024-12-29 | Initial release with 20+ components |

---

## Migration Guides

### Migrating to 0.1.0

This is the initial release. No migration required.

### Future Breaking Changes

Breaking changes will be documented here with migration instructions.
