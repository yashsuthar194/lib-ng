import {
  Component,
  input,
  signal,
  computed,
  contentChild,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '../services/tabs.service';

/** Counter for generating unique internal tab IDs */
let nextTabId = 0;

/**
 * Individual tab within a lib-tabs container.
 * 
 * Supports lazy loading via ng-template with #lazy reference.
 * 
 * @example
 * ```html
 * <!-- Eager loading -->
 * <lib-tab label="Profile">
 *   <app-profile />
 * </lib-tab>
 * 
 * <!-- Lazy loading -->
 * <lib-tab label="Analytics">
 *   <ng-template #lazy>
 *     <app-heavy-analytics />
 *   </ng-template>
 * </lib-tab>
 * ```
 */
@Component({
  selector: 'lib-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Capture eager content as a template for later projection -->
    <ng-template #eagerContent>
      <ng-content />
    </ng-template>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  private readonly tabsService = inject(TabsService, { optional: true });
  
  /** Internal unique ID for tracking (never changes) */
  readonly internalId = `lib-tab-${nextTabId++}`;
  
  // ============================================
  // Inputs
  // ============================================
  
  /** Tab label displayed in header */
  readonly label = input.required<string>();
  
  /** Optional unique identifier (for external use) */
  readonly id = input<string>();
  
  /** Whether this tab is disabled */
  readonly disabled = input(false);
  
  /** Optional icon (emoji, text, or template) */
  readonly icon = input<string>();
  
  /** Optional badge content (for notifications) */
  readonly badge = input<string | number>();
  
  /** Whether tab can be closed */
  readonly closable = input(false);

  // ============================================
  // Content Queries
  // ============================================
  
  /** 
   * Lazy content template.
   * If provided, content only renders when tab is first activated.
   */
  readonly lazyTemplate = contentChild<TemplateRef<unknown>>('lazy');
  
  /** Eager content template (captured from ng-content) */
  @ViewChild('eagerContent', { static: true }) eagerTemplate!: TemplateRef<unknown>;

  // ============================================
  // State (managed by parent TabsComponent)
  // ============================================
  
  /** Index of this tab (set by parent) */
  readonly index = signal(-1);
  
  /** Whether this tab is currently active */
  readonly isActive = computed(() => {
    const idx = this.index();
    if (idx < 0 || !this.tabsService) return false;
    return this.tabsService.activeIndex() === idx;
  });
  
  /** Whether this tab has been activated at least once (for lazy loading) */
  readonly wasActivated = computed(() => {
    const idx = this.index();
    if (idx < 0 || !this.tabsService) return false;
    return this.tabsService.hasBeenActivated(idx);
  });
  
  /** Whether this tab uses lazy loading */
  readonly isLazy = computed(() => !!this.lazyTemplate());
  
  /** Get the content template (lazy or eager) */
  readonly contentTemplate = computed(() => {
    return this.lazyTemplate() ?? this.eagerTemplate;
  });

  // ============================================
  // Methods
  // ============================================
  
  /**
   * Set the index of this tab (called by parent).
   */
  setIndex(index: number): void {
    this.index.set(index);
  }

  /**
   * Activate this tab.
   */
  activate(): void {
    if (!this.disabled() && this.tabsService) {
      this.tabsService.selectTab(this.index(), this.id());
    }
  }
}

