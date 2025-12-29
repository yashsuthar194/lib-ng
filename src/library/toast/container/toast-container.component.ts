/**
 * Toast Container Component
 *
 * Manages the stack of toasts for a specific position.
 * Renders toasts and handles their lifecycle.
 */

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../components/toast.component';
import { ToastRef } from '../classes/toast-ref';
import type { ToastPosition } from '../types/toast.types';

interface ToastEntry {
  toastRef: ToastRef;
  componentRef: ComponentRef<ToastComponent>;
  cleanup: () => void;
}

@Component({
  selector: 'lib-toast-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-toast-container',
    '[class.lib-toast-container--top]': 'isTop()',
    '[class.lib-toast-container--bottom]': 'isBottom()',
    '[class.lib-toast-container--left]': 'isLeft()',
    '[class.lib-toast-container--center]': 'isCenter()',
    '[class.lib-toast-container--right]': 'isRight()',
    '[style.--toast-direction]': 'getDirection()',
  },
  template: `<ng-template #toastOutlet></ng-template>`,
  styles: [
    `
      :host {
        position: fixed;
        z-index: var(--lib-z-index-toast, 9999);
        display: flex;
        flex-direction: column;
        gap: var(--lib-spacing-3, 12px);
        padding: var(--lib-spacing-4, 16px);
        pointer-events: none;
        max-height: 100vh;
        overflow: hidden;
      }

      /* Vertical positioning */
      :host(.lib-toast-container--top) {
        top: 0;
      }
      :host(.lib-toast-container--bottom) {
        bottom: 0;
        flex-direction: column-reverse;
      }

      /* Horizontal positioning */
      :host(.lib-toast-container--left) {
        left: 0;
        align-items: flex-start;
      }
      :host(.lib-toast-container--center) {
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
      }
      :host(.lib-toast-container--right) {
        right: 0;
        align-items: flex-end;
      }
    `,
  ],
})
export class ToastContainerComponent implements OnDestroy, AfterViewInit {
  /** ViewContainerRef for dynamic component creation */
  @ViewChild('toastOutlet', { read: ViewContainerRef, static: true })
  toastOutlet!: ViewContainerRef;

  /** Current position */
  readonly position = signal<ToastPosition>('bottom-right');

  /** Active toasts */
  private toasts: ToastEntry[] = [];

  /** Ready flag */
  private isReady = false;

  /** Pending toasts before view init */
  private pendingToasts: ToastRef[] = [];

  ngAfterViewInit(): void {
    this.isReady = true;
    // Process any pending toasts
    const pending = [...this.pendingToasts];
    this.pendingToasts = [];
    pending.forEach(ref => this.addToastInternal(ref));
  }

  /** Computed position checks */
  isTop(): boolean {
    return this.position().startsWith('top');
  }
  isBottom(): boolean {
    return this.position().startsWith('bottom');
  }
  isLeft(): boolean {
    return this.position().endsWith('left');
  }
  isCenter(): boolean {
    return this.position().endsWith('center');
  }
  isRight(): boolean {
    return this.position().endsWith('right');
  }

  /** Get slide direction for animation */
  getDirection(): number {
    return this.isLeft() ? -1 : 1;
  }

  /** Set container position */
  setPosition(pos: ToastPosition): void {
    this.position.set(pos);
  }

  /** Add a toast to this container */
  addToast(toastRef: ToastRef): void {
    // Skip if already closed
    if (toastRef.isClosed) return;

    if (!this.isReady) {
      this.pendingToasts.push(toastRef);
      return;
    }
    this.addToastInternal(toastRef);
  }

  /** Internal method to add toast after view is ready */
  private addToastInternal(toastRef: ToastRef): void {
    // Skip if already closed
    if (toastRef.isClosed) return;

    const componentRef = this.toastOutlet.createComponent(ToastComponent);
    const instance = componentRef.instance;

    // Set inputs
    componentRef.setInput('data', toastRef.data);

    // Handle close request - use Angular output subscription
    const closeRequestSub = instance.closeRequest.subscribe(reason => {
      instance.startExit();
      toastRef.close(reason);
    });

    // Handle mouse events for pause/resume
    const mouseEnterSub = instance.mouseEnter.subscribe(() => toastRef.pauseTimer());
    const mouseLeaveSub = instance.mouseLeave.subscribe(() => toastRef.resumeTimer());

    // RxJS subscription for afterClosed
    let afterClosedSub: Subscription | null = null;

    // Cleanup function
    const cleanup = () => {
      closeRequestSub.unsubscribe();
      mouseEnterSub.unsubscribe();
      mouseLeaveSub.unsubscribe();
      afterClosedSub?.unsubscribe();
    };

    // Store entry
    const entry: ToastEntry = { toastRef, componentRef, cleanup };
    this.toasts.push(entry);

    // Clean up when closed
    afterClosedSub = toastRef.afterClosed$.subscribe(() => {
      this.removeToast(entry);
    });
  }

  /** Remove a toast from this container */
  private removeToast(entry: ToastEntry): void {
    const index = this.toasts.indexOf(entry);
    if (index > -1) {
      this.toasts.splice(index, 1);
      // Cleanup subscriptions
      entry.cleanup();
      entry.componentRef.destroy();
    }
  }

  /** Get current toast count (excluding closing toasts) */
  get count(): number {
    return this.toasts.filter(t => !t.toastRef.isClosed).length;
  }

  /** Trigger exit animation for oldest non-closing toast */
  dismissOldest(): void {
    // Find oldest toast that isn't already closing
    const oldest = this.toasts.find(t => !t.toastRef.isClosed);
    if (oldest) {
      oldest.componentRef.instance.startExit();
      oldest.toastRef.dismiss();
    }
  }

  ngOnDestroy(): void {
    this.toasts.forEach(entry => {
      entry.cleanup();
      entry.componentRef.destroy();
    });
    this.toasts = [];
  }
}
