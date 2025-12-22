import {
  Component,
  input,
  output,
  signal,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Individual option within a lib-select.
 * 
 * Can contain plain text or custom template content.
 * 
 * @example
 * ```html
 * <!-- Simple text -->
 * <lib-option value="us">United States</lib-option>
 * 
 * <!-- Custom template -->
 * <lib-option [value]="user.id">
 *   <img [src]="user.avatar" />
 *   {{ user.name }}
 * </lib-option>
 * ```
 */
@Component({
  selector: 'lib-option',
  standalone: true,
  template: `
    <ng-content />
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: var(--lib-spacing-3);
      padding: var(--lib-spacing-3) var(--lib-spacing-4);
      border-radius: var(--lib-border-radius-base);
      cursor: pointer;
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-700);
      transition: background var(--lib-transition-fast), color var(--lib-transition-fast);
      min-height: 40px;
      box-sizing: border-box;
    }
    
    :host(:hover),
    :host(.lib-option--focused) {
      background: var(--lib-color-neutral-100);
      color: var(--lib-color-neutral-900);
    }
    
    :host(.lib-option--selected) {
      background: var(--lib-color-primary-50);
      color: var(--lib-color-primary-700);
      font-weight: var(--lib-font-weight-medium);
      position: relative;
      padding-inline-end: calc(var(--lib-spacing-4) + 20px);
    }
    
    :host(.lib-option--selected)::after {
      content: '';
      position: absolute;
      right: var(--lib-spacing-4);
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: var(--lib-color-primary-500);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }
    
    :host(.lib-option--disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    :host(.lib-option--hidden) {
      display: none !important;
    }
    
    /* Dark theme */
    :host-context([data-theme-mode="dark"]) {
      color: var(--lib-color-neutral-300);
    }
    
    :host-context([data-theme-mode="dark"]):hover,
    :host-context([data-theme-mode="dark"]).lib-option--focused {
      background: var(--lib-color-neutral-800);
      color: var(--lib-color-neutral-100);
    }
    
    :host-context([data-theme-mode="dark"]).lib-option--selected {
      background: color-mix(in srgb, var(--lib-color-primary-500) 15%, var(--lib-color-neutral-900));
      color: var(--lib-color-primary-300);
    }
    
    :host-context([data-theme-mode="dark"]).lib-option--selected::after {
      background: var(--lib-color-primary-400);
    }
    
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-focused]': 'focused()',
    '[attr.data-selected]': 'selected()',
    '[attr.data-disabled]': 'disabled()',
    '[class.lib-option]': 'true',
    '[class.lib-option--selected]': 'selected()',
    '[class.lib-option--focused]': 'focused()',
    '[class.lib-option--disabled]': 'disabled()',
    '[class.lib-option--hidden]': 'hidden()',
    '(click)': 'onSelect()',
    '(mouseenter)': 'onMouseEnter()',
  }
})
export class OptionComponent<T = unknown> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** The value of this option (null if not set) */
  readonly value = input<T | null>(null);

  /** Whether this option is disabled */
  readonly disabled = input(false);

  /** 
   * Custom search terms for this option.
   * Used when filtering with search.
   * Falls back to text content if not provided.
   */
  readonly searchTerms = input<string[]>([]);

  /** Internal: Whether this option is currently selected */
  readonly selected = signal(false);

  /** Internal: Whether this option is currently focused via keyboard */
  readonly focused = signal(false);

  /** Internal: Whether this option is hidden by search filter */
  readonly hidden = signal(false);

  /** Emits when option is selected */
  readonly select = output<T>();

  /** Emits when option receives focus (keyboard/mouse) */
  readonly focus = output<void>();

  /**
   * Get the text content of this option for search/display.
   */
  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() || '';
  }

  /**
   * Get searchable terms for filtering.
   * Returns custom searchTerms if provided, otherwise uses label.
   */
  getSearchTerms(): string[] {
    const custom = this.searchTerms();
    if (custom.length > 0) return custom;
    return [this.getLabel()];
  }

  /**
   * Check if this option matches the search query.
   */
  matchesSearch(query: string): boolean {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return this.getSearchTerms().some(term => 
      term.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Scroll this option into view.
   */
  scrollIntoView(): void {
    this.elementRef.nativeElement.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }

  /** @internal */
  onSelect(): void {
    const val = this.value();
    if (!this.disabled() && val !== null) {
      this.select.emit(val);
    }
  }

  /** @internal */
  onMouseEnter(): void {
    if (!this.disabled()) {
      this.focus.emit();
    }
  }
}
