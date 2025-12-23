import {
  Component,
  input,
  output,
  signal,
  computed,
  contentChildren,
  effect,
  forwardRef,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  AfterContentInit,
  OnDestroy,
  HostListener,
  model,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { OptionComponent } from '../option/option.component';
import { OptionGroupComponent } from '../option-group/option-group.component';
import { DEFAULT_SELECT_CONFIG } from '../types/select.types';

/**
 * A flexible select component with search, multi-select, and custom templates.
 * 
 * Uses directive-based options for maximum flexibility and performance.
 * Fully integrated with Angular Reactive Forms via ControlValueAccessor.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-select [(value)]="selectedCountry" placeholder="Select country">
 *   <lib-option value="us">United States</lib-option>
 *   <lib-option value="uk">United Kingdom</lib-option>
 * </lib-select>
 * 
 * <!-- With search and multi-select -->
 * <lib-select [(value)]="selectedTags" [multiple]="true" [searchable]="true">
 *   @for (tag of tags; track tag.id) {
 *     <lib-option [value]="tag.id">{{ tag.name }}</lib-option>
 *   }
 * </lib-select>
 * ```
 */
@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  host: {
    '[class.lib-select]': 'true',
    '[class.lib-select--open]': 'isOpen()',
    '[class.lib-select--disabled]': 'disabled()',
    '[class.lib-select--loading]': 'loading()',
    '[class.lib-select--multiple]': 'multiple()',
    '[class.lib-select--searchable]': 'searchable()',
    '[class.lib-select--invalid]': 'isInvalid()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class SelectComponent<T = unknown>
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // ============================================
  // Inputs
  // ============================================

  /** Placeholder text when no value selected */
  readonly placeholder = input(DEFAULT_SELECT_CONFIG.placeholder!);

  /** Search input placeholder */
  readonly searchPlaceholder = input(DEFAULT_SELECT_CONFIG.searchPlaceholder!);

  /** Enable multi-select mode */
  readonly multiple = input(false);

  /** Enable search/filter functionality */
  readonly searchable = input(false);

  /** Disable the select */
  readonly disabled = input(false);

  /** Show clear button */
  readonly clearable = input(DEFAULT_SELECT_CONFIG.clearable!);

  /** Maximum selections in multi-select mode */
  readonly maxSelections = input(Infinity);

  /** Show loading spinner */
  readonly loading = input(false);

  /** Custom comparison function */
  readonly compareWith = input<(a: T, b: T) => boolean>((a, b) => a === b);

  // ============================================
  // Outputs
  // ============================================

  /** Emits when value changes */
  readonly valueChange = output<T | T[] | null>();

  /** Emits when search query changes */
  readonly searchChange = output<string>();

  /** Emits when dropdown opens */
  readonly opened = output<void>();

  /** Emits when dropdown closes */
  readonly closed = output<void>();

  // ============================================
  // Content Queries
  // ============================================

  /** All option components (direct children) */
  readonly options = contentChildren(OptionComponent, { descendants: true });

  /** All option group components */
  readonly optionGroups = contentChildren(OptionGroupComponent);

  // ============================================
  // State Signals
  // ============================================

  /** Whether dropdown is open */
  readonly isOpen = signal(false);

  /** Current search query */
  readonly searchQuery = signal('');

  /** Currently focused option index (keyboard navigation) */
  readonly focusedIndex = signal(-1);

  /** Selected value(s) - supports two-way binding */
  readonly value = model<T | T[] | null>(null);

  /** Whether component has been touched */
  private readonly _touched = signal(false);

  /** Whether component is in invalid state (from form control) */
  readonly isInvalid = signal(false);

  /** Whether content has been initialized (for effect guards) */
  private readonly _contentInitialized = signal(false);

  // ============================================
  // Computed Values
  // ============================================

  /** Filtered options based on search query */
  readonly filteredOptions = computed(() => {
    const query = this.searchQuery();
    const allOptions = this.options();
    if (!query) return allOptions;
    return allOptions.filter(opt => opt.matchesSearch(query));
  });

  /** Count of visible options (for showing "no results" message) */
  readonly visibleOptionsCount = computed(() => {
    return this.filteredOptions().length;
  });

  /** Whether any value is selected */
  readonly hasValue = computed(() => {
    const val = this.value();
    if (this.multiple()) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined;
  });

  /** Display label for the trigger button */
  readonly displayLabel = computed(() => {
    const val = this.value();
    if (!this.hasValue()) return '';

    const allOptions = this.options();

    if (this.multiple() && Array.isArray(val)) {
      return val
        .map(v => this.findOptionByValue(v as T, allOptions)?.getLabel() || String(v))
        .join(', ');
    }

    return this.findOptionByValue(val as T, allOptions)?.getLabel() || String(val);
  });

  /** Selected values as array (for multi-select chips) */
  readonly selectedValues = computed((): T[] => {
    const val = this.value();
    if (this.multiple() && Array.isArray(val)) {
      return val as T[];
    }
    return val !== null && val !== undefined ? [val as T] : [];
  });

  /** Can add more selections (multi-select limit) */
  readonly canAddMore = computed(() => {
    if (!this.multiple()) return true;
    const current = this.selectedValues().length;
    return current < this.maxSelections();
  });

  // ============================================
  // ControlValueAccessor
  // ============================================

  private onChange: (value: T | T[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | T[] | null): void {
    this.value.set(value);
    this.updateOptionStates();
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled via disabled() input signal
  }

  // ============================================
  // Lifecycle
  // ============================================

  constructor() {
    // Sync option selection states when value changes
    effect(() => {
      // Guard: only run after content is initialized
      if (!this._contentInitialized()) return;
      this.updateOptionStates();
    });

    // Update option visibility based on search query
    effect(() => {
      // Guard: only run after content is initialized
      if (!this._contentInitialized()) return;
      
      const query = this.searchQuery();
      const allOptions = this.options();
      
      // Use signal-based visibility (no direct DOM manipulation)
      allOptions.forEach(option => {
        const matches = option.matchesSearch(query);
        option.hidden.set(!matches);
      });
    });
  }

  ngAfterContentInit(): void {
    this._contentInitialized.set(true);
    this.setupOptionListeners();
    this.updateOptionStates();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // ============================================
  // Public Methods
  // ============================================

  /** Open the dropdown */
  open(): void {
    if (this.disabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.focusedIndex.set(0);
    this.opened.emit();
  }

  /** Close the dropdown */
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.focusedIndex.set(-1);
    this.markAsTouched();
    this.closed.emit();
  }

  /** Toggle dropdown */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Clear the selection */
  clear(event?: Event): void {
    event?.stopPropagation();
    const newValue = this.multiple() ? [] : null;
    this.setValue(newValue);
  }

  /** Remove a specific value (multi-select) */
  removeValue(valueToRemove: T, event?: Event): void {
    event?.stopPropagation();
    if (!this.multiple()) return;

    const current = this.value() as T[];
    const compareFn = this.compareWith();
    const newValue = current.filter(v => !compareFn(v, valueToRemove));
    this.setValue(newValue);
  }

  // ============================================
  // Event Handlers
  // ============================================

  onTriggerClick(): void {
    if (!this.disabled()) {
      this.toggle();
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.searchChange.emit(input.value);
    this.focusedIndex.set(0);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  /** Clear focused state when mouse leaves the dropdown panel */
  onPanelMouseLeave(): void {
    this.focusedIndex.set(-1);
    this.updateOptionStates();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    // Don't handle keyboard when search input is focused (except navigation keys)
    const isSearchFocused = (event.target as HTMLElement)?.classList?.contains('lib-select__search-input');

    switch (event.key) {
      case 'Enter':
        // Only select on Enter, not on space (space should type in search)
        if (!this.isOpen()) {
          event.preventDefault();
          this.open();
        } else if (this.focusedIndex() >= 0 && !isSearchFocused) {
          event.preventDefault();
          this.selectFocusedOption();
        }
        break;

      case ' ':
        // Space should only toggle when not searching
        if (!this.isOpen()) {
          event.preventDefault();
          this.open();
        }
        // Don't prevent default when search is focused - allow typing space
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.focusNext();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.focusPrevious();
        }
        break;

      case 'Home':
        if (this.isOpen() && !isSearchFocused) {
          event.preventDefault();
          this.focusedIndex.set(0);
        }
        break;

      case 'End':
        if (this.isOpen() && !isSearchFocused) {
          event.preventDefault();
          this.focusedIndex.set(this.filteredOptions().length - 1);
        }
        break;
    }
  }

  // ============================================
  // Internal Methods
  // ============================================

  private setupOptionListeners(): void {
    // Subscribe to option selection events
    this.options().forEach((option, index) => {
      option.select.subscribe(value => this.selectOption(value));
      option.focus.subscribe(() => this.focusedIndex.set(index));
    });
  }

  private selectOption(value: T): void {
    if (this.multiple()) {
      const current = (this.value() as T[]) || [];
      const compareFn = this.compareWith();
      const exists = current.some(v => compareFn(v, value));

      if (exists) {
        // Remove if already selected
        const newValue = current.filter(v => !compareFn(v, value));
        this.setValue(newValue);
      } else if (this.canAddMore()) {
        // Add if under limit
        this.setValue([...current, value]);
      }
    } else {
      this.setValue(value);
      this.close();
    }
  }

  private setValue(value: T | T[] | null): void {
    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
    this.updateOptionStates();
  }

  private updateOptionStates(): void {
    const currentValue = this.value();
    const compareFn = this.compareWith();

    this.options().forEach((option, index) => {
      const optValue = option.value();
      let isSelected = false;

      // Skip options with null values (not yet initialized)
      if (optValue === null) {
        option.selected.set(false);
        option.focused.set(this.focusedIndex() === index);
        return;
      }

      if (this.multiple() && Array.isArray(currentValue)) {
        isSelected = currentValue.some(v => compareFn(v, optValue as T));
      } else if (currentValue !== null && currentValue !== undefined) {
        isSelected = compareFn(currentValue as T, optValue as T);
      }

      option.selected.set(isSelected);
      option.focused.set(this.focusedIndex() === index);
    });
  }

  private findOptionByValue(
    value: T,
    options: readonly OptionComponent<T>[]
  ): OptionComponent<T> | undefined {
    const compareFn = this.compareWith();
    return options.find(opt => {
      const optValue = opt.value();
      return optValue !== null && compareFn(optValue as T, value);
    });
  }

  private focusNext(): void {
    const filtered = this.filteredOptions();
    const current = this.focusedIndex();
    const next = Math.min(current + 1, filtered.length - 1);
    this.focusedIndex.set(next);
    filtered[next]?.scrollIntoView();
  }

  private focusPrevious(): void {
    const current = this.focusedIndex();
    const prev = Math.max(current - 1, 0);
    this.focusedIndex.set(prev);
    this.filteredOptions()[prev]?.scrollIntoView();
  }

  private selectFocusedOption(): void {
    const focused = this.filteredOptions()[this.focusedIndex()];
    if (focused && !focused.disabled()) {
      this.selectOption(focused.value());
    }
  }

  private markAsTouched(): void {
    if (!this._touched()) {
      this._touched.set(true);
      this.onTouched();
    }
  }

  /** Get label for a chip (multi-select) */
  getChipLabel(value: T): string {
    return this.findOptionByValue(value, this.options())?.getLabel() || String(value);
  }

  /** Track function for chips */
  trackByValue = (index: number, value: T) => value;
}
