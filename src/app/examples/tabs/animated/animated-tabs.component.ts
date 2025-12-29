import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, TabComponent, TabAnimation } from '../../../../library/tabs';

/**
 * Animated Tabs Example
 *
 * Demonstrates different animation options for tab transitions.
 */
@Component({
  selector: 'app-animated-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Animated Tabs</h1>
      <p class="description">Different animation styles for tab transitions.</p>

      <!-- Animation Selector -->
      <section class="example-section">
        <h2>Select Animation</h2>
        <div class="controls">
          <button
            class="btn"
            [class.btn--active]="animation() === 'slide'"
            (click)="setAnimation('slide')"
          >
            Slide
          </button>
          <button
            class="btn"
            [class.btn--active]="animation() === 'fade'"
            (click)="setAnimation('fade')"
          >
            Fade
          </button>
          <button
            class="btn"
            [class.btn--active]="animation() === 'none'"
            (click)="setAnimation('none')"
          >
            None
          </button>
        </div>
      </section>

      <!-- Animated Tabs -->
      <section class="example-section">
        <h2>Animation: {{ animation() }}</h2>
        <div class="example-container">
          <lib-tabs [animation]="animation()">
            <lib-tab label="First Tab">
              <div class="tab-content tab-content--1">
                <h3>First Tab Content</h3>
                <p>Switch between tabs to see the {{ animation() }} animation effect.</p>
                <div class="placeholder-box"></div>
              </div>
            </lib-tab>
            <lib-tab label="Second Tab">
              <div class="tab-content tab-content--2">
                <h3>Second Tab Content</h3>
                <p>The animation direction changes based on which tab you're navigating to.</p>
                <div class="placeholder-box"></div>
              </div>
            </lib-tab>
            <lib-tab label="Third Tab">
              <div class="tab-content tab-content--3">
                <h3>Third Tab Content</h3>
                <p>Go back to see the animation direction reverse.</p>
                <div class="placeholder-box"></div>
              </div>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>

      <!-- Vertical Orientation -->
      <section class="example-section">
        <h2>Vertical Tabs</h2>
        <div class="example-container">
          <lib-tabs orientation="vertical" [animation]="animation()">
            <lib-tab label="Account" icon="👤">
              <h3>Account Settings</h3>
              <p>Manage your account information and preferences.</p>
            </lib-tab>
            <lib-tab label="Security" icon="🔒">
              <h3>Security Settings</h3>
              <p>Configure password, 2FA, and session settings.</p>
            </lib-tab>
            <lib-tab label="Billing" icon="💳">
              <h3>Billing Information</h3>
              <p>View invoices and manage payment methods.</p>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        padding: var(--lib-spacing-6);
        max-width: 900px;
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
        margin-block-end: var(--lib-spacing-3);
      }

      .example-container {
        background: var(--lib-color-neutral-0);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
        border-radius: var(--lib-border-radius-lg);
        overflow: hidden;
      }

      .controls {
        display: flex;
        gap: var(--lib-spacing-2);
        margin-block-end: var(--lib-spacing-4);
      }

      .btn {
        padding: var(--lib-spacing-2) var(--lib-spacing-4);
        background: var(--lib-color-neutral-100);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-300);
        border-radius: var(--lib-border-radius-md);
        cursor: pointer;
        font-size: var(--lib-font-size-sm);
        font-weight: var(--lib-font-weight-medium);
        transition: all var(--lib-transition-fast);
      }

      .btn:hover {
        background: var(--lib-color-neutral-200);
      }

      .btn--active {
        background: var(--lib-color-primary-500);
        border-color: var(--lib-color-primary-500);
        color: white;
      }

      .tab-content {
        min-height: 180px;
      }

      .placeholder-box {
        width: 100%;
        height: 80px;
        background: linear-gradient(
          135deg,
          var(--lib-color-primary-100) 0%,
          var(--lib-color-primary-200) 100%
        );
        border-radius: var(--lib-border-radius-md);
        margin-block-start: var(--lib-spacing-4);
      }

      .tab-content--2 .placeholder-box {
        background: linear-gradient(
          135deg,
          var(--lib-color-neutral-100) 0%,
          var(--lib-color-neutral-200) 100%
        );
      }

      .tab-content--3 .placeholder-box {
        background: linear-gradient(
          135deg,
          var(--lib-color-success-light) 0%,
          var(--lib-color-success) 100%
        );
      }
    `,
  ],
})
export class AnimatedTabsExampleComponent {
  readonly animation = signal<TabAnimation>('slide');

  setAnimation(anim: TabAnimation): void {
    this.animation.set(anim);
  }
}
