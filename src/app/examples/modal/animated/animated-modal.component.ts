import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ModalService, ModalAnimation } from '../../../../library/modal';
import { AlertDialogComponent } from '../dialogs/example-dialogs';
import { NestedDialogComponent } from '../dialogs/nested-dialog.component';

/**
 * Animation Modal Example
 *
 * Showcases all animation types including origin-based animation
 * and nested modals (opening a modal from another modal).
 */
@Component({
  selector: 'app-animated-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Animated Modals</h1>
      <p class="description">Different animation styles for modal entry and exit.</p>

      <!-- Animation Type Selector -->
      <section class="example-section">
        <h2>Animation Types</h2>
        <p class="hint">Click each button to see the corresponding animation.</p>

        <div class="animation-grid">
          @for (anim of animationTypes; track anim.type) {
            <button class="anim-btn" (click)="openWithAnimation(anim.type)">
              <span class="anim-icon">{{ anim.icon }}</span>
              <span class="anim-label">{{ anim.label }}</span>
              <span class="anim-desc">{{ anim.description }}</span>
            </button>
          }
        </div>
      </section>

      <!-- Origin Animation - Spread buttons across viewport -->
      <section class="example-section origin-section">
        <h2>Origin Animation</h2>
        <p class="hint">
          The modal animates FROM the clicked button's position TO the center. Try buttons in
          different corners!
        </p>

        <div class="origin-container">
          <!-- Top Left -->
          <button
            #btnTopLeft
            class="origin-btn origin-btn--top-left"
            (click)="openFromOrigin(btnTopLeft, 'Top Left')"
          >
            ↖️ Top Left
          </button>

          <!-- Top Right -->
          <button
            #btnTopRight
            class="origin-btn origin-btn--top-right"
            (click)="openFromOrigin(btnTopRight, 'Top Right')"
          >
            ↗️ Top Right
          </button>

          <!-- Center -->
          <button
            #btnCenter
            class="origin-btn origin-btn--center"
            (click)="openFromOrigin(btnCenter, 'Center')"
          >
            ⭐ Center
          </button>

          <!-- Bottom Left -->
          <button
            #btnBottomLeft
            class="origin-btn origin-btn--bottom-left"
            (click)="openFromOrigin(btnBottomLeft, 'Bottom Left')"
          >
            ↙️ Bottom Left
          </button>

          <!-- Bottom Right -->
          <button
            #btnBottomRight
            class="origin-btn origin-btn--bottom-right"
            (click)="openFromOrigin(btnBottomRight, 'Bottom Right')"
          >
            ↘️ Bottom Right
          </button>
        </div>
      </section>

      <!-- Nested Modals -->
      <section class="example-section">
        <h2>Nested Modals (Modal from Modal)</h2>
        <p class="hint">
          Open a modal that can open another modal. Tests stacked modals and z-index management.
        </p>

        <button class="nested-btn" (click)="openNestedModal()">🪟 Open Nestable Modal</button>
        <span class="nested-info">Currently open: {{ modalService.openModalCount() }}</span>
      </section>

      <!-- Close Reason Log -->
      <section class="example-section">
        <h2>Close Event Log</h2>
        <div class="event-log">
          @for (event of eventLog(); track $index) {
            <div class="event-item">
              <span class="event-time">{{ event.time }}</span>
              <span class="event-anim">{{ event.animation }}</span>
              <span class="event-reason">closed via: {{ event.reason }}</span>
            </div>
          } @empty {
            <div class="event-item event-item--empty">Open and close modals to see events...</div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        padding: var(--lib-spacing-6);
        max-width: 1000px;
      }

      .description {
        color: var(--lib-color-neutral-600);
        margin-block-end: var(--lib-spacing-6);
      }

      .example-section {
        margin-block-end: var(--lib-spacing-8);
      }

      .example-section h2 {
        font-size: var(--lib-font-size-lg);
        margin-block-end: var(--lib-spacing-2);
      }

      .hint {
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-500);
        margin-block-end: var(--lib-spacing-4);
      }

      .animation-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--lib-spacing-3);
      }

      .anim-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--lib-spacing-2);
        padding: var(--lib-spacing-4);
        background: var(--lib-color-neutral-0);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
        border-radius: var(--lib-border-radius-lg);
        cursor: pointer;
        transition: all var(--lib-transition-fast);
      }

      .anim-btn:hover {
        border-color: var(--lib-color-primary-500);
        box-shadow: var(--lib-shadow-md);
        transform: translateY(-2px);
      }

      .anim-icon {
        font-size: 24px;
      }

      .anim-label {
        font-weight: var(--lib-font-weight-semibold);
        font-size: var(--lib-font-size-sm);
      }

      .anim-desc {
        font-size: var(--lib-font-size-xs);
        color: var(--lib-color-neutral-500);
        text-align: center;
      }

      /* Origin Animation Section - Full width container with positioned buttons */
      .origin-section {
        background: linear-gradient(
          135deg,
          var(--lib-color-neutral-50) 0%,
          var(--lib-color-neutral-100) 100%
        );
        padding: var(--lib-spacing-6);
        border-radius: var(--lib-border-radius-xl);
        margin-inline: calc(-1 * var(--lib-spacing-6));
      }

      .origin-container {
        position: relative;
        height: 350px;
        background: var(--lib-color-neutral-0);
        border-radius: var(--lib-border-radius-lg);
        border: 2px dashed var(--lib-color-neutral-300);
      }

      .origin-btn {
        position: absolute;
        padding: var(--lib-spacing-3) var(--lib-spacing-4);
        background: linear-gradient(
          135deg,
          var(--lib-color-primary-500) 0%,
          var(--lib-color-primary-600) 100%
        );
        border: none;
        border-radius: var(--lib-border-radius-md);
        cursor: pointer;
        font-weight: var(--lib-font-weight-semibold);
        color: white;
        transition: all var(--lib-transition-fast);
        box-shadow: var(--lib-shadow-md);
      }

      .origin-btn:hover {
        transform: scale(1.05);
        box-shadow: var(--lib-shadow-lg);
      }

      .origin-btn--top-left {
        top: var(--lib-spacing-4);
        left: var(--lib-spacing-4);
      }

      .origin-btn--top-right {
        top: var(--lib-spacing-4);
        right: var(--lib-spacing-4);
      }

      .origin-btn--center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--lib-color-success) 0%, #0d9488 100%);
      }

      .origin-btn--center:hover {
        transform: translate(-50%, -50%) scale(1.05);
      }

      .origin-btn--bottom-left {
        bottom: var(--lib-spacing-4);
        left: var(--lib-spacing-4);
      }

      .origin-btn--bottom-right {
        bottom: var(--lib-spacing-4);
        right: var(--lib-spacing-4);
      }

      /* Nested Modal Section */
      .nested-btn {
        padding: var(--lib-spacing-4) var(--lib-spacing-6);
        background: linear-gradient(135deg, var(--lib-color-primary-600) 0%, #7c3aed 100%);
        border: none;
        border-radius: var(--lib-border-radius-lg);
        cursor: pointer;
        font-weight: var(--lib-font-weight-semibold);
        font-size: var(--lib-font-size-base);
        color: white;
        transition: all var(--lib-transition-fast);
        box-shadow: var(--lib-shadow-md);
      }

      .nested-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--lib-shadow-lg);
      }

      .nested-info {
        margin-left: var(--lib-spacing-4);
        color: var(--lib-color-neutral-500);
        font-size: var(--lib-font-size-sm);
      }

      .event-log {
        background: var(--lib-color-neutral-900);
        color: var(--lib-color-neutral-100);
        border-radius: var(--lib-border-radius-md);
        padding: var(--lib-spacing-3);
        font-family: monospace;
        font-size: var(--lib-font-size-xs);
        max-height: 200px;
        overflow-y: auto;
      }

      .event-item {
        display: flex;
        gap: var(--lib-spacing-3);
        padding: var(--lib-spacing-1) 0;
        border-bottom: 1px solid var(--lib-color-neutral-700);
      }

      .event-item:last-child {
        border-bottom: none;
      }

      .event-time {
        color: var(--lib-color-neutral-400);
      }

      .event-anim {
        color: var(--lib-color-primary-400);
      }

      .event-reason {
        color: var(--lib-color-success);
      }

      .event-item--empty {
        color: var(--lib-color-neutral-500);
        font-style: italic;
      }
    `,
  ],
})
export class AnimatedModalExampleComponent {
  readonly modalService = inject(ModalService);

  readonly animationTypes = [
    { type: 'fade' as ModalAnimation, icon: '🌫️', label: 'Fade', description: 'Simple opacity' },
    { type: 'scale' as ModalAnimation, icon: '🔍', label: 'Scale', description: 'Zoom in/out' },
    {
      type: 'slide-up' as ModalAnimation,
      icon: '⬆️',
      label: 'Slide Up',
      description: 'From bottom',
    },
    {
      type: 'slide-down' as ModalAnimation,
      icon: '⬇️',
      label: 'Slide Down',
      description: 'From top',
    },
    { type: 'none' as ModalAnimation, icon: '⚡', label: 'None', description: 'Instant' },
  ];

  readonly eventLog = signal<{ time: string; animation: string; reason: string }[]>([]);

  openWithAnimation(animation: ModalAnimation): void {
    const modalRef = this.modalService.open(AlertDialogComponent, {
      data: {
        title: `${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`,
        message: `This modal uses the "${animation}" animation.`,
      },
      animation,
    });

    modalRef.afterClosed$.subscribe(({ reason }) => {
      this.logEvent(animation, reason);
    });
  }

  openFromOrigin(button: HTMLElement, position: string): void {
    const modalRef = this.modalService.open(AlertDialogComponent, {
      data: {
        title: `Origin: ${position}`,
        message: `This modal animated FROM the "${position}" button TO the center of the screen!`,
      },
      animation: 'origin',
      animationOrigin: button,
    });

    modalRef.afterClosed$.subscribe(({ reason }) => {
      this.logEvent(`origin (${position})`, reason);
    });
  }

  openNestedModal(): void {
    const modalRef = this.modalService.open(NestedDialogComponent, {
      data: {
        title: 'Nested Modal (Level 1)',
        message: 'This modal can open other modals! Try clicking the buttons below.',
        depth: 1,
      },
      animation: 'scale',
    });

    modalRef.afterClosed$.subscribe(({ reason }) => {
      this.logEvent('nested', reason);
    });
  }

  private logEvent(animation: string, reason: string): void {
    const time = new Date().toLocaleTimeString();
    this.eventLog.update(log => [{ time, animation, reason }, ...log.slice(0, 9)]);
  }
}
