/**
 * Modal Component Types and Interfaces
 */

// ============================================
// Close Reason Types
// ============================================

/** How the modal was closed - provides context for handling the result */
export type ModalCloseReason = 
  | 'button'        // User clicked a button (confirm, cancel, etc.)
  | 'backdrop'      // User clicked the backdrop overlay
  | 'escape'        // User pressed Escape key
  | 'programmatic'; // Closed via code (e.g., navigation, timeout)

/** Result returned when modal closes */
export interface ModalCloseResult<R = unknown> {
  /** Data returned from the modal component */
  result?: R;
  /** How the modal was closed */
  reason: ModalCloseReason;
}

// ============================================
// Animation Types
// ============================================

/** Available animation styles for modal entry/exit */
export type ModalAnimation = 
  | 'fade'        // Simple opacity fade in/out
  | 'scale'       // Scale from 0.95 with fade (Material-style)
  | 'slide-up'    // Slide in from bottom of screen
  | 'slide-down'  // Slide in from top of screen
  | 'origin'      // Animate from trigger element position
  | 'none';       // No animation (instant)

/** Animation timing configuration */
export interface ModalAnimationConfig {
  enterDuration?: number;  // Default: 200ms
  exitDuration?: number;   // Default: 150ms
  easing?: string;         // Default: 'ease-out'
}

// ============================================
// Modal Configuration
// ============================================

/** Configuration options when opening a modal */
export interface ModalConfig<D = unknown> {
  /** Data to inject into the modal component */
  data?: D;
  
  // --- Sizing ---
  /** Width of the modal panel (e.g., '400px', '50vw', 'auto') */
  width?: string;
  /** Maximum width constraint */
  maxWidth?: string;
  /** Minimum width constraint */
  minWidth?: string;
  /** Height of the modal panel */
  height?: string;
  /** Maximum height constraint */
  maxHeight?: string;
  
  // --- Animation ---
  /** Animation type for entry/exit */
  animation?: ModalAnimation;
  /** Animation timing configuration */
  animationConfig?: ModalAnimationConfig;
  /** 
   * Origin element for 'origin' animation.
   * The modal will appear to animate from this element's position.
   */
  animationOrigin?: HTMLElement | DOMRect | 'center' | 'top' | 'bottom';
  
  // --- Behavior ---
  /** Close when clicking backdrop. Default: true */
  closeOnBackdrop?: boolean;
  /** Close when pressing Escape. Default: true */
  closeOnEscape?: boolean;
  /** Show backdrop overlay. Default: true */
  hasBackdrop?: boolean;
  
  // --- Styling ---
  /** Additional CSS class(es) for backdrop */
  backdropClass?: string | string[];
  /** Additional CSS class(es) for modal panel */
  panelClass?: string | string[];
  
  // --- Accessibility ---
  /** ARIA label for the dialog */
  ariaLabel?: string;
  /** ID of element that labels the dialog */
  ariaLabelledBy?: string;
  /** ID of element that describes the dialog */
  ariaDescribedBy?: string;
  /** 
   * Focus behavior on open.
   * - true/'first-tabbable': Focus first tabbable element
   * - 'dialog': Focus the dialog container
   * - false: Don't auto-focus
   */
  autoFocus?: boolean | 'first-tabbable' | 'dialog';
  /** Restore focus to trigger element on close. Default: true */
  restoreFocus?: boolean;
  
  // --- Advanced ---
  /** Role for the dialog. Default: 'dialog' */
  role?: 'dialog' | 'alertdialog';
  /** Custom z-index (for stacking control) */
  zIndex?: number;
}

/** Default configuration values */
export const DEFAULT_MODAL_CONFIG: Partial<ModalConfig> = {
  animation: 'scale',
  closeOnBackdrop: true,
  closeOnEscape: true,
  hasBackdrop: true,
  autoFocus: 'first-tabbable',
  restoreFocus: true,
  role: 'dialog',
  width: '500px',
  maxWidth: '90vw',
  maxHeight: '90vh',
};

// ============================================
// Modal Stack Management
// ============================================

/** Internal state for managing stacked modals */
export interface ModalStackItem {
  id: string;
  zIndex: number;
  previousActiveElement: Element | null;
}

/** Z-index base for modal layering */
export const MODAL_Z_INDEX_BASE = 1000;
export const MODAL_Z_INDEX_INCREMENT = 10;

// ============================================
// Animation Origin Utilities
// ============================================

/** Calculated origin position for animation */
export interface AnimationOriginPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculate animation origin from various input types
 */
export function getAnimationOrigin(
  origin: ModalConfig['animationOrigin'],
  viewportWidth: number,
  viewportHeight: number
): AnimationOriginPosition {
  if (!origin || origin === 'center') {
    return {
      x: viewportWidth / 2,
      y: viewportHeight / 2,
      width: 0,
      height: 0,
    };
  }
  
  if (origin === 'top') {
    return {
      x: viewportWidth / 2,
      y: 0,
      width: 0,
      height: 0,
    };
  }
  
  if (origin === 'bottom') {
    return {
      x: viewportWidth / 2,
      y: viewportHeight,
      width: 0,
      height: 0,
    };
  }
  
  // HTMLElement
  if (origin instanceof HTMLElement) {
    const rect = origin.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    };
  }
  
  // DOMRect
  if ('x' in origin && 'y' in origin) {
    return {
      x: origin.x + origin.width / 2,
      y: origin.y + origin.height / 2,
      width: origin.width,
      height: origin.height,
    };
  }
  
  // Fallback to center
  return {
    x: viewportWidth / 2,
    y: viewportHeight / 2,
    width: 0,
    height: 0,
  };
}
