# Documentation Component Requirements

## Purpose

For **every library component**, create a corresponding **documentation component** that provides:

1. **Interactive Examples** - Live component demos
2. **Code Reference** - Copyable code snippets
3. **API Documentation** - Inputs, outputs, methods
4. **Usage Patterns** - Common use cases

---

## Documentation Page Structure

```typescript
@Component({
  selector: 'app-[component]-docs',
  standalone: true,
  imports: [/* library component, CommonModule */],
  template: `
    <div class="docs-page">
      <!-- Header -->
      <header class="docs-header">
        <h1>Component Name</h1>
        <p>Brief description</p>
      </header>

      <!-- Examples Section -->
      <section class="docs-section">
        <h2>Examples</h2>
        <div class="example-container">
          <h3>Basic Usage</h3>
          <div class="example-demo">
            <!-- Live demo -->
          </div>
          <div class="example-code">
            <pre><code>...</code></pre>
          </div>
        </div>
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>
        <h3>Inputs</h3>
        <table class="api-table">...</table>
        <h3>Outputs</h3>
        <table class="api-table">...</table>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2>Accessibility</h2>
        <ul>...</ul>
      </section>

      <!-- Theming -->
      <section class="docs-section">
        <h2>Theming</h2>
        <pre><code>/* CSS variables */</code></pre>
      </section>
    </div>
  `
})
```

---

## Required Examples

For each component, include these example variations:

| Example            | Purpose                 | Required For  |
| ------------------ | ----------------------- | ------------- |
| Basic Usage        | Simplest implementation | All           |
| With FormControl   | Reactive form binding   | Form controls |
| With FormGroup     | Form group integration  | Form controls |
| With FormArray     | Dynamic arrays          | Form controls |
| With Validation    | Error handling          | Form controls |
| Disabled State     | Disabled behavior       | All           |
| Custom Styling     | Theme customization     | All           |
| Advanced Config    | Complex scenarios       | All           |
| Accessibility Demo | A11y features           | All           |
| Loading State      | Loading behavior        | If applicable |

---

## Documentation Styling

```css
.docs-page {
  padding: var(--lib-spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

.docs-section {
  margin-block-end: var(--lib-spacing-8);
}

.example-container {
  margin-block-end: var(--lib-spacing-6);
  border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
  border-radius: var(--lib-border-radius-lg);
  overflow: hidden;
}

.example-demo {
  padding: var(--lib-spacing-6);
  background: var(--lib-color-neutral-0);
}

.example-code {
  background: var(--lib-color-neutral-900);
  color: var(--lib-color-neutral-100);
  padding: var(--lib-spacing-4);
  overflow-x: auto;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
}

.api-table th,
.api-table td {
  padding: var(--lib-spacing-3);
  text-align: left;
  border-block-end: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
}
```

---

## API Table Format

### Inputs Table

| Name       | Type      | Default | Description   |
| ---------- | --------- | ------- | ------------- |
| `value`    | `string`  | `''`    | Current value |
| `disabled` | `boolean` | `false` | Disable state |

### Outputs Table

| Name          | Type                   | Description           |
| ------------- | ---------------------- | --------------------- |
| `valueChange` | `EventEmitter<string>` | Emits on value change |
