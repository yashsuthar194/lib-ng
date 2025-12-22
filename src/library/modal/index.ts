/**
 * Modal Component Public API
 */

// Service
export { ModalService } from './services/modal.service';

// Classes
export { ModalRef } from './classes/modal-ref';

// Tokens
export { MODAL_REF, MODAL_DATA } from './tokens/modal-tokens';

// Types
export type {
  ModalCloseReason,
  ModalCloseResult,
  ModalAnimation,
  ModalAnimationConfig,
  ModalConfig,
  AnimationOriginPosition,
} from './types/modal.types';

export { 
  DEFAULT_MODAL_CONFIG,
  getAnimationOrigin,
} from './types/modal.types';
