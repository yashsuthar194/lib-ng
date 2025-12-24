/**
 * Toast Component Public API
 */

// Service
export { ToastService } from './services/toast.service';

// Classes
export { ToastRef } from './classes/toast-ref';

// Types
export type {
  ToastVariant,
  ToastPosition,
  ToastCloseReason,
  ToastAction,
  ToastConfig,
} from './types/toast.types';

export { DEFAULT_TOAST_CONFIG } from './types/toast.types';
