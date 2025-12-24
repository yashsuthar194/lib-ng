/**
 * Toast Component
 * 
 * Single toast notification with variant styling, icon, action button, and dismiss.
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  HostListener,
} from '@angular/core';
import type { ToastData } from '../types/toast.types';

@Component({
  selector: 'lib-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-toast',
    '[class.lib-toast--success]': 'data().variant === "success"',
    '[class.lib-toast--error]': 'data().variant === "error"',
    '[class.lib-toast--warning]': 'data().variant === "warning"',
    '[class.lib-toast--info]': 'data().variant === "info"',
    '[class.lib-toast--exiting]': 'isExiting()',
    'role': 'alert',
    'aria-live': 'polite',
  },
})
export class ToastComponent {
  /** Toast data */
  readonly data = input.required<ToastData>();

  /** Emitted when toast should close */
  readonly closeRequest = output<'action' | 'dismiss'>();
  
  /** Emitted on mouse enter (pause timer) */
  readonly mouseEnter = output<void>();
  
  /** Emitted on mouse leave (resume timer) */
  readonly mouseLeave = output<void>();

  /** Exit animation state */
  readonly isExiting = signal(false);

  /** Trigger exit animation */
  startExit(): void {
    this.isExiting.set(true);
  }

  /** Handle action button click */
  onActionClick(): void {
    this.closeRequest.emit('action');
  }

  /** Handle dismiss button click */
  onDismiss(): void {
    this.closeRequest.emit('dismiss');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.mouseEnter.emit();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.mouseLeave.emit();
  }
}
