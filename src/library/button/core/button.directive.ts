/**
 * Button Directive - Enhances native button elements with styling and interactions
 *
 * @description
 * Applies to native <button> or <a> elements to provide consistent styling,
 * variants, loading states, and optional ripple animation.
 *
 * @example
 * ```html
 * <!-- Primary button (default) -->
 * <button libButton>Save</button>
 *
 * <!-- Secondary outline -->
 * <button libButton variant="outline" size="lg">Cancel</button>
 *
 * <!-- With loading state -->
 * <button libButton [loading]="isSaving" loadingMode="inline">
 *   {{ isSaving ? 'Saving...' : 'Save' }}
 * </button>
 *
 * <!-- Danger button with ripple -->
 * <button libButton variant="danger" [ripple]="true">Delete</button>
 *
 * <!-- Full width -->
 * <button libButton [fullWidth]="true">Submit</button>
 * ```
 */

import {
  Directive,
  ElementRef,
  inject,
  input,
  output,
  computed,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  NgZone,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ButtonVariant,
  ButtonSize,
  LoadingMode,
  DEFAULT_BUTTON_CONFIG,
} from '../types/button.types';

@Directive({
  selector: 'button[libButton], a[libButton]',
  standalone: true,
  exportAs: 'libButton',
  host: {
    class: 'lib-button',
    // Variant classes
    '[class.lib-button--primary]': 'variant() === "primary"',
    '[class.lib-button--secondary]': 'variant() === "secondary"',
    '[class.lib-button--outline]': 'variant() === "outline"',
    '[class.lib-button--ghost]': 'variant() === "ghost"',
    '[class.lib-button--link]': 'variant() === "link"',
    '[class.lib-button--danger]': 'variant() === "danger"',
    '[class.lib-button--success]': 'variant() === "success"',
    // Size classes
    '[class.lib-button--sm]': 'size() === "sm"',
    '[class.lib-button--md]': 'size() === "md"',
    '[class.lib-button--lg]': 'size() === "lg"',
    // State classes
    '[class.lib-button--loading]': 'loading()',
    '[class.lib-button--loading-replace]': 'loading() && loadingMode() === "replace"',
    '[class.lib-button--loading-inline]': 'loading() && loadingMode() === "inline"',
    '[class.lib-button--full-width]': 'fullWidth()',
    '[class.lib-button--icon-only]': 'iconOnly()',
    '[class.lib-button--disabled]': 'isDisabled()',
    // Attributes
    '[attr.disabled]': 'isDisabled() ? true : null',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    // Tab index for anchor elements
    '[attr.tabindex]': 'isDisabled() && isAnchor() ? -1 : null',
  },
})
export class ButtonDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement | HTMLAnchorElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);

  // ============================================
  // Inputs
  // ============================================

  /** Visual variant of the button */
  readonly variant = input<ButtonVariant>(DEFAULT_BUTTON_CONFIG.variant);

  /** Size of the button */
  readonly size = input<ButtonSize>(DEFAULT_BUTTON_CONFIG.size);

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(DEFAULT_BUTTON_CONFIG.disabled);

  /** Whether the button is in loading state */
  readonly loading = input<boolean>(DEFAULT_BUTTON_CONFIG.loading);

  /** Loading indicator mode: 'replace' or 'inline' */
  readonly loadingMode = input<LoadingMode>(DEFAULT_BUTTON_CONFIG.loadingMode);

  /** Enable ripple click effect (opt-in) */
  readonly ripple = input<boolean>(DEFAULT_BUTTON_CONFIG.ripple);

  /** Full width button */
  readonly fullWidth = input<boolean>(DEFAULT_BUTTON_CONFIG.fullWidth);

  /** Icon-only button (circular) */
  readonly iconOnly = input<boolean>(DEFAULT_BUTTON_CONFIG.iconOnly);

  // ============================================
  // Outputs
  // ============================================

  /**
   * Click event (only fires when not disabled/loading)
   * Useful for preventing double-submits
   */
  readonly clicked = output<MouseEvent>();

  // ============================================
  // Computed
  // ============================================

  /** Whether button is disabled (disabled input OR loading) */
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  /** Whether the host element is an anchor tag */
  readonly isAnchor = computed(() => this.elementRef.nativeElement.tagName.toLowerCase() === 'a');

  // ============================================
  // Internal State
  // ============================================

  /** Track ripple elements and their cleanup timeouts */
  private readonly rippleCleanups: Array<{ element: HTMLElement; timeoutId: number | undefined }> =
    [];

  // ============================================
  // Lifecycle Hooks
  // ============================================

  ngOnDestroy(): void {
    // Cleanup ripple elements and cancel pending timeouts to prevent memory leaks
    this.rippleCleanups.forEach(({ element, timeoutId }) => {
      clearTimeout(timeoutId);
      element.remove();
    });
    this.rippleCleanups.length = 0;
  }

  // ============================================
  // Host Listeners
  // ============================================

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent | Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create ripple effect if enabled
    if (this.ripple()) {
      this.createRipple(event as MouseEvent);
    }

    this.clicked.emit(event as MouseEvent);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent | Event): void {
    // For anchor elements, handle Enter/Space like a button
    if (
      (this.isAnchor() && (event as KeyboardEvent).key === 'Enter') ||
      (event as KeyboardEvent).key === ' '
    ) {
      if (this.isDisabled()) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  // ============================================
  // Public Methods
  // ============================================

  /** Focus the button programmatically */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /** Blur the button programmatically */
  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  /** Get native element reference */
  get nativeElement(): HTMLButtonElement | HTMLAnchorElement {
    return this.elementRef.nativeElement;
  }

  // ============================================
  // Private Methods
  // ============================================

  /**
   * Creates a ripple effect at the click position
   * Properly tracks timeouts and elements for cleanup on destroy
   */
  private createRipple(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      const button = this.elementRef.nativeElement;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      // Create ripple element
      const ripple = this.renderer.createElement('span') as HTMLElement;
      this.renderer.addClass(ripple, 'lib-button__ripple');
      this.renderer.setStyle(ripple, 'width', `${size}px`);
      this.renderer.setStyle(ripple, 'height', `${size}px`);
      this.renderer.setStyle(ripple, 'left', `${x}px`);
      this.renderer.setStyle(ripple, 'top', `${y}px`);

      this.renderer.appendChild(button, ripple);

      // Track ripple with its cleanup timeout to prevent memory leaks
      const cleanupEntry: { element: HTMLElement; timeoutId: number | undefined } = {
        element: ripple,
        timeoutId: undefined,
      };

      cleanupEntry.timeoutId = window.setTimeout(() => {
        ripple.remove();
        // Remove from tracking array
        const index = this.rippleCleanups.indexOf(cleanupEntry);
        if (index > -1) {
          this.rippleCleanups.splice(index, 1);
        }
      }, 600);

      this.rippleCleanups.push(cleanupEntry);
    });
  }
}
