/**
 * Toast Component Types
 */

/** Toast variant determines the icon and color */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/** Position on screen */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/** How the toast was closed */
export type ToastCloseReason = 'timeout' | 'action' | 'dismiss' | 'api';

/** Action button configuration */
export interface ToastAction {
  label: string;
  callback?: () => void;
}

/** Full toast configuration */
export interface ToastConfig {
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms, 0 = no auto-dismiss
  position?: ToastPosition;
  action?: ToastAction;
  dismissible?: boolean; // Show X button
  icon?: boolean; // Show variant icon
  id?: string; // Custom ID
}

/** Internal toast data with resolved defaults */
export interface ToastData extends Required<Omit<ToastConfig, 'action' | 'id'>> {
  id: string;
  action?: ToastAction;
}

/** Default configuration */
export const DEFAULT_TOAST_CONFIG = {
  variant: 'info' as ToastVariant,
  duration: 4000,
  position: 'bottom-right' as ToastPosition,
  dismissible: true,
  icon: true,
} as const;

/** Maximum toasts visible at once per position */
export const MAX_VISIBLE_TOASTS = 5;

/** Animation durations */
export const TOAST_ANIMATION = {
  enter: 300,
  exit: 200,
} as const;
