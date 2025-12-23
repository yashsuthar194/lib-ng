import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, TabComponent } from '../../../../library/tabs';

/**
 * Basic Tabs Example
 * 
 * Demonstrates simple tab usage with icons and badges.
 */
@Component({
  selector: 'app-basic-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Basic Tabs</h1>
      <p class="description">Simple tab navigation with icons and badges.</p>

      <!-- Example 1: Simple Tabs -->
      <section class="example-section">
        <h2>Simple Tabs</h2>
        <div class="example-container">
          <lib-tabs [(activeTabIndex)]="activeIndex">
            <lib-tab label="Profile">
              <h3>Profile Tab</h3>
              <p>This is the profile content. Active tab index: {{ activeIndex() }}</p>
            </lib-tab>
            <lib-tab label="Settings">
              <h3>Settings Tab</h3>
              <p>Configure your preferences here.</p>
            </lib-tab>
            <lib-tab label="Notifications">
              <h3>Notifications Tab</h3>
              <p>View your latest notifications.</p>
            </lib-tab>
          </lib-tabs>
        </div>
        <p class="status">Selected index: {{ activeIndex() }}</p>
      </section>

      <!-- Example 2: With Icons -->
      <section class="example-section">
        <h2>Tabs with Icons</h2>
        <div class="example-container">
          <lib-tabs>
            <lib-tab label="Home" icon="🏠">
              <h3>Welcome Home</h3>
              <p>Dashboard overview and quick actions.</p>
            </lib-tab>
            <lib-tab label="Messages" icon="💬" [badge]="5">
              <h3>Messages</h3>
              <p>You have 5 unread messages.</p>
            </lib-tab>
            <lib-tab label="Settings" icon="⚙️">
              <h3>Settings</h3>
              <p>Application settings and preferences.</p>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>

      <!-- Example 3: Disabled Tab -->
      <section class="example-section">
        <h2>With Disabled Tab</h2>
        <div class="example-container">
          <lib-tabs>
            <lib-tab label="Available">
              <p>This tab is available for interaction.</p>
            </lib-tab>
            <lib-tab label="Premium Only" [disabled]="true">
              <p>This content requires a premium subscription.</p>
            </lib-tab>
            <lib-tab label="Also Available">
              <p>This tab is also available.</p>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>
    </div>
  `,
  styles: [`
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
    
    .status {
      margin-block-start: var(--lib-spacing-2);
      font-size: var(--lib-font-size-sm);
      color: var(--lib-color-neutral-500);
    }
  `],
})
export class BasicTabsExampleComponent {
  readonly activeIndex = signal(0);
}
