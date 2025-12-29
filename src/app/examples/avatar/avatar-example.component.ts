/**
 * Avatar Example Component
 *
 * Demonstrates all Avatar features including:
 * - Image, initials, and icon fallback
 * - Sizes and shapes
 * - Presence indicators with custom colors
 * - Clickable avatars
 * - Avatar groups with overflow
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent } from '../../../library/avatar';

@Component({
  selector: 'app-avatar-example',
  standalone: true,
  imports: [AvatarComponent, AvatarGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Avatar Examples</h1>

      <!-- Basic Usage -->
      <section class="example-section">
        <h2>Basic Usage</h2>
        <p class="hint">Image, initials fallback, and icon fallback.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar src="https://i.pravatar.cc/150?img=1" name="John Doe"></lib-avatar>
            <span>Image</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="Jane Smith"></lib-avatar>
            <span>Initials</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar></lib-avatar>
            <span>Icon</span>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="example-section">
        <h2>Sizes</h2>
        <p class="hint">6 size variants from xs to 2xl.</p>
        <div class="avatar-row align-end">
          <div class="avatar-demo">
            <lib-avatar name="XS" size="xs"></lib-avatar>
            <span>xs</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="SM" size="sm"></lib-avatar>
            <span>sm</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="MD" size="md"></lib-avatar>
            <span>md</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="LG" size="lg"></lib-avatar>
            <span>lg</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="XL" size="xl"></lib-avatar>
            <span>xl</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="2XL" size="2xl"></lib-avatar>
            <span>2xl</span>
          </div>
        </div>
      </section>

      <!-- Shapes -->
      <section class="example-section">
        <h2>Shapes</h2>
        <p class="hint">Circle, rounded, and square options.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar name="Circle" shape="circle" size="lg"></lib-avatar>
            <span>Circle</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="Rounded" shape="rounded" size="lg"></lib-avatar>
            <span>Rounded</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar name="Square" shape="square" size="lg"></lib-avatar>
            <span>Square</span>
          </div>
        </div>
      </section>

      <!-- Presence Indicators -->
      <section class="example-section">
        <h2>Presence Indicators</h2>
        <p class="hint">Show online status with showPresence input.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar
              name="Online User"
              [showPresence]="true"
              presence="online"
              size="lg"
            ></lib-avatar>
            <span>Online</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Away User"
              [showPresence]="true"
              presence="away"
              size="lg"
            ></lib-avatar>
            <span>Away</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Busy User"
              [showPresence]="true"
              presence="busy"
              size="lg"
            ></lib-avatar>
            <span>Busy</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Offline User"
              [showPresence]="true"
              presence="offline"
              size="lg"
            ></lib-avatar>
            <span>Offline</span>
          </div>
        </div>
      </section>

      <!-- Custom Presence Colors -->
      <section class="example-section">
        <h2>Custom Presence Colors</h2>
        <p class="hint">Override presence color with presenceColor input.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar
              name="Violet"
              [showPresence]="true"
              presenceColor="#8b5cf6"
              size="lg"
            ></lib-avatar>
            <span>Violet</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Pink"
              [showPresence]="true"
              presenceColor="#ec4899"
              size="lg"
            ></lib-avatar>
            <span>Pink</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Teal"
              [showPresence]="true"
              presenceColor="#14b8a6"
              size="lg"
            ></lib-avatar>
            <span>Teal</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar
              name="Orange"
              [showPresence]="true"
              presenceColor="#f97316"
              size="lg"
            ></lib-avatar>
            <span>Orange</span>
          </div>
        </div>
      </section>

      <!-- Custom Initials Colors -->
      <section class="example-section">
        <h2>Custom Initials Colors</h2>
        <p class="hint">Override auto-generated colors with bgColor and textColor.</p>
        <div class="avatar-row">
          @for (role of customRoles; track role.name) {
            <div class="avatar-demo">
              <lib-avatar
                [name]="role.name"
                [bgColor]="role.color"
                textColor="#fff"
                size="lg"
              ></lib-avatar>
              <span>{{ role.name }}</span>
            </div>
          }
        </div>
      </section>

      <!-- Clickable Avatars -->
      <section class="example-section">
        <h2>Clickable Avatars</h2>
        <p class="hint">Enable click events with clickable input.</p>
        <div class="avatar-row">
          <lib-avatar
            name="Click Me"
            [clickable]="true"
            (avatarClick)="handleAvatarClick('Click Me')"
            size="lg"
          ></lib-avatar>
          <lib-avatar
            src="https://i.pravatar.cc/150?img=5"
            name="Profile"
            [clickable]="true"
            (avatarClick)="handleAvatarClick('Profile')"
            size="lg"
          ></lib-avatar>
        </div>
        @if (lastClicked()) {
          <p class="click-info">Last clicked: {{ lastClicked() }}</p>
        }
      </section>

      <!-- Avatar Group -->
      <section class="example-section">
        <h2>Avatar Group</h2>
        <p class="hint">Stack avatars with overlap and overflow indicator.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar-group [max]="3" size="md" [expandable]="false">
              <lib-avatar name="John Doe" src="https://i.pravatar.cc/150?img=1"></lib-avatar>
              <lib-avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2"></lib-avatar>
              <lib-avatar name="Bob Wilson" src="https://i.pravatar.cc/150?img=3"></lib-avatar>
              <lib-avatar name="Alice Brown" src="https://i.pravatar.cc/150?img=4"></lib-avatar>
              <lib-avatar name="Charlie Davis" src="https://i.pravatar.cc/150?img=5"></lib-avatar>
            </lib-avatar-group>
            <span>Static Max 3</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar-group [max]="5" size="md" [expandable]="false">
              <lib-avatar name="User 1"></lib-avatar>
              <lib-avatar name="User 2"></lib-avatar>
              <lib-avatar name="User 3"></lib-avatar>
              <lib-avatar name="User 4"></lib-avatar>
              <lib-avatar name="User 5"></lib-avatar>
              <lib-avatar name="User 6"></lib-avatar>
              <lib-avatar name="User 7"></lib-avatar>
            </lib-avatar-group>
            <span>Initials</span>
          </div>
        </div>
      </section>

      <!-- Expandable Avatar Group -->
      <section class="example-section">
        <h2>Expandable Avatar Group</h2>
        <p class="hint">Hover or click to expand and reveal all avatars.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar-group [max]="3" size="md" expandTrigger="hover">
              <lib-avatar name="John Doe" src="https://i.pravatar.cc/150?img=11"></lib-avatar>
              <lib-avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=12"></lib-avatar>
              <lib-avatar name="Bob Wilson" src="https://i.pravatar.cc/150?img=13"></lib-avatar>
              <lib-avatar name="Alice Brown" src="https://i.pravatar.cc/150?img=14"></lib-avatar>
              <lib-avatar name="Charlie Davis" src="https://i.pravatar.cc/150?img=15"></lib-avatar>
              <lib-avatar name="Diana Evans" src="https://i.pravatar.cc/150?img=16"></lib-avatar>
            </lib-avatar-group>
            <span>Hover to expand</span>
          </div>
          <!-- <div class="avatar-demo">
            <lib-avatar-group [max]="3" size="md" expandTrigger="click">
              <lib-avatar name="Team Lead" src="https://i.pravatar.cc/150?img=21"></lib-avatar>
              <lib-avatar name="Developer 1" src="https://i.pravatar.cc/150?img=22"></lib-avatar>
              <lib-avatar name="Developer 2" src="https://i.pravatar.cc/150?img=23"></lib-avatar>
              <lib-avatar name="Designer" src="https://i.pravatar.cc/150?img=24"></lib-avatar>
              <lib-avatar name="QA Engineer" src="https://i.pravatar.cc/150?img=25"></lib-avatar>
            </lib-avatar-group>
            <span>Click to expand</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar-group [max]="2" size="lg" expandTrigger="hover">
              <lib-avatar name="Large A"></lib-avatar>
              <lib-avatar name="Large B"></lib-avatar>
              <lib-avatar name="Large C"></lib-avatar>
              <lib-avatar name="Large D"></lib-avatar>
            </lib-avatar-group>
            <span>Large size</span>
          </div> -->
        </div>
      </section>

      <!-- Image Error Fallback -->
      <section class="example-section">
        <h2>Image Error Fallback</h2>
        <p class="hint">Graceful fallback when image fails to load.</p>
        <div class="avatar-row">
          <div class="avatar-demo">
            <lib-avatar
              src="https://invalid-url.com/broken.jpg"
              name="Fallback User"
              size="lg"
            ></lib-avatar>
            <span>→ Initials</span>
          </div>
          <div class="avatar-demo">
            <lib-avatar src="https://invalid-url.com/broken.jpg" size="lg"></lib-avatar>
            <span>→ Icon</span>
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

      .avatar-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--lib-spacing-6, 24px);
        align-items: center;
      }

      .avatar-row.align-end {
        align-items: flex-end;
      }

      .avatar-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--lib-spacing-2, 8px);
      }

      .avatar-demo span {
        font-size: var(--lib-font-size-xs, 0.75rem);
        color: var(--lib-color-neutral-600, #52525b);
      }

      .click-info {
        margin-block-start: var(--lib-spacing-3, 12px);
        padding: var(--lib-spacing-2, 8px) var(--lib-spacing-3, 12px);
        background: var(--lib-color-primary-100, #dbeafe);
        color: var(--lib-color-primary-700, #1d4ed8);
        border-radius: var(--lib-border-radius-md, 6px);
        font-size: var(--lib-font-size-sm, 0.875rem);
      }
    `,
  ],
})
export class AvatarExampleComponent {
  readonly lastClicked = signal<string | null>(null);

  readonly customRoles = [
    { name: 'Super Admin', color: '#7c3aed' },
    { name: 'Moderator', color: '#0891b2' },
    { name: 'Editor', color: '#059669' },
    { name: 'Viewer', color: '#6b7280' },
  ];

  handleAvatarClick(name: string): void {
    this.lastClicked.set(name);
  }
}
