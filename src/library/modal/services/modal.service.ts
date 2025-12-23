import {
  Injectable,
  ApplicationRef,
  EnvironmentInjector,
  Injector,
  Type,
  signal,
  computed,
  inject,
  PLATFORM_ID,
  createComponent,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ModalContainerComponent } from '../container/modal-container.component';
import { ModalRef } from '../classes/modal-ref';
import type { ModalConfig, ModalStackItem } from '../types/modal.types';
import { 
  DEFAULT_MODAL_CONFIG, 
  MODAL_Z_INDEX_BASE, 
  MODAL_Z_INDEX_INCREMENT 
} from '../types/modal.types';

/**
 * Service for opening and managing modal dialogs.
 * 
 * Provides programmatic control over modals with:
 * - Typed data passing in and out
 * - Multiple animation options
 * - Modal stacking management
 * - Close reason tracking
 * 
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   private modalService = inject(ModalService);
 *   
 *   openEditDialog() {
 *     const modalRef = this.modalService.open(EditUserComponent, {
 *       data: { userId: 123, name: 'John' },
 *       animation: 'scale',
 *     });
 *     
 *     modalRef.afterClosed$.subscribe(({ result, reason }) => {
 *       console.log(`Closed via: ${reason}`);
 *       if (result?.saved) {
 *         this.refreshData();
 *       }
 *     });
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  /** Stack of currently open modals */
  private readonly _modalStack = signal<ModalStackItem[]>([]);
  
  /** All currently open modal refs */
  private readonly _openModals = signal<ModalRef[]>([]);

  /** Number of currently open modals */
  readonly openModalCount = computed(() => this._openModals().length);
  
  /** Whether any modals are currently open */
  readonly hasOpenModals = computed(() => this._openModals().length > 0);

  /**
   * Open a modal dialog with the specified component.
   * 
   * @template C - Component type
   * @template D - Data type passed to the modal
   * @template R - Result type returned when modal closes
   * 
   * @param component - The component to render inside the modal
   * @param config - Configuration options for the modal
   * @returns ModalRef for programmatic control and result observation
   */
  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    config?: ModalConfig<D>
  ): ModalRef<D, R> {
    if (!isPlatformBrowser(this.platformId)) {
      // Return a dummy ModalRef for SSR
      return new ModalRef<D, R>(
        config?.data as D,
        { ...DEFAULT_MODAL_CONFIG, ...config } as ModalConfig<D>
      );
    }

    // Merge with default config
    const mergedConfig: ModalConfig<D> = {
      ...DEFAULT_MODAL_CONFIG,
      ...config,
    } as ModalConfig<D>;

    // Calculate z-index for stacking
    const stackIndex = this._modalStack().length;
    const zIndex = mergedConfig.zIndex ?? 
      (MODAL_Z_INDEX_BASE + stackIndex * MODAL_Z_INDEX_INCREMENT);

    // Create ModalRef
    const modalRef = new ModalRef<D, R>(
      mergedConfig.data as D,
      mergedConfig
    );

    // Store previous active element for focus restoration
    const previousActiveElement = this.document.activeElement;

    // Add to stack
    const stackItem: ModalStackItem = {
      id: modalRef.id,
      zIndex,
      previousActiveElement,
    };
    this._modalStack.update(stack => [...stack, stackItem]);
    this._openModals.update(modals => [...modals, modalRef as ModalRef]);

    // Create the container component
    const containerRef = createComponent(ModalContainerComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
    });

    // Attach to application
    this.appRef.attachView(containerRef.hostView);
    
    // Append to document body
    const containerElement = containerRef.location.nativeElement as HTMLElement;
    this.document.body.appendChild(containerElement);

    // Initialize the container with the content component
    containerRef.instance.initialize(
      component,
      modalRef,
      mergedConfig,
      zIndex
    );

    // Handle cleanup when modal closes
    modalRef.afterClosed$.subscribe(() => {
      this.removeFromStack(modalRef.id);
      
      // Detach and destroy
      this.appRef.detachView(containerRef.hostView);
      containerRef.destroy();
      
      // Restore focus if configured
      if (mergedConfig.restoreFocus !== false && previousActiveElement) {
        (previousActiveElement as HTMLElement).focus?.();
      }
    });

    return modalRef;
  }

  /**
   * Close all open modals.
   * Modals are closed in reverse order (top-most first).
   */
  closeAll(): void {
    const modals = [...this._openModals()].reverse();
    modals.forEach(modal => modal.dismiss());
  }

  /**
   * Close a specific modal by its ID.
   */
  closeById(id: string): void {
    const modal = this._openModals().find(m => m.id === id);
    if (modal) {
      modal.dismiss();
    }
  }

  /**
   * Get the top-most (currently active) modal.
   */
  getTopModal(): ModalRef | null {
    const modals = this._openModals();
    return modals.length > 0 ? modals[modals.length - 1] : null;
  }

  /**
   * Remove a modal from the stack.
   */
  private removeFromStack(id: string): void {
    this._modalStack.update(stack => 
      stack.filter(item => item.id !== id)
    );
    this._openModals.update(modals => 
      modals.filter(modal => modal.id !== id)
    );
  }
}
