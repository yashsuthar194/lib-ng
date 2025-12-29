/**
 * ToastRef - Reference to an active toast for programmatic control
 */

import { Subject } from 'rxjs';
import type { ToastCloseReason, ToastData } from '../types/toast.types';
import { TOAST_ANIMATION } from '../types/toast.types';

let toastIdCounter = 0;

export class ToastRef {
  /** Unique identifier */
  readonly id: string;

  /** Toast data */
  readonly data: ToastData;

  /** Emits when toast closes */
  private readonly _afterClosed = new Subject<ToastCloseReason>();
  readonly afterClosed$ = this._afterClosed.asObservable();

  /** Timer for auto-dismiss */
  private timeoutId?: ReturnType<typeof setTimeout>;

  /** Pause state for hover */
  private _isPaused = false;
  private _remainingTime = 0;
  private _startTime = 0;

  /** Track if already closed to prevent multiple closes */
  private _isClosed = false;

  constructor(data: ToastData) {
    this.id = data.id || `toast-${++toastIdCounter}`;
    this.data = { ...data, id: this.id };
  }

  /** Check if toast is closed */
  get isClosed(): boolean {
    return this._isClosed;
  }

  /** Start auto-dismiss timer */
  startTimer(duration: number): void {
    if (duration <= 0 || this._isClosed) return;

    this._remainingTime = duration;
    this._startTime = Date.now();

    this.timeoutId = setTimeout(() => {
      this.close('timeout');
    }, duration);
  }

  /** Pause timer (for hover) */
  pauseTimer(): void {
    if (this._isPaused || !this.timeoutId || this._isClosed) return;

    this._isPaused = true;
    clearTimeout(this.timeoutId);
    this._remainingTime -= Date.now() - this._startTime;
  }

  /** Resume timer */
  resumeTimer(): void {
    if (!this._isPaused || this._remainingTime <= 0 || this._isClosed) return;

    this._isPaused = false;
    this._startTime = Date.now();

    this.timeoutId = setTimeout(() => {
      this.close('timeout');
    }, this._remainingTime);
  }

  /** Close toast with reason */
  close(reason: ToastCloseReason): void {
    // Prevent multiple closes
    if (this._isClosed) return;
    this._isClosed = true;

    this.clearTimer();

    // Delay to allow exit animation
    setTimeout(() => {
      this._afterClosed.next(reason);
      this._afterClosed.complete();
    }, TOAST_ANIMATION.exit);
  }

  /** Dismiss toast (convenience method) */
  dismiss(): void {
    this.close('dismiss');
  }

  /** Clean up timer */
  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
