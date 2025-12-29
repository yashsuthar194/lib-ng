import { Subject, Observable } from 'rxjs';
import type { ModalCloseResult, ModalCloseReason, ModalConfig } from '../types/modal.types';

/**
 * Reference to an open modal dialog.
 *
 * Provides methods to close the modal and observables to react to close events.
 * The modal content component receives this via MODAL_REF injection token.
 *
 * @template D - Type of data passed into the modal
 * @template R - Type of result returned when modal closes
 *
 * @example
 * ```typescript
 * // In the component that opened the modal
 * const modalRef = modalService.open(EditUserComponent, {
 *   data: { userId: 123 }
 * });
 *
 * modalRef.afterClosed$.subscribe(({ result, reason }) => {
 *   if (reason === 'button' && result?.saved) {
 *     this.refreshUsers();
 *   }
 * });
 *
 * // In the modal content component
 * export class EditUserComponent {
 *   private modalRef = inject(MODAL_REF<UserData, { saved: boolean }>);
 *
 *   save() {
 *     // ... save logic
 *     this.modalRef.close({ saved: true });
 *   }
 *
 *   cancel() {
 *     this.modalRef.close({ saved: false });
 *   }
 * }
 * ```
 */
export class ModalRef<D = unknown, R = unknown> {
  /** Unique identifier for this modal instance */
  readonly id: string;

  /** Subject for afterClosed events */
  private readonly _afterClosed = new Subject<ModalCloseResult<R>>();

  /** Subject for backdrop click events */
  private readonly _backdropClick = new Subject<void>();

  /** Subject for keydown events within the modal */
  private readonly _keydownEvents = new Subject<KeyboardEvent>();

  /** Whether the modal is currently closing (prevents double-close) */
  private _isClosing = false;

  /**
   * Observable that emits when the modal is closed.
   * Includes both the result data and the close reason.
   */
  readonly afterClosed$: Observable<ModalCloseResult<R>> = this._afterClosed.asObservable();

  /**
   * Observable that emits when the backdrop is clicked.
   * Useful for custom handling before close.
   */
  readonly backdropClick$: Observable<void> = this._backdropClick.asObservable();

  /**
   * Observable that emits keyboard events within the modal.
   * Useful for custom keyboard handling.
   */
  readonly keydownEvents$: Observable<KeyboardEvent> = this._keydownEvents.asObservable();

  /** Reference to the dynamically created component instance */
  componentInstance: unknown = null;

  /** Callback to trigger the container's exit animation and cleanup */
  private _onCloseCallback: ((result: ModalCloseResult<R>) => void) | null = null;

  constructor(
    /** Data injected into the modal */
    public readonly data: D,
    /** Configuration used to open the modal */
    public readonly config: ModalConfig<D>,
    /** Unique ID for tracking */
    id?: string
  ) {
    this.id = id ?? `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Close the modal with an optional result.
   * The result and reason will be emitted via afterClosed$.
   *
   * @param result - Data to return to the opener
   */
  close(result?: R): void {
    this._closeWithReason(result, 'button');
  }

  /**
   * Close the modal due to backdrop click.
   * @internal Used by ModalContainerComponent
   */
  _closeByBackdrop(): void {
    this._backdropClick.next();
    if (this.config.closeOnBackdrop !== false) {
      this._closeWithReason(undefined, 'backdrop');
    }
  }

  /**
   * Close the modal due to Escape key press.
   * @internal Used by ModalContainerComponent
   */
  _closeByEscape(): void {
    if (this.config.closeOnEscape !== false) {
      this._closeWithReason(undefined, 'escape');
    }
  }

  /**
   * Close the modal programmatically (e.g., navigation, timeout).
   * Does not provide a result.
   */
  dismiss(): void {
    this._closeWithReason(undefined, 'programmatic');
  }

  /**
   * Emit a keydown event.
   * @internal Used by ModalContainerComponent
   */
  _emitKeydownEvent(event: KeyboardEvent): void {
    this._keydownEvents.next(event);
  }

  /**
   * Register the close callback from the container.
   * @internal Used by ModalService
   */
  _registerCloseCallback(callback: (result: ModalCloseResult<R>) => void): void {
    this._onCloseCallback = callback;
  }

  /**
   * Internal close implementation with reason tracking.
   */
  private _closeWithReason(result: R | undefined, reason: ModalCloseReason): void {
    // Prevent double-close
    if (this._isClosing) {
      return;
    }
    this._isClosing = true;

    const closeResult: ModalCloseResult<R> = { result, reason };

    // Trigger container cleanup and animation
    if (this._onCloseCallback) {
      this._onCloseCallback(closeResult);
    }

    // Emit to subscribers
    this._afterClosed.next(closeResult);
    this._afterClosed.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
  }

  /**
   * Check if the modal is currently in the process of closing.
   */
  get isClosing(): boolean {
    return this._isClosing;
  }
}
