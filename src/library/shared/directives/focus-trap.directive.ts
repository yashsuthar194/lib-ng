import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  input,
  PLATFORM_ID,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Selector for focusable elements */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

/**
 * Directive that traps focus within the host element.
 * Essential for accessible modals, dialogs, and overlays.
 * 
 * @example
 * ```html
 * <div class="modal" libFocusTrap [libFocusTrapAutoFocus]="true">
 *   <button>First focusable</button>
 *   <input type="text" />
 *   <button>Last focusable</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[libFocusTrap]',
  standalone: true,
})
export class FocusTrapDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  /** Whether focus trap is active. Default: true */
  readonly enabled = input(true, { alias: 'libFocusTrapEnabled' });
  
  /** Auto-focus first element on init. Default: true */
  readonly autoFocus = input<boolean | 'first-tabbable' | 'dialog'>(true, { 
    alias: 'libFocusTrapAutoFocus' 
  });
  
  /** Element to focus on init (if autoFocus is true) */
  readonly initialFocus = input<HTMLElement | string | null>(null, { 
    alias: 'libFocusTrapInitialFocus' 
  });

  private keydownListener: ((event: KeyboardEvent) => void) | null = null;
  private previousActiveElement: Element | null = null;

  constructor() {
    // Store the previously focused element for restoration
    if (isPlatformBrowser(this.platformId)) {
      this.previousActiveElement = document.activeElement;
    }
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.setupKeydownListener();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Auto-focus after the view is initialized
    if (this.autoFocus()) {
      // Small delay to ensure content is rendered
      setTimeout(() => this.focusInitialElement(), 0);
    }
  }

  ngOnDestroy(): void {
    this.removeKeydownListener();
    
    // Restore focus to the previously active element
    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Get all focusable elements within the trap.
   */
  getFocusableElements(): HTMLElement[] {
    const host = this.elementRef.nativeElement;
    const nodeList = host.querySelectorAll(FOCUSABLE_SELECTOR);
    const elements = Array.from(nodeList) as HTMLElement[];
    
    // Filter out elements that are not visible or are inside hidden containers
    return elements.filter((el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        el.offsetParent !== null
      );
    });
  }

  /**
   * Focus the first focusable element.
   */
  focusFirst(): void {
    const elements = this.getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }

  /**
   * Focus the last focusable element.
   */
  focusLast(): void {
    const elements = this.getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }

  /**
   * Focus the initial element based on configuration.
   */
  private focusInitialElement(): void {
    const host = this.elementRef.nativeElement;
    const autoFocusValue = this.autoFocus();
    const initialFocusValue = this.initialFocus();
    
    // Check for specific initial focus element
    if (initialFocusValue) {
      let elementToFocus: HTMLElement | null = null;
      
      if (typeof initialFocusValue === 'string') {
        elementToFocus = host.querySelector(initialFocusValue) as HTMLElement | null;
      } else if (initialFocusValue instanceof HTMLElement) {
        elementToFocus = initialFocusValue;
      }
      
      if (elementToFocus) {
        elementToFocus.focus();
        return;
      }
    }
    
    // Auto-focus based on mode
    if (autoFocusValue === 'dialog') {
      // Focus the dialog container itself
      host.setAttribute('tabindex', '-1');
      host.focus();
    } else {
      // Focus first tabbable element
      this.focusFirst();
    }
  }

  private setupKeydownListener(): void {
    this.keydownListener = (event: KeyboardEvent) => {
      if (!this.enabled()) return;
      if (event.key !== 'Tab') return;

      const focusableElements = this.getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        // Shift + Tab: Going backwards
        if (activeElement === firstElement || !this.elementRef.nativeElement.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: Going forwards
        if (activeElement === lastElement || !this.elementRef.nativeElement.contains(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Listen outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('keydown', this.keydownListener!);
    });
  }

  private removeKeydownListener(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = null;
    }
  }
}
