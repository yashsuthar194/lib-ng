/**
 * Badge Example Component
 *
 * Demonstrates Badge component and directive with all features.
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { BadgeComponent, BadgeDirective } from '../../../library/badge';

@Component({
  selector: 'app-badge-example',
  standalone: true,
  imports: [BadgeComponent, BadgeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Badge Examples</h1>

      <!-- Variants -->
      <section class="example-section">
        <h2>Variants</h2>
        <p class="hint">7 semantic variants for different contexts.</p>
        <div class="badge-row">
          <lib-badge variant="primary">Primary</lib-badge>
          <lib-badge variant="secondary">Secondary</lib-badge>
          <lib-badge variant="success">Success</lib-badge>
          <lib-badge variant="warning">Warning</lib-badge>
          <lib-badge variant="error">Error</lib-badge>
          <lib-badge variant="info">Info</lib-badge>
          <lib-badge variant="neutral">Neutral</lib-badge>
        </div>
      </section>

      <!-- Appearances -->
      <section class="example-section">
        <h2>Appearances</h2>
        <p class="hint">4 visual styles: filled, outlined, soft, and ghost.</p>
        <div class="badge-row">
          <lib-badge appearance="filled">Filled</lib-badge>
          <lib-badge appearance="outlined">Outlined</lib-badge>
          <lib-badge appearance="soft">Soft</lib-badge>
          <lib-badge appearance="ghost" variant="primary">Ghost</lib-badge>
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Sizes</h2>
        <p class="hint">4 size options for different contexts.</p>
        <div class="badge-row align-center">
          <lib-badge size="xs">XS</lib-badge>
          <lib-badge size="sm">SM</lib-badge>
          <lib-badge size="md">MD</lib-badge>
          <lib-badge size="lg">LG</lib-badge>
        </div>
      </section>

      <!-- Shapes -->
      <section class="example-section">
        <h2>Shapes</h2>
        <p class="hint">4 shape options: rounded, pill, square, and dot.</p>
        <div class="badge-row align-center">
          <lib-badge shape="rounded">Rounded</lib-badge>
          <lib-badge shape="pill">Pill</lib-badge>
          <lib-badge shape="square">Square</lib-badge>
          <lib-badge shape="dot" size="md"></lib-badge>
        </div>
      </section>

      <!-- Number Badges -->
      <section class="example-section">
        <h2>Number Badges</h2>
        <p class="hint">Auto-formatting with max value cap.</p>
        <div class="badge-row">
          <lib-badge [content]="5" variant="error"></lib-badge>
          <lib-badge [content]="42" variant="primary"></lib-badge>
          <lib-badge [content]="99" variant="info"></lib-badge>
          <lib-badge [content]="100" variant="warning"></lib-badge>
          <lib-badge [content]="999" [maxValue]="999" variant="success"></lib-badge>
        </div>
      </section>

      <!-- Pulse Animation -->
      <section class="example-section">
        <h2>Pulse Animation</h2>
        <p class="hint">Attention-grabbing pulse effect for notifications.</p>
        <div class="badge-row">
          <lib-badge [content]="3" [pulse]="true" variant="error"></lib-badge>
          <lib-badge [content]="12" [pulse]="true" variant="primary"></lib-badge>
          <lib-badge [pulse]="true" variant="success">New</lib-badge>
        </div>
      </section>

      <!-- Gradient Borders -->
      <section class="example-section">
        <h2>Gradient Borders</h2>
        <p class="hint">Premium gradient border effects.</p>
        <div class="badge-row">
          <lib-badge [gradient]="true" size="md">Pro</lib-badge>
          <lib-badge [gradient]="true" variant="success" size="md">Enterprise</lib-badge>
          <lib-badge [gradient]="true" variant="error" size="md">Premium</lib-badge>
        </div>
      </section>

      <!-- Status Indicators -->
      <section class="example-section">
        <h2>Status Indicators</h2>
        <p class="hint">Online/offline/busy/away status dots.</p>
        <div class="badge-row align-center">
          <div class="status-demo">
            <lib-badge shape="dot" status="online" size="md"></lib-badge>
            <span>Online</span>
          </div>
          <div class="status-demo">
            <lib-badge shape="dot" status="away" size="md"></lib-badge>
            <span>Away</span>
          </div>
          <div class="status-demo">
            <lib-badge shape="dot" status="busy" size="md"></lib-badge>
            <span>Busy</span>
          </div>
          <div class="status-demo">
            <lib-badge shape="dot" status="offline" size="md"></lib-badge>
            <span>Offline</span>
          </div>
        </div>
      </section>

      <!-- Badge Directive -->
      <section class="example-section">
        <h2>Badge Directive (Overlay)</h2>
        <p class="hint">Attach badges to any element using the directive.</p>
        <div class="badge-row">
          <button [libBadge]="notificationCount()" libBadgeVariant="error" class="demo-btn">
            🔔 Notifications
          </button>
          <button
            [libBadge]="messageCount()"
            libBadgeVariant="primary"
            [libBadgePulse]="messageCount() > 0"
            class="demo-btn"
          >
            ✉️ Messages
          </button>
          <button
            libBadge
            libBadgeShape="dot"
            libBadgeStatus="online"
            libBadgePosition="bottom-right"
            class="demo-btn"
          >
            👤 Profile
          </button>
        </div>
        <div class="controls">
          <button class="btn" (click)="incrementNotifications()">Add Notification</button>
          <button class="btn" (click)="incrementMessages()">Add Message</button>
          <button class="btn btn-secondary" (click)="resetCounts()">Reset</button>
        </div>
      </section>

      <!-- Hide Zero -->
      <section class="example-section">
        <h2>Hide When Zero</h2>
        <p class="hint">Option to hide badge when value is 0.</p>
        <div class="badge-row">
          <button
            [libBadge]="zeroBadge()"
            [libBadgeHideZero]="true"
            libBadgeVariant="error"
            class="demo-btn"
          >
            With hideZero (count: {{ zeroBadge() }})
          </button>
          <button
            [libBadge]="zeroBadge()"
            [libBadgeHideZero]="false"
            libBadgeVariant="error"
            class="demo-btn"
          >
            Without hideZero
          </button>
        </div>
        <div class="controls">
          <button class="btn" (click)="toggleZeroBadge()">Toggle ({{ zeroBadge() }})</button>
        </div>
      </section>

      <!-- SaaS Use Cases -->
      <section class="example-section">
        <h2>SaaS Use Cases</h2>
        <p class="hint">Common patterns for SaaS applications.</p>
        <div class="use-case-grid">
          <div class="use-case">
            <h3>Subscription Tiers</h3>
            <div class="badge-row">
              <lib-badge appearance="soft" variant="neutral" size="sm">Free</lib-badge>
              <lib-badge [gradient]="true" variant="primary" size="sm">Pro</lib-badge>
              <lib-badge [gradient]="true" variant="success" size="sm">Enterprise</lib-badge>
            </div>
          </div>
          <div class="use-case">
            <h3>Feature Tags</h3>
            <div class="badge-row">
              <lib-badge appearance="soft" variant="info" size="xs">New</lib-badge>
              <lib-badge appearance="soft" variant="warning" size="xs">Beta</lib-badge>
              <lib-badge appearance="soft" variant="neutral" size="xs">Coming Soon</lib-badge>
            </div>
          </div>
          <div class="use-case">
            <h3>User Roles</h3>
            <div class="badge-row">
              <lib-badge appearance="filled" variant="error" size="sm">Admin</lib-badge>
              <lib-badge appearance="filled" variant="primary" size="sm">Owner</lib-badge>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Colors -->
      <section class="example-section">
        <h2>Custom Colors (Dynamic Roles)</h2>
        <p class="hint">Use bgColor and textColor for dynamic roles from database.</p>
        <div class="use-case-grid">
          <div class="use-case">
            <h3>Component with Custom Colors</h3>
            <div class="badge-row">
              @for (role of customRoles; track role.name) {
                <lib-badge [bgColor]="role.color" textColor="#fff" size="sm">{{
                  role.name
                }}</lib-badge>
              }
            </div>
          </div>
          <div class="use-case">
            <h3>Directive with Custom Colors</h3>
            <div class="badge-row">
              @for (role of customRoles; track role.name) {
                <button
                  [libBadge]="role.count"
                  [libBadgeBgColor]="role.color"
                  libBadgeTextColor="#fff"
                  class="demo-btn"
                >
                  {{ role.name }}
                </button>
              }
            </div>
          </div>
          <div class="use-case">
            <h3>Soft Appearance + Custom</h3>
            <div class="badge-row">
              <lib-badge bgColor="#8b5cf6" textColor="#fff">Violet</lib-badge>
              <lib-badge bgColor="#ec4899" textColor="#fff">Pink</lib-badge>
              <lib-badge bgColor="#14b8a6" textColor="#fff">Teal</lib-badge>
              <lib-badge bgColor="#f97316" textColor="#fff">Orange</lib-badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        padding: var(--lib-spacing-6, 24px);
        max-width: 900px;
      }

      h1 {
        font-size: var(--lib-font-size-2xl, 1.5rem);
        margin-block-end: var(--lib-spacing-6, 24px);
        color: var(--lib-color-neutral-900, #18181b);
      }

      .example-section {
        margin-block-end: var(--lib-spacing-8, 32px);
        padding: var(--lib-spacing-4, 16px);
        background: var(--lib-color-neutral-50, #fafafa);
        border-radius: var(--lib-border-radius-lg, 8px);
      }

      .example-section h2 {
        font-size: var(--lib-font-size-lg, 1.125rem);
        margin-block-end: var(--lib-spacing-3, 12px);
        color: var(--lib-color-neutral-800, #27272a);
      }

      .hint {
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-500, #71717a);
        margin-block-end: var(--lib-spacing-4, 16px);
      }

      .badge-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--lib-spacing-3, 12px);
      }

      .badge-row.align-center {
        align-items: center;
      }

      .status-demo {
        display: flex;
        align-items: center;
        gap: var(--lib-spacing-2, 8px);
        font-size: var(--lib-font-size-sm, 0.875rem);
        color: var(--lib-color-neutral-700, #3f3f46);
      }

      .demo-btn {
        padding: var(--lib-spacing-3, 12px) var(--lib-spacing-4, 16px);
        font-size: var(--lib-font-size-sm, 0.875rem);
        font-family: inherit;
        border-radius: var(--lib-border-radius-md, 6px);
        border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
        background: var(--lib-color-neutral-0, #fff);
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .demo-btn:hover {
        background: var(--lib-color-neutral-100, #f4f4f5);
      }

      .controls {
        margin-block-start: var(--lib-spacing-4, 16px);
        display: flex;
        gap: var(--lib-spacing-2, 8px);
      }

      .btn {
        padding: var(--lib-spacing-2, 8px) var(--lib-spacing-4, 16px);
        font-size: var(--lib-font-size-sm, 0.875rem);
        font-weight: 500;
        font-family: inherit;
        border-radius: var(--lib-border-radius-md, 6px);
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.15s ease;
        background: var(--lib-color-primary-500, #6366f1);
        color: white;
      }

      .btn:hover {
        background: var(--lib-color-primary-600, #4f46e5);
      }

      .btn-secondary {
        background: var(--lib-color-neutral-200, #e4e4e7);
        color: var(--lib-color-neutral-700, #3f3f46);
      }

      .btn-secondary:hover {
        background: var(--lib-color-neutral-300, #d4d4d8);
      }

      .use-case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--lib-spacing-4, 16px);
      }

      .use-case {
        padding: var(--lib-spacing-3, 12px);
        background: var(--lib-color-neutral-0, #fff);
        border-radius: var(--lib-border-radius-md, 6px);
        border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      }

      .use-case h3 {
        font-size: var(--lib-font-size-sm, 0.875rem);
        font-weight: 600;
        margin-block-end: var(--lib-spacing-2, 8px);
        color: var(--lib-color-neutral-700, #3f3f46);
      }
    `,
  ],
})
export class BadgeExampleComponent {
  readonly notificationCount = signal(5);
  readonly messageCount = signal(3);
  readonly zeroBadge = signal(0);

  /** Example roles with custom colors (simulating database data) */
  readonly customRoles = [
    { name: 'Super Admin', color: '#7c3aed', count: 2 },
    { name: 'Moderator', color: '#0891b2', count: 5 },
    { name: 'Editor', color: '#059669', count: 12 },
    { name: 'Viewer', color: '#6b7280', count: 42 },
  ];

  incrementNotifications(): void {
    this.notificationCount.update(n => n + 1);
  }

  incrementMessages(): void {
    this.messageCount.update(n => n + 1);
  }

  resetCounts(): void {
    this.notificationCount.set(0);
    this.messageCount.set(0);
  }

  toggleZeroBadge(): void {
    this.zeroBadge.update(n => (n === 0 ? 5 : 0));
  }
}
