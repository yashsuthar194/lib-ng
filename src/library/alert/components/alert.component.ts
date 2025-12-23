/**
 * Alert Component
 * 
 * Inline alert/banner for displaying important messages.
 * 
 * @example
 * <lib-alert variant="success">Changes saved!</lib-alert>
 * <lib-alert variant="error" dismissible (dismissed)="onClose()">Error occurred</lib-alert>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  contentChild,
  TemplateRef,
} from '@angular/core';
import type { AlertVariant, AlertAppearance } from '../types/alert.types';
import { ALERT_ANIMATION } from '../types/alert.types';

@Component({
  selector: 'lib-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-alert',
    '[class.lib-alert--info]': 'variant() === "info"',
    '[class.lib-alert--success]': 'variant() === "success"',
    '[class.lib-alert--warning]': 'variant() === "warning"',
    '[class.lib-alert--error]': 'variant() === "error"',
    '[class.lib-alert--neutral]': 'variant() === "neutral"',
    '[class.lib-alert--filled]': 'appearance() === "filled"',
    '[class.lib-alert--outlined]': 'appearance() === "outlined"',
    '[class.lib-alert--soft]': 'appearance() === "soft"',
    '[class.lib-alert--dismissing]': 'isDismissing()',
    '[class.lib-alert--dismissed]': 'isDismissed()',
    '[attr.role]': '"alert"',
    '[attr.aria-live]': '"polite"',
  },
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  // ========================================
  // Inputs
  // ========================================
  
  /** Semantic variant */
  readonly variant = input<AlertVariant>('info');
  
  /** Visual appearance */
  readonly appearance = input<AlertAppearance>('filled');
  
  /** Show icon */
  readonly showIcon = input<boolean>(true);
  
  /** Can be dismissed */
  readonly dismissible = input<boolean>(false);
  
  /** Optional title */
  readonly title = input<string>('');

  // ========================================
  // Outputs
  // ========================================
  
  /** Emitted after dismiss animation completes */
  readonly dismissed = output<void>();

  // ========================================
  // State
  // ========================================
  
  /** Dismissing animation state */
  readonly isDismissing = signal(false);
  
  /** Fully dismissed */
  readonly isDismissed = signal(false);

  // ========================================
  // Computed
  // ========================================
  
  /** Get default icon for current variant */
  readonly defaultIcon = computed(() => {
    switch (this.variant()) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'error':
        return 'x-circle';
      case 'neutral':
        return null;
      default: // info
        return 'info-circle';
    }
  });

  // ========================================
  // Methods
  // ========================================
  
  /** Dismiss the alert */
  dismiss(): void {
    if (this.isDismissing() || this.isDismissed()) return;
    
    this.isDismissing.set(true);
    
    setTimeout(() => {
      this.isDismissed.set(true);
      this.dismissed.emit();
    }, ALERT_ANIMATION.duration);
  }
}
