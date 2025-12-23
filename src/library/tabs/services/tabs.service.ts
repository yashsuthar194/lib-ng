import { Injectable, signal, computed } from '@angular/core';
import type { TabChangeEvent, AnimationDirection } from '../types/tabs.types';

/**
 * TabsService - Component-level state management for tabs.
 * 
 * NOT provided in 'root' - must be provided at component level
 * so each TabsComponent instance gets its own service instance.
 * 
 * @example
 * ```typescript
 * @Component({
 *   providers: [TabsService], // Each instance gets own service
 * })
 * export class TabsComponent { }
 * ```
 */
@Injectable()
export class TabsService {
  // ============================================
  // State Signals
  // ============================================
  
  /** Total number of tabs */
  private readonly _tabCount = signal(0);
  
  /** Currently active tab index */
  private readonly _activeIndex = signal(0);
  
  /** Previously active tab index (for animations) */
  private readonly _previousIndex = signal(-1);
  
  /** Set of tab indices that have been activated (for lazy loading) */
  private readonly _activatedTabs = signal<Set<number>>(new Set([0]));
  
  /** Animation direction for slide transitions */
  private readonly _animationDirection = signal<AnimationDirection>('right');
  
  /** Whether animation is currently in progress */
  private readonly _isAnimating = signal(false);

  // ============================================
  // Public Readonly Signals
  // ============================================
  
  readonly tabCount = this._tabCount.asReadonly();
  readonly activeIndex = this._activeIndex.asReadonly();
  readonly previousIndex = this._previousIndex.asReadonly();
  readonly animationDirection = this._animationDirection.asReadonly();
  readonly isAnimating = this._isAnimating.asReadonly();
  
  // ============================================
  // Computed Values
  // ============================================
  
  /** Whether we can go to previous tab */
  readonly canGoPrevious = computed(() => this._activeIndex() > 0);
  
  /** Whether we can go to next tab */
  readonly canGoNext = computed(() => this._activeIndex() < this._tabCount() - 1);

  // ============================================
  // Event Callbacks
  // ============================================
  
  private _onTabChange: ((event: TabChangeEvent) => void) | null = null;

  /**
   * Register callback for tab change events.
   */
  onTabChange(callback: (event: TabChangeEvent) => void): void {
    this._onTabChange = callback;
  }

  // ============================================
  // Tab Registration
  // ============================================
  
  /**
   * Set total tab count (called by TabsComponent after content init).
   */
  setTabCount(count: number): void {
    this._tabCount.set(count);
  }

  // ============================================
  // Tab Activation
  // ============================================
  
  /**
   * Check if a tab has been activated before (for lazy loading).
   */
  hasBeenActivated(index: number): boolean {
    return this._activatedTabs().has(index);
  }

  /**
   * Select a specific tab by index.
   */
  selectTab(index: number, tabId?: string): boolean {
    // Validate index
    if (index < 0 || index >= this._tabCount()) {
      console.warn(`Tab index ${index} is out of bounds (0-${this._tabCount() - 1})`);
      return false;
    }

    // No-op if already active
    if (index === this._activeIndex()) {
      return false;
    }

    const previousIndex = this._activeIndex();
    
    // Determine animation direction
    const direction = index > previousIndex ? 'right' : 'left';
    this._animationDirection.set(direction);
    
    // Update state
    this._previousIndex.set(previousIndex);
    this._activeIndex.set(index);
    
    // Mark tab as activated (for lazy loading)
    this._activatedTabs.update(set => {
      const newSet = new Set(set);
      newSet.add(index);
      return newSet;
    });

    // Emit event
    if (this._onTabChange) {
      this._onTabChange({
        previousIndex,
        currentIndex: index,
        tabId,
      });
    }

    return true;
  }

  /**
   * Go to next tab.
   */
  nextTab(): boolean {
    if (!this.canGoNext()) return false;
    return this.selectTab(this._activeIndex() + 1);
  }

  /**
   * Go to previous tab.
   */
  previousTab(): boolean {
    if (!this.canGoPrevious()) return false;
    return this.selectTab(this._activeIndex() - 1);
  }

  /**
   * Go to first tab.
   */
  firstTab(): boolean {
    return this.selectTab(0);
  }

  /**
   * Go to last tab.
   */
  lastTab(): boolean {
    return this.selectTab(this._tabCount() - 1);
  }

  // ============================================
  // Animation Control
  // ============================================
  
  /**
   * Mark animation as started.
   */
  startAnimation(): void {
    this._isAnimating.set(true);
  }

  /**
   * Mark animation as complete.
   */
  endAnimation(): void {
    this._isAnimating.set(false);
  }

  // ============================================
  // Reset
  // ============================================
  
  /**
   * Reset to initial state.
   */
  reset(): void {
    this._activeIndex.set(0);
    this._previousIndex.set(-1);
    this._activatedTabs.set(new Set([0]));
    this._animationDirection.set('right');
    this._isAnimating.set(false);
  }
}
