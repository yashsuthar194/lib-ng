# Angular Component Library

A modern, enterprise-grade Angular component library built with Angular 19+, featuring signal-based reactivity, standalone components, and comprehensive theming support.

[![Angular](https://img.shields.io/badge/Angular-19.2+-dd0031.svg)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🚀 **Modern Angular 19+** - Signals, standalone components, new control flow syntax
- 🎨 **Comprehensive Theming** - CSS custom properties with dark mode support
- ♿ **Accessible** - WCAG 2.1 AA compliant with full keyboard navigation
- 📝 **Forms Integration** - Seamless Reactive Forms via ControlValueAccessor
- ⚡ **High Performance** - OnPush change detection, optimized rendering
- 📦 **Tree-shakable** - Import only what you need

## 📦 Components

| Component      | Description                                 | Forms Support |
| -------------- | ------------------------------------------- | ------------- |
| **Accordion**  | Expandable panels with multi-expand support | -             |
| **Alert**      | Contextual feedback messages                | -             |
| **Avatar**     | User profile images with fallbacks          | -             |
| **Badge**      | Status indicators and labels                | -             |
| **Breadcrumb** | Navigation trail with auto-generation       | -             |
| **Button**     | Primary action triggers with variants       | -             |
| **Card**       | Content containers with sections            | -             |
| **Checkbox**   | Single and group checkboxes                 | ✅ CVA        |
| **Datepicker** | Date, time, range, and datetime selection   | ✅ CVA        |
| **Input**      | Text input with validation states           | ✅ CVA        |
| **Modal**      | Dialog overlays with animations             | -             |
| **Progress**   | Bar and circular progress indicators        | -             |
| **Select**     | Single/multi-select with search             | ✅ CVA        |
| **Skeleton**   | Loading placeholders                        | -             |
| **Stepper**    | Multi-step wizards                          | -             |
| **Switch**     | Toggle switches                             | ✅ CVA        |
| **Table**      | Data tables with sorting                    | -             |
| **Tabs**       | Tabbed content panels                       | -             |
| **Toast**      | Notification messages                       | -             |
| **Tooltip**    | Contextual hover information                | -             |

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lb_v1

# Install dependencies
npm install

# Start development server
npm start
```

### Basic Usage

```typescript
import { SelectComponent, OptionComponent } from './library/select';

@Component({
  standalone: true,
  imports: [SelectComponent, OptionComponent],
  template: `
    <lib-select [(value)]="selected" placeholder="Select an option">
      <lib-option value="1">Option 1</lib-option>
      <lib-option value="2">Option 2</lib-option>
      <lib-option value="3">Option 3</lib-option>
    </lib-select>
  `,
})
export class MyComponent {
  selected = signal<string | null>(null);
}
```

### With Reactive Forms

```typescript
import { InputDirective, FormFieldComponent } from './library/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputDirective, FormFieldComponent],
  template: `
    <lib-form-field>
      <label libLabel>Email</label>
      <input libInput type="email" [formControl]="emailControl" />
      <span libError>Please enter a valid email</span>
    </lib-form-field>
  `,
})
export class MyFormComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
}
```

## 🎨 Theming

The library uses CSS custom properties for complete theming control.

### Available Themes

- **Indigo** (default)
- **Ocean** - Cyan/teal palette
- **Emerald** - Green palette
- **Rose** - Pink/red palette
- **Amber** - Orange/yellow palette
- **Violet** - Purple palette

### Theme Switching

```html
<!-- Apply color theme -->
<body data-theme-color="ocean">
  <!-- Enable dark mode -->
  <body data-theme-mode="dark">
    <!-- Combined -->
    <body data-theme-color="emerald" data-theme-mode="dark"></body>
  </body>
</body>
```

### Custom Theme

```css
:root {
  --lib-color-primary-500: #your-color;
  --lib-color-primary-600: #your-darker-color;
  /* ... */
}
```

See [Theming Documentation](docs/theming/README.md) for complete details.

## 📁 Project Structure

```
src/
├── app/                    # Demo application
│   └── examples/           # Component examples
├── library/                # Component library
│   ├── accordion/
│   ├── alert/
│   ├── avatar/
│   ├── badge/
│   ├── breadcrumb/
│   ├── button/
│   ├── card/
│   ├── checkbox/
│   ├── datepicker/
│   ├── input/
│   ├── modal/
│   ├── progress/
│   ├── select/
│   ├── skeleton/
│   ├── stepper/
│   ├── table/
│   ├── tabs/
│   ├── toast/
│   ├── tooltip/
│   └── shared/             # Shared utilities
└── styles/
    └── design-tokens.css   # CSS custom properties
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 19+

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run tests
npm test
```

### Architecture Principles

1. **Standalone Components** - No NgModules required
2. **Signal-Based State** - Modern reactive patterns
3. **OnPush Change Detection** - Optimal performance
4. **CSS Variables Only** - No hardcoded styling values
5. **ControlValueAccessor** - Seamless forms integration

## 📚 Documentation

| Document                                               | Description                |
| ------------------------------------------------------ | -------------------------- |
| [Project Overview](docs/project/overview.md)           | Goals and technology stack |
| [Architecture](docs/architecture/README.md)            | Technical implementation   |
| [Theming Guide](docs/theming/README.md)                | CSS custom properties      |
| [AI Guidelines](docs/ai-guidelines/README.md)          | Development standards      |
| [Component Catalog](docs/project/component-catalog.md) | All components             |
| [Contributing](docs/project/contributing.md)           | How to contribute          |

## 🌐 Browser Support

| Browser | Version         |
| ------- | --------------- |
| Chrome  | Last 2 versions |
| Firefox | Last 2 versions |
| Safari  | Last 2 versions |
| Edge    | Last 2 versions |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/project/contributing.md) before submitting a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using Angular 19
