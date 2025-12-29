import {
  Directive,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive that emits an event when a click occurs outside the host element.
 *
 * Useful for dropdowns, modals, popovers, tooltips, etc.
 *
 * @example
 * ```html
 * <div class="dropdown"
 *      (libClickOutside)="closeDropdown()"
 *      [libClickOutsideEnabled]="isOpen">
 *   ...
 * </div>
 * ```
 */
@Directive({
  selector: '[libClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  /** Whether the directive is active. Default: true */
  readonly enabled = input(true, { alias: 'libClickOutsideEnabled' });

  /** Delay before starting to listen (prevents immediate triggering). Default: 0ms */
  readonly delay = input(0, { alias: 'libClickOutsideDelay' });

  /** Selector for elements that should be ignored (not trigger outside click) */
  readonly ignore = input<string>('', { alias: 'libClickOutsideIgnore' });

  /** Emits when a click outside is detected */
  readonly libClickOutside = output<MouseEvent>();

  private listener: ((event: MouseEvent) => void) | null = null;
  private isInitialized = false;
  private initTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay initialization to prevent immediate triggering
      this.initTimeout = setTimeout(() => {
        this.initListener();
      }, this.delay());
    }
  }

  private initListener(): void {
    if (this.isInitialized) return;

    this.listener = (event: MouseEvent) => {
      if (!this.enabled()) return;

      const target = event.target as Node;
      const hostElement = this.elementRef.nativeElement;

      // Check if click is inside the host element
      if (hostElement.contains(target)) {
        return;
      }

      // Check if click is on an ignored element
      const ignoreSelector = this.ignore();
      if (ignoreSelector && target instanceof Element) {
        if (target.matches(ignoreSelector) || target.closest(ignoreSelector)) {
          return;
        }
      }

      // Run outside Angular zone for performance, then emit inside zone
      this.ngZone.run(() => {
        this.libClickOutside.emit(event);
      });
    };

    // Listen outside Angular zone to avoid unnecessary change detection
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('click', this.listener!, { capture: true });
    });

    this.isInitialized = true;
  }

  ngOnDestroy(): void {
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }

    if (this.listener) {
      document.removeEventListener('click', this.listener, { capture: true });
      this.listener = null;
    }
  }
}
