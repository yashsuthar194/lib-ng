/**
 * Tooltip Directive
 * 
 * Attaches tooltip behavior to any element.
 * 
 * @example
 * <button libTooltip="Save changes">Save</button>
 * <button libTooltip="Settings" libTooltipPosition="right">⚙️</button>
 */

import {
  Directive,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
  effect,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TooltipComponent } from '../components/tooltip.component';
import { calculateTooltipPosition } from '../utils/tooltip-position';
import type { 
  TooltipPosition, 
  TooltipVariant, 
  TooltipContent 
} from '../types/tooltip.types';
import { 
  DEFAULT_TOOLTIP_CONFIG, 
  TOOLTIP_ANIMATION 
} from '../types/tooltip.types';

let tooltipIdCounter = 0;

@Directive({
  selector: '[libTooltip]',
  standalone: true,
  exportAs: 'libTooltip',
  host: {
    '[attr.aria-describedby]': 'isVisible() ? tooltipId : null',
  },
})
export class TooltipDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  // ========================================
  // Inputs
  // ========================================
  
  /** Tooltip content (string or template) */
  readonly libTooltip = input.required<TooltipContent>();
  
  /** Position preference */
  readonly libTooltipPosition = input<TooltipPosition>(DEFAULT_TOOLTIP_CONFIG.position);
  
  /** Variant styling */
  readonly libTooltipVariant = input<TooltipVariant>(DEFAULT_TOOLTIP_CONFIG.variant);
  
  /** Show delay in ms */
  readonly libTooltipShowDelay = input<number>(DEFAULT_TOOLTIP_CONFIG.showDelay);
  
  /** Hide delay in ms */
  readonly libTooltipHideDelay = input<number>(DEFAULT_TOOLTIP_CONFIG.hideDelay);
  
  /** Show arrow */
  readonly libTooltipShowArrow = input<boolean>(DEFAULT_TOOLTIP_CONFIG.showArrow);
  
  /** Offset from element */
  readonly libTooltipOffset = input<number>(DEFAULT_TOOLTIP_CONFIG.offset);
  
  /** Disabled state */
  readonly libTooltipDisabled = input<boolean>(false);

  // ========================================
  // State
  // ========================================
  
  /** Unique ID for accessibility */
  readonly tooltipId = `lib-tooltip-${++tooltipIdCounter}`;
  
  /** Visibility state */
  readonly isVisible = signal(false);
  
  /** Component reference */
  private componentRef: ComponentRef<TooltipComponent> | null = null;
  
  /** Timers */
  private showTimeoutId?: ReturnType<typeof setTimeout>;
  private hideTimeoutId?: ReturnType<typeof setTimeout>;
  
  /** Track if already destroyed */
  private isDestroyed = false;

  // ========================================
  // Event Handlers
  // ========================================

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.libTooltipDisabled()) return;
    this.scheduleShow();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.scheduleHide();
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.libTooltipDisabled()) return;
    this.scheduleShow();
  }

  @HostListener('blur')
  onBlur(): void {
    this.scheduleHide();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isVisible()) {
      this.hide();
    }
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Show tooltip programmatically */
  show(): void {
    if (this.libTooltipDisabled() || this.isDestroyed) return;
    this.clearTimers();
    this.createTooltip();
  }

  /** Hide tooltip programmatically */
  hide(): void {
    this.clearTimers();
    this.destroyTooltip();
  }

  /** Toggle visibility */
  toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  // ========================================
  // Private Methods
  // ========================================

  private scheduleShow(): void {
    this.clearTimers();
    
    const delay = this.libTooltipShowDelay();
    if (delay > 0) {
      this.showTimeoutId = setTimeout(() => this.createTooltip(), delay);
    } else {
      this.createTooltip();
    }
  }

  private scheduleHide(): void {
    this.clearTimers();
    
    const delay = this.libTooltipHideDelay();
    if (delay > 0) {
      this.hideTimeoutId = setTimeout(() => this.destroyTooltip(), delay);
    } else {
      this.destroyTooltip();
    }
  }

  private createTooltip(): void {
    if (!isPlatformBrowser(this.platformId) || this.componentRef || this.isDestroyed) {
      return;
    }

    // Create component
    this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
    
    // Move to body for proper positioning
    const element = this.componentRef.location.nativeElement;
    this.renderer.appendChild(this.document.body, element);
    
    // Set initial inputs
    this.updateTooltipInputs();
    
    // Update visibility after a frame (for animation)
    requestAnimationFrame(() => {
      if (this.componentRef && !this.isDestroyed) {
        // Calculate position now that element is in DOM
        this.updatePosition();
        this.componentRef.setInput('isVisible', true);
        this.isVisible.set(true);
      }
    });
  }

  private updateTooltipInputs(): void {
    if (!this.componentRef) return;
    
    this.componentRef.setInput('id', this.tooltipId);
    this.componentRef.setInput('content', this.libTooltip());
    this.componentRef.setInput('variant', this.libTooltipVariant());
    this.componentRef.setInput('showArrow', this.libTooltipShowArrow());
    this.componentRef.setInput('isVisible', false);
  }

  private updatePosition(): void {
    if (!this.componentRef || !isPlatformBrowser(this.platformId)) return;
    
    const triggerEl = this.elementRef.nativeElement;
    const tooltipEl = this.componentRef.location.nativeElement;
    
    const result = calculateTooltipPosition(
      triggerEl,
      tooltipEl,
      this.libTooltipPosition(),
      this.libTooltipOffset()
    );
    
    this.componentRef.setInput('x', result.x);
    this.componentRef.setInput('y', result.y);
    this.componentRef.setInput('position', result.actualPosition);
    
    if (result.arrowX !== undefined) {
      this.componentRef.setInput('arrowX', result.arrowX);
    }
    if (result.arrowY !== undefined) {
      this.componentRef.setInput('arrowY', result.arrowY);
    }
  }

  private destroyTooltip(): void {
    if (!this.componentRef) return;
    
    // Trigger exit animation
    this.componentRef.setInput('isVisible', false);
    this.isVisible.set(false);
    
    // Destroy after animation
    const ref = this.componentRef;
    this.componentRef = null;
    
    setTimeout(() => {
      if (!this.isDestroyed) {
        ref.destroy();
      }
    }, TOOLTIP_ANIMATION.duration);
  }

  private clearTimers(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = undefined;
    }
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.clearTimers();
    
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
