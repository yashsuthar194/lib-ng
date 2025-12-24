/**
 * Toast Service
 * 
 * Service for showing toast notifications.
 * Provides convenience methods for different variants.
 * Manages stacking and positioning.
 * 
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   private toast = inject(ToastService);
 *   
 *   showSuccess() {
 *     this.toast.success('Item saved successfully');
 *   }
 *   
 *   showWithAction() {
 *     const ref = this.toast.show({
 *       message: 'Item deleted',
 *       variant: 'warning',
 *       action: { 
 *         label: 'Undo', 
 *         callback: () => this.undoDelete() 
 *       }
 *     });
 *   }
 * }
 * ```
 */

import {
  Injectable,
  ApplicationRef,
  EnvironmentInjector,
  inject,
  createComponent,
  ComponentRef,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ToastContainerComponent } from '../container/toast-container.component';
import { ToastRef } from '../classes/toast-ref';
import type { 
  ToastConfig, 
  ToastPosition, 
  ToastData 
} from '../types/toast.types';
import { 
  DEFAULT_TOAST_CONFIG, 
  MAX_VISIBLE_TOASTS 
} from '../types/toast.types';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  
  /** Container components for each position */
  private containers = new Map<ToastPosition, ComponentRef<ToastContainerComponent>>();

  // ============================================
  // Convenience Methods
  // ============================================

  /** Show success toast */
  success(message: string, config?: Partial<ToastConfig>): ToastRef {
    return this.show({ ...config, message, variant: 'success' });
  }

  /** Show error toast (longer duration) */
  error(message: string, config?: Partial<ToastConfig>): ToastRef {
    return this.show({ duration: 6000, ...config, message, variant: 'error' });
  }

  /** Show warning toast */
  warning(message: string, config?: Partial<ToastConfig>): ToastRef {
    return this.show({ ...config, message, variant: 'warning' });
  }

  /** Show info toast */
  info(message: string, config?: Partial<ToastConfig>): ToastRef {
    return this.show({ ...config, message, variant: 'info' });
  }

  // ============================================
  // Core Method
  // ============================================

  /** Show toast with full configuration */
  show(config: ToastConfig): ToastRef {
    // SSR guard
    if (!isPlatformBrowser(this.platformId)) {
      const dummyData = this.resolveConfig(config);
      return new ToastRef(dummyData);
    }

    // Resolve config with defaults
    const data = this.resolveConfig(config);
    const position = data.position;
    
    // Get or create container for this position
    const container = this.getOrCreateContainer(position);
    
    // Check max visible toasts
    if (container.instance.count >= MAX_VISIBLE_TOASTS) {
      container.instance.dismissOldest();
    }
    
    // Create toast ref
    const toastRef = new ToastRef(data);
    
    // Add to container
    container.instance.addToast(toastRef);
    
    // Start timer if duration > 0
    if (data.duration > 0) {
      toastRef.startTimer(data.duration);
    }
    
    return toastRef;
  }

  // ============================================
  // Utility Methods
  // ============================================

  /** Dismiss all toasts */
  dismissAll(): void {
    this.containers.forEach(container => {
      // Get current count and dismiss that many (avoids infinite loop)
      const currentCount = container.instance.count;
      for (let i = 0; i < currentCount; i++) {
        container.instance.dismissOldest();
      }
    });
  }

  // ============================================
  // Private Methods
  // ============================================

  /** Get or create container for a position */
  private getOrCreateContainer(position: ToastPosition): ComponentRef<ToastContainerComponent> {
    let container = this.containers.get(position);
    
    if (!container) {
      container = createComponent(ToastContainerComponent, {
        environmentInjector: this.environmentInjector,
      });
      
      container.instance.setPosition(position);
      
      // Attach to app and DOM
      this.appRef.attachView(container.hostView);
      this.document.body.appendChild(container.location.nativeElement);
      
      this.containers.set(position, container);
    }
    
    return container;
  }

  /** Resolve config with defaults */
  private resolveConfig(config: ToastConfig): ToastData {
    return {
      id: config.id || '',
      message: config.message,
      variant: config.variant ?? DEFAULT_TOAST_CONFIG.variant,
      duration: config.duration ?? DEFAULT_TOAST_CONFIG.duration,
      position: config.position ?? DEFAULT_TOAST_CONFIG.position,
      dismissible: config.dismissible ?? DEFAULT_TOAST_CONFIG.dismissible,
      icon: config.icon ?? DEFAULT_TOAST_CONFIG.icon,
      action: config.action,
    };
  }
}
