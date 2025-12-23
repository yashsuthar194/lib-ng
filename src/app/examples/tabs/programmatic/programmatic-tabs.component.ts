import { Component, signal, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TabsComponent, TabComponent, TabChangeEvent } from '../../../../library/tabs';

/**
 * Programmatic Tabs Example
 * 
 * Demonstrates programmatic control of tabs via API methods.
 */
@Component({
  selector: 'app-programmatic-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Programmatic Control</h1>
      <p class="description">Control tabs programmatically using the component API.</p>

      <!-- Control Buttons -->
      <section class="example-section">
        <h2>Tab Navigation Controls</h2>
        <div class="controls">
          <button class="btn" (click)="goToFirst()">First Tab</button>
          <button class="btn" (click)="goToPrevious()">← Previous</button>
          <button class="btn" (click)="goToNext()">Next →</button>
          <button class="btn" (click)="goToLast()">Last Tab</button>
        </div>
        <div class="controls">
          <button class="btn btn--primary" (click)="goToTab(0)">Tab 1</button>
          <button class="btn btn--primary" (click)="goToTab(1)">Tab 2</button>
          <button class="btn btn--primary" (click)="goToTab(2)">Tab 3</button>
          <button class="btn btn--primary" (click)="goToTab(3)">Tab 4</button>
        </div>
      </section>

      <!-- Tabs Component -->
      <section class="example-section">
        <div class="example-container">
          <lib-tabs #tabsRef (tabChange)="onTabChange($event)">
            <lib-tab label="Step 1" id="step-1">
              <div class="step-content">
                <h3>Step 1: Getting Started</h3>
                <p>Welcome to the wizard! Click "Next" to continue.</p>
                <button class="btn btn--primary" (click)="goToNext()">
                  Continue →
                </button>
              </div>
            </lib-tab>
            <lib-tab label="Step 2" id="step-2">
              <div class="step-content">
                <h3>Step 2: Configuration</h3>
                <p>Configure your settings here.</p>
                <div class="btn-group">
                  <button class="btn" (click)="goToPrevious()">← Back</button>
                  <button class="btn btn--primary" (click)="goToNext()">Continue →</button>
                </div>
              </div>
            </lib-tab>
            <lib-tab label="Step 3" id="step-3">
              <div class="step-content">
                <h3>Step 3: Review</h3>
                <p>Review your selections before completing.</p>
                <div class="btn-group">
                  <button class="btn" (click)="goToPrevious()">← Back</button>
                  <button class="btn btn--primary" (click)="goToNext()">Continue →</button>
                </div>
              </div>
            </lib-tab>
            <lib-tab label="Step 4" id="step-4">
              <div class="step-content">
                <h3>Step 4: Complete!</h3>
                <p>🎉 Congratulations! You've completed the wizard.</p>
                <button class="btn" (click)="goToFirst()">Start Over</button>
              </div>
            </lib-tab>
          </lib-tabs>
        </div>
      </section>

      <!-- Event Log -->
      <section class="example-section">
        <h2>Event Log</h2>
        <div class="event-log">
          @for (event of eventLog(); track $index) {
            <div class="event-item">{{ event }}</div>
          }
          @empty {
            <div class="event-item event-item--empty">No events yet. Click on tabs to see events.</div>
          }
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
    
    .controls {
      display: flex;
      flex-wrap: wrap;
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
    
    .btn--primary {
      background: var(--lib-color-primary-500);
      border-color: var(--lib-color-primary-500);
      color: white;
    }
    
    .btn--primary:hover {
      background: var(--lib-color-primary-600);
    }
    
    .step-content {
      min-height: 150px;
    }
    
    .btn-group {
      display: flex;
      gap: var(--lib-spacing-2);
      margin-block-start: var(--lib-spacing-4);
    }
    
    .event-log {
      background: var(--lib-color-neutral-50);
      border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
      border-radius: var(--lib-border-radius-md);
      padding: var(--lib-spacing-3);
      max-height: 200px;
      overflow-y: auto;
      font-family: monospace;
      font-size: var(--lib-font-size-xs);
    }
    
    .event-item {
      padding: var(--lib-spacing-1) 0;
      border-bottom: 1px solid var(--lib-color-neutral-200);
    }
    
    .event-item:last-child {
      border-bottom: none;
    }
    
    .event-item--empty {
      color: var(--lib-color-neutral-400);
      font-style: italic;
    }
  `],
})
export class ProgrammaticTabsExampleComponent {
  @ViewChild('tabsRef') tabsRef!: TabsComponent;
  
  readonly eventLog = signal<string[]>([]);

  goToTab(index: number): void {
    this.tabsRef.selectTab(index);
  }

  goToNext(): void {
    this.tabsRef.nextTab();
  }

  goToPrevious(): void {
    this.tabsRef.previousTab();
  }

  goToFirst(): void {
    this.tabsRef.firstTab();
  }

  goToLast(): void {
    this.tabsRef.lastTab();
  }

  onTabChange(event: TabChangeEvent): void {
    const timestamp = new Date().toLocaleTimeString();
    const log = `[${timestamp}] Tab changed: ${event.previousIndex} → ${event.currentIndex}${event.tabId ? ` (${event.tabId})` : ''}`;
    this.eventLog.update(logs => [log, ...logs.slice(0, 9)]);
  }
}
