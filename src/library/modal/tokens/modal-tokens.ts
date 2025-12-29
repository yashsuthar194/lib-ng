import { InjectionToken } from '@angular/core';
import type { ModalRef } from '../classes/modal-ref';

/**
 * Injection token for accessing the ModalRef in modal content components.
 *
 * Usage:
 * ```typescript
 * export class MyDialogComponent {
 *   private readonly modalRef = inject(MODAL_REF);
 *
 *   close() {
 *     this.modalRef.close({ saved: true });
 *   }
 * }
 * ```
 */
export const MODAL_REF = new InjectionToken<ModalRef<unknown, unknown>>('MODAL_REF');

/**
 * Injection token for modal data.
 * Alternative to accessing data via modalRef.data
 *
 * Usage:
 * ```typescript
 * export class MyDialogComponent {
 *   readonly data = inject(MODAL_DATA);
 * }
 * ```
 */
export const MODAL_DATA = new InjectionToken<unknown>('MODAL_DATA');
