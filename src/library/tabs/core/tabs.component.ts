import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  contentChildren,
  model,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  AfterContentInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { TabsService } from '../services/tabs.service';
import type { TabChangeEvent, TabAnimation, TabOrientation } from '../types/tabs.types';
import { DEFAULT_TABS_CONFIG } from '../types/tabs.types';

/**
 * Tab container component.
 * 
 * Provides component-level TabsService instance for state management.
 * Supports lazy loading, animations, and programmatic control.
 * 
 * @example
 * ```html
 * <lib-tabs [(activeTabIndex)]="selectedIndex" (tabChange)="onTabChange($event)">
 *   <lib-tab label="Profile">Profile content</lib-tab>
 *   <lib-tab label="Settings">Settings content</lib-tab>
 * </lib-tabs>
 * ```
 */
@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  providers: [TabsService], // Component-level - each instance gets own service
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lib-tabs]': 'true',
    '[class.lib-tabs--horizontal]': 'orientation() === "horizontal"',
    '[class.lib-tabs--vertical]': 'orientation() === "vertical"',
    '[class.lib-tabs--animating]': 'tabsService.isAnimating()',
    '[attr.data-animation]': 'animation()',
  },
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  readonly tabsService = inject(TabsService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // ============================================
  // Inputs
  // ============================================
  
  /** Orientation of tab headers */
  readonly orientation = input<TabOrientation>(DEFAULT_TABS_CONFIG.orientation!);
  
  /** Animation type for tab transitions */
  readonly animation = input<TabAnimation>(DEFAULT_TABS_CONFIG.animation!);
  
  /** Animation duration in ms */
  readonly animationDuration = input(DEFAULT_TABS_CONFIG.animationDuration!);
  
  /** Keep inactive tab content in DOM (don't destroy) */
  readonly keepAlive = input(DEFAULT_TABS_CONFIG.keepAlive!);
  
  /** Currently active tab index (two-way bindable) */
  readonly activeTabIndex = model(0);

  // ============================================
  // Outputs
  // ============================================
  
  /** Emits when active tab changes */
  readonly tabChange = output<TabChangeEvent>();
  
  /** Emits when a tab is closed */
  readonly tabClose = output<{ index: number; tabId?: string }>();

  // ============================================
  // Content Queries
  // ============================================
  
  /** All tab components */
  readonly tabs = contentChildren(TabComponent);

  // ============================================
  // Computed Values
  // ============================================
  
  /** Active tab component */
  readonly activeTab = computed(() => {
    const allTabs = this.tabs();
    const idx = this.tabsService.activeIndex();
    return allTabs[idx] ?? null;
  });
  
  /** Animation direction for CSS class */
  readonly animationClass = computed(() => {
    const dir = this.tabsService.animationDirection();
    const anim = this.animation();
    if (anim === 'none') return '';
    return `lib-tabs__panel--entering-${dir}`;
  });

  // ============================================
  // Lifecycle
  // ============================================
  
  constructor() {
    // Sync service with activeTabIndex model
    effect(() => {
      const modelIndex = this.activeTabIndex();
      if (this.tabsService.activeIndex() !== modelIndex) {
        this.tabsService.selectTab(modelIndex);
      }
    });

    // Sync activeTabIndex model with service
    this.tabsService.onTabChange((event) => {
      this.activeTabIndex.set(event.currentIndex);
      this.tabChange.emit(event);
    });
  }

  ngAfterContentInit(): void {
    this.initializeTabs();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // ============================================
  // Public API
  // ============================================
  
  /**
   * Select a tab by index.
   */
  selectTab(index: number): boolean {
    return this.tabsService.selectTab(index);
  }

  /**
   * Select a tab by its id.
   */
  selectTabById(id: string): boolean {
    const tabIndex = this.tabs().findIndex(tab => tab.id() === id);
    if (tabIndex >= 0) {
      return this.tabsService.selectTab(tabIndex, id);
    }
    return false;
  }

  /**
   * Go to next tab.
   */
  nextTab(): boolean {
    return this.tabsService.nextTab();
  }

  /**
   * Go to previous tab.
   */
  previousTab(): boolean {
    return this.tabsService.previousTab();
  }

  /**
   * Go to first tab.
   */
  firstTab(): boolean {
    return this.tabsService.firstTab();
  }

  /**
   * Go to last tab.
   */
  lastTab(): boolean {
    return this.tabsService.lastTab();
  }

  // ============================================
  // Event Handlers
  // ============================================
  
  onTabHeaderClick(tab: TabComponent, index: number): void {
    if (!tab.disabled()) {
      this.tabsService.selectTab(index, tab.id());
    }
  }

  onTabClose(tab: TabComponent, index: number, event: Event): void {
    event.stopPropagation();
    this.tabClose.emit({ index, tabId: tab.id() });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Only handle when focus is on tab headers
    const target = event.target as HTMLElement;
    if (!target.classList.contains('lib-tabs__header-item')) return;

    const isHorizontal = this.orientation() === 'horizontal';
    
    switch (event.key) {
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this.focusPreviousTab();
        }
        break;
        
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this.focusNextTab();
        }
        break;
        
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          this.focusPreviousTab();
        }
        break;
        
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          this.focusNextTab();
        }
        break;
        
      case 'Home':
        event.preventDefault();
        this.focusTab(0);
        break;
        
      case 'End':
        event.preventDefault();
        this.focusTab(this.tabs().length - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focused = this.getFocusedTabIndex();
        if (focused >= 0) {
          const tab = this.tabs()[focused];
          if (!tab.disabled()) {
            this.tabsService.selectTab(focused, tab.id());
          }
        }
        break;
    }
  }

  onAnimationEnd(): void {
    this.tabsService.endAnimation();
  }

  // ============================================
  // Private Methods
  // ============================================
  
  private initializeTabs(): void {
    const allTabs = this.tabs();
    
    // Set indices on tabs
    allTabs.forEach((tab, index) => {
      tab.setIndex(index);
    });
    
    // Initialize service with tab count
    this.tabsService.setTabCount(allTabs.length);
    
    // Set initial active tab
    const initialIndex = this.activeTabIndex();
    if (initialIndex > 0 && initialIndex < allTabs.length) {
      this.tabsService.selectTab(initialIndex);
    }
  }

  private focusNextTab(): void {
    const tabs = this.tabs();
    let currentIndex = this.getFocusedTabIndex();
    
    for (let i = 1; i <= tabs.length; i++) {
      const nextIndex = (currentIndex + i) % tabs.length;
      if (!tabs[nextIndex].disabled()) {
        this.focusTab(nextIndex);
        break;
      }
    }
  }

  private focusPreviousTab(): void {
    const tabs = this.tabs();
    let currentIndex = this.getFocusedTabIndex();
    
    for (let i = 1; i <= tabs.length; i++) {
      const prevIndex = (currentIndex - i + tabs.length) % tabs.length;
      if (!tabs[prevIndex].disabled()) {
        this.focusTab(prevIndex);
        break;
      }
    }
  }

  private focusTab(index: number): void {
    const headers = this.elementRef.nativeElement.querySelectorAll('.lib-tabs__header-item');
    const header = headers[index] as HTMLElement;
    if (header) {
      header.focus();
    }
  }

  private getFocusedTabIndex(): number {
    const headers = this.elementRef.nativeElement.querySelectorAll('.lib-tabs__header-item');
    const focused = document.activeElement;
    return Array.from(headers).indexOf(focused as Element);
  }

  /** TrackBy function for tabs - uses internal unique ID */
  trackByTab = (_index: number, tab: TabComponent) => tab.internalId;
}
