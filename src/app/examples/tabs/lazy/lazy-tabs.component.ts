import { Component, signal, input, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, TabComponent } from '../../../../library/tabs';

/**
 * Simulated heavy component for demo purposes.
 */
@Component({
  selector: 'app-heavy-component',
  standalone: true,
  template: `
    <div class="heavy-component">
      <div class="heavy-component__icon">📊</div>
      <div class="heavy-component__label">{{ name() }}</div>
      <div class="heavy-component__status">Loaded!</div>
    </div>
  `,
  styles: [
    `
      .heavy-component {
        display: flex;
        align-items: center;
        gap: var(--lib-spacing-3);
        padding: var(--lib-spacing-4);
        background: linear-gradient(
          135deg,
          var(--lib-color-neutral-50) 0%,
          var(--lib-color-neutral-100) 100%
        );
        border-radius: var(--lib-border-radius-md);
        margin-block-start: var(--lib-spacing-4);
      }

      .heavy-component__icon {
        font-size: 24px;
      }

      .heavy-component__label {
        flex: 1;
        font-weight: var(--lib-font-weight-medium);
      }

      .heavy-component__status {
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-success);
        font-weight: var(--lib-font-weight-medium);
      }
    `,
  ],
})
export class HeavyComponent {
  readonly name = input('Component');
}

/**
 * Lazy Loading Tabs Example
 *
 * Demonstrates lazy loading of tab content using ng-template.
 */
@Component({
  selector: 'app-lazy-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent, HeavyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Lazy Loading Tabs</h1>
      <p class="description">Tab content is only loaded when the tab is first activated.</p>

      <!-- Explanation -->
      <section class="example-section">
        <div class="info-box">
          <h3>💡 How Lazy Loading Works</h3>
          <ol>
            <li>Wrap content in <code>&lt;ng-template #lazy&gt;</code></li>
            <li>Content is NOT rendered until tab is activated</li>
            <li>Once activated, content stays rendered (wasActivated = true)</li>
            <li>Ideal for heavy components like charts, forms, or API-fetching content</li>
          </ol>
        </div>
      </section>

      <!-- Lazy Tabs Demo -->
      <section class="example-section">
        <h2>Lazy Loading Demo</h2>
        <p class="hint">Click on each tab to load its content. Check the load log below.</p>

        <div class="example-container">
          <lib-tabs>
            <lib-tab label="Dashboard (Eager)">
              <div class="tab-content">
                <h3>Dashboard - Eager Loaded</h3>
                <p>This content is loaded immediately when the component initializes.</p>
                <p class="timestamp">Rendered at: {{ getTime() }}</p>
              </div>
            </lib-tab>

            <lib-tab label="Analytics (Lazy)">
              <ng-template #lazy>
                <div class="tab-content">
                  <h3>Analytics - Lazy Loaded</h3>
                  <p>This content was only loaded when you clicked the tab!</p>
                  <p class="timestamp">Loaded at: {{ logLoad('Analytics') }}</p>
                  <app-heavy-component name="Analytics Chart" />
                </div>
              </ng-template>
            </lib-tab>

            <lib-tab label="Reports (Lazy)">
              <ng-template #lazy>
                <div class="tab-content">
                  <h3>Reports - Lazy Loaded</h3>
                  <p>Report generation might be expensive - only load when needed!</p>
                  <p class="timestamp">Loaded at: {{ logLoad('Reports') }}</p>
                  <app-heavy-component name="Report Generator" />
                </div>
              </ng-template>
            </lib-tab>

            <lib-tab label="Settings (Lazy)">
              <ng-template #lazy>
                <div class="tab-content">
                  <h3>Settings - Lazy Loaded</h3>
                  <p>Settings form with many fields and validation.</p>
                  <p class="timestamp">Loaded at: {{ logLoad('Settings') }}</p>
                  <app-heavy-component name="Settings Form" />
                </div>
              </ng-template>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>

      <!-- Load Log -->
      <section class="example-section">
        <h2>Load Log</h2>
        <div class="load-log">
          @for (entry of loadLog(); track $index) {
            <div class="log-entry">
              <span class="log-time">{{ entry.time }}</span>
              <span class="log-name">{{ entry.name }}</span>
            </div>
          } @empty {
            <div class="log-entry log-entry--empty">
              Click on lazy tabs to see when content loads...
            </div>
          }
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

      .info-box {
        background: var(--lib-color-primary-50);
        border: var(--lib-border-width-thin) solid var(--lib-color-primary-200);
        border-radius: var(--lib-border-radius-lg);
        padding: var(--lib-spacing-4);
      }

      .info-box h3 {
        margin-block-end: var(--lib-spacing-2);
      }

      .info-box ol {
        margin: 0;
        padding-inline-start: var(--lib-spacing-5);
      }

      .info-box li {
        margin-block-end: var(--lib-spacing-1);
      }

      .info-box code {
        background: var(--lib-color-primary-100);
        padding: 2px 6px;
        border-radius: var(--lib-border-radius-sm);
        font-size: var(--lib-font-size-sm);
      }

      .hint {
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-500);
        margin-block-end: var(--lib-spacing-3);
      }

      .tab-content {
        min-height: 150px;
      }

      .timestamp {
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-success);
        font-weight: var(--lib-font-weight-medium);
      }

      .load-log {
        background: var(--lib-color-neutral-900);
        color: var(--lib-color-neutral-100);
        border-radius: var(--lib-border-radius-md);
        padding: var(--lib-spacing-3);
        font-family: monospace;
        font-size: var(--lib-font-size-sm);
      }

      .log-entry {
        display: flex;
        gap: var(--lib-spacing-3);
        padding: var(--lib-spacing-1) 0;
      }

      .log-time {
        color: var(--lib-color-neutral-400);
      }

      .log-name {
        color: var(--lib-color-success);
      }

      .log-entry--empty {
        color: var(--lib-color-neutral-500);
        font-style: italic;
      }
    `,
  ],
})
export class LazyTabsExampleComponent {
  readonly loadLog = signal<{ time: string; name: string }[]>([]);
  private loadedTabs = new Set<string>();

  getTime(): string {
    return new Date().toLocaleTimeString();
  }

  logLoad(name: string): string {
    const time = new Date().toLocaleTimeString();

    // Only log first load
    if (!this.loadedTabs.has(name)) {
      this.loadedTabs.add(name);
      this.loadLog.update(log => [...log, { time, name }]);
    }

    return time;
  }
}
