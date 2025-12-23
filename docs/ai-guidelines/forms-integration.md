# Forms Integration Requirements

## ControlValueAccessor Implementation

All form-compatible components MUST implement `ControlValueAccessor`:

```typescript
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyComponent),
      multi: true,
    },
  ],
})
export class MyComponent implements ControlValueAccessor {
  // Required methods
  writeValue(value: T): void {}
  registerOnChange(fn: (value: T) => void): void {}
  registerOnTouched(fn: () => void): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
```

## Required Functionality

### Value Binding

- [ ] `writeValue()` correctly updates internal state
- [ ] Change callback fires on user interaction
- [ ] Works with `FormControl`, `FormGroup`, `FormArray`

### State Management

| State    | Implementation                                                    |
| -------- | ----------------------------------------------------------------- |
| Disabled | Implement `setDisabledState()`, apply visual + functional disable |
| Touched  | Call `onTouched()` on blur/interaction                            |
| Dirty    | Automatically handled via `onChange()`                            |
| Pristine | Automatically handled by Angular                                  |

### Validation Support

- [ ] Error states visually indicated
- [ ] Support for displaying validation messages
- [ ] `aria-invalid` attribute applied when invalid

## Example Components Required

For each form control, create examples demonstrating:

1. **Basic FormControl binding**
2. **FormGroup usage**
3. **FormArray with dynamic controls**
4. **Validation with error messages**
5. **Disabled state handling**
6. **Custom validators**

```typescript
// Example structure
examples/
├── [component]-basic.component.ts
├── [component]-form-control.component.ts
├── [component]-form-group.component.ts
├── [component]-form-array.component.ts
├── [component]-validation.component.ts
└── [component]-disabled.component.ts
```
