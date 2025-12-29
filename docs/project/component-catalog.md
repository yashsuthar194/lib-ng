# Component Catalog

## Overview

This library provides 20+ production-ready, accessible UI components built with Angular 19+ best practices.

## Component Status

### ✅ Complete Components

| Component      | Description                                 | Forms  | Documentation                                   |
| -------------- | ------------------------------------------- | ------ | ----------------------------------------------- |
| **Accordion**  | Expandable panels with multi-expand support | -      | [Docs](../architecture/components/accordion.md) |
| **Alert**      | Contextual feedback messages with variants  | -      | Pending                                         |
| **Avatar**     | User profile images with fallbacks & groups | -      | Pending                                         |
| **Badge**      | Status indicators and labels                | -      | Pending                                         |
| **Breadcrumb** | Navigation trail with auto-generation       | -      | Pending                                         |
| **Button**     | Primary action triggers with variants       | -      | Pending                                         |
| **Card**       | Content containers with header/body/footer  | -      | Pending                                         |
| **Checkbox**   | Single and group checkboxes                 | ✅ CVA | Pending                                         |
| **Datepicker** | Date, time, range, and datetime selection   | ✅ CVA | Pending                                         |
| **Input**      | Text input with validation states           | ✅ CVA | Pending                                         |
| **Modal**      | Dialog overlays with animations             | -      | Pending                                         |
| **Progress**   | Bar and circular progress indicators        | -      | Pending                                         |
| **Select**     | Single/multi-select with search             | ✅ CVA | [Docs](../architecture/components/select.md)    |
| **Skeleton**   | Loading placeholders (text, shapes)         | -      | Pending                                         |
| **Stepper**    | Multi-step wizards with validation          | -      | Pending                                         |
| **Switch**     | Toggle switches                             | ✅ CVA | Pending                                         |
| **Table**      | Data tables with sorting and templates      | -      | [Docs](../architecture/components/table.md)     |
| **Tabs**       | Tabbed content panels                       | -      | Pending                                         |
| **Toast**      | Notification messages                       | -      | Pending                                         |
| **Tooltip**    | Contextual hover information                | -      | Pending                                         |

### Shared Utilities

| Utility                   | Description                      |
| ------------------------- | -------------------------------- |
| **FocusTrapDirective**    | Trap focus within modals/dialogs |
| **ClickOutsideDirective** | Detect clicks outside element    |

## Component Details

### Form Components (CVA)

Components implementing `ControlValueAccessor` for seamless Reactive Forms integration:

```typescript
// Example: Select with FormControl
<lib-select [formControl]="countryControl">
  <lib-option value="us">United States</lib-option>
  <lib-option value="uk">United Kingdom</lib-option>
</lib-select>

// Example: Input with FormControl
<lib-form-field>
  <input libInput [formControl]="emailControl" />
</lib-form-field>

// Example: Checkbox with FormControl
<lib-checkbox [formControl]="agreeControl">
  I agree to the terms
</lib-checkbox>

// Example: Datepicker with FormControl
<lib-date-picker [formControl]="dateControl" />
```

### Layout Components

| Component     | Sub-components                                              |
| ------------- | ----------------------------------------------------------- |
| **Card**      | CardHeaderComponent, CardBodyDirective, CardFooterDirective |
| **Accordion** | AccordionComponent, AccordionItemComponent                  |
| **Tabs**      | TabsComponent, TabComponent                                 |
| **Stepper**   | StepperComponent, StepComponent                             |

### Overlay Components

| Component   | Service          | Description                |
| ----------- | ---------------- | -------------------------- |
| **Modal**   | ModalService     | Programmatic modal dialogs |
| **Toast**   | ToastService     | Notification toasts        |
| **Tooltip** | TooltipDirective | Directive-based tooltips   |

### Data Display Components

| Component    | Features                                              |
| ------------ | ----------------------------------------------------- |
| **Table**    | Column definitions, sorting, templates, loading state |
| **Avatar**   | Image, initials, icon fallback, groups                |
| **Badge**    | Variants, positions, animations                       |
| **Progress** | Bar and circle, indeterminate mode                    |
| **Skeleton** | Text, shapes, custom templates                        |

## Import Patterns

Each component exports from its index file:

```typescript
// Import specific components
import { SelectComponent, OptionComponent } from '@lib/select';
import { TableComponent, ColumnDefDirective } from '@lib/table';
import { ModalService, ModalRef } from '@lib/modal';

// Import types
import type { SelectConfig, OptionValue } from '@lib/select';
import type { ModalConfig, ModalCloseReason } from '@lib/modal';
```

## Legend

| Symbol | Meaning                              |
| ------ | ------------------------------------ |
| ✅     | Feature implemented                  |
| CVA    | ControlValueAccessor (Forms support) |
| -      | Not applicable                       |
