import {
  Component,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Type,
  Injector,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FocusTrapDirective } from '../../shared/directives/focus-trap.directive';
import { ModalRef } from '../classes/modal-ref';
import { MODAL_REF, MODAL_DATA } from '../tokens/modal-tokens';
import type { 
  ModalConfig, 
  ModalAnimation, 
  ModalCloseResult,
  AnimationOriginPosition 
} from '../types/modal.types';
import { getAnimationOrigin, MODAL_Z_INDEX_BASE } from '../types/modal.types';

/**
 * Container component for modals.
 * Handles backdrop, animations, focus trapping, and dynamic component insertion.
 * 
 * @internal This component is created programmatically by ModalService.
 */
@Component({
  selector: 'lib-modal-container',
  standalone: true,
  imports: [CommonModule, FocusTrapDirective],
  template: `
    <!-- Backdrop -->
    @if (config()?.hasBackdrop !== false) {
      <div 
        class="lib-modal__backdrop"
        [class.lib-modal__backdrop--visible]="isOpen()"
        [class]="config()?.backdropClass"
        [style.z-index]="zIndex()"
        (click)="onBackdropClick($event)"
        aria-hidden="true"
      ></div>
    }
    
    <!-- Modal Panel -->
    <div 
      #modalPanel
      class="lib-modal__panel"
      [class]="panelClasses()"
      [class.lib-modal__panel--visible]="isOpen()"
      [attr.role]="config()?.role || 'dialog'"
      [attr.aria-modal]="true"
      [attr.aria-label]="config()?.ariaLabel"
      [attr.aria-labelledby]="config()?.ariaLabelledBy"
      [attr.aria-describedby]="config()?.ariaDescribedBy"
      [style.z-index]="zIndex() + 1"
      [style.width]="config()?.width"
      [style.max-width]="config()?.maxWidth"
      [style.min-width]="config()?.minWidth"
      [style.height]="config()?.height"
      [style.max-height]="config()?.maxHeight"
      [style.--modal-origin-x]="originPosition()?.x + 'px'"
      [style.--modal-origin-y]="originPosition()?.y + 'px'"
      libFocusTrap
      [libFocusTrapEnabled]="isOpen()"
      [libFocusTrapAutoFocus]="config()?.autoFocus ?? 'first-tabbable'"
    >
      <!-- Dynamic content insertion point -->
      <ng-container #contentContainer></ng-container>
    </div>
  `,
  styleUrl: './modal-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-modal-container',
    '[class.lib-modal-container--open]': 'isOpen()',
    '[attr.data-animation]': 'animation()',
  },
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;
  
  @ViewChild('modalPanel', { static: true })
  modalPanel!: ElementRef<HTMLElement>;

  /** Current modal configuration */
  readonly config = signal<ModalConfig | null>(null);
  
  /** Whether the modal is open (controls animation state) */
  readonly isOpen = signal(false);
  
  /** Z-index for this modal */
  readonly zIndex = signal(MODAL_Z_INDEX_BASE);
  
  /** Reference to this modal */
  private modalRef: ModalRef<unknown, unknown> | null = null;
  
  /** Reference to the dynamically created component */
  private componentRef: any = null;

  /** Animation type */
  readonly animation = computed(() => this.config()?.animation ?? 'scale');
  
  /** Calculated origin position for origin animation */
  readonly originPosition = signal<AnimationOriginPosition | null>(null);
  
  /** Combined panel classes */
  readonly panelClasses = computed(() => {
    const config = this.config();
    const animation = this.animation();
    const classes: string[] = [];
    
    // Animation class
    if (animation !== 'none') {
      classes.push(`lib-modal__panel--${animation}`);
    }
    
    // Custom panel classes
    if (config?.panelClass) {
      if (Array.isArray(config.panelClass)) {
        classes.push(...config.panelClass);
      } else {
        classes.push(config.panelClass);
      }
    }
    
    return classes.join(' ');
  });

  /** Body scroll position before opening */
  private scrollPosition = 0;

  ngOnInit(): void {
    this.lockBodyScroll();
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
    this.componentRef?.destroy();
  }

  /**
   * Initialize the modal with component and configuration.
   * @internal Called by ModalService
   */
  initialize<C, D, R>(
    component: Type<C>,
    modalRef: ModalRef<D, R>,
    config: ModalConfig<D>,
    zIndex: number
  ): void {
    this.modalRef = modalRef as ModalRef<unknown, unknown>;
    this.config.set(config);
    this.zIndex.set(zIndex);
    
    // Calculate origin position for animation
    if (config.animation === 'origin' && config.animationOrigin) {
      const origin = getAnimationOrigin(
        config.animationOrigin,
        window.innerWidth,
        window.innerHeight
      );
      this.originPosition.set(origin);
    }
    
    // Create the content component with ModalRef injection
    const childInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: MODAL_REF, useValue: modalRef },
        { provide: MODAL_DATA, useValue: config.data },
      ],
    });
    
    this.componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      elementInjector: childInjector,
    });
    
    // Set component instance on ModalRef
    modalRef.componentInstance = this.componentRef.instance;
    
    // Insert the component
    this.contentContainer.insert(this.componentRef.hostView);
    
    // Register close callback
    modalRef._registerCloseCallback((result) => {
      this.startExitAnimation(result);
    });
    
    // Trigger enter animation on next frame
    requestAnimationFrame(() => {
      this.isOpen.set(true);
    });
  }

  /**
   * Handle backdrop click.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.modalRef?._closeByBackdrop();
    }
  }

  /**
   * Handle keyboard events.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.modalRef?._emitKeydownEvent(event);
    
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.modalRef?._closeByEscape();
    }
  }

  /**
   * Start the exit animation.
   * @internal
   */
  startExitAnimation(result: ModalCloseResult<unknown>): void {
    this.isOpen.set(false);
    
    // Wait for animation to complete before destroying
    const panel = this.modalPanel?.nativeElement;
    if (panel && this.animation() !== 'none') {
      panel.addEventListener('animationend', () => {
        this.destroy();
      }, { once: true });
      
      // Fallback timeout in case animationend doesn't fire
      this.exitTimeoutId = window.setTimeout(() => this.destroy(), 300);
    } else {
      this.destroy();
    }
  }

  /** Whether this container has been destroyed */
  private destroyed = false;
  
  /** Fallback timeout ID for animation cleanup */
  private exitTimeoutId?: number;

  /**
   * Destroy this modal container.
   */
  private destroy(): void {
    // Guard against double-destroy from both animationend and timeout
    if (this.destroyed) return;
    this.destroyed = true;
    
    // Clear fallback timeout if animation completed first
    if (this.exitTimeoutId) {
      clearTimeout(this.exitTimeoutId);
      this.exitTimeoutId = undefined;
    }
    
    this.elementRef.nativeElement.remove();
  }

  /**
   * Lock body scroll when modal opens.
   */
  private lockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.scrollPosition = window.scrollY;
    this.document.body.style.overflow = 'hidden';
    this.document.body.style.position = 'fixed';
    this.document.body.style.top = `-${this.scrollPosition}px`;
    this.document.body.style.width = '100%';
  }

  /**
   * Unlock body scroll when modal closes.
   */
  private unlockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.document.body.style.overflow = '';
    this.document.body.style.position = '';
    this.document.body.style.top = '';
    this.document.body.style.width = '';
    window.scrollTo(0, this.scrollPosition);
  }
}
