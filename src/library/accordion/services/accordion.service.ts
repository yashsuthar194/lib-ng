/**
 * Accordion Service
 *
 * Manages accordion state with signal-based reactivity.
 * Provided at accordion component level for isolation.
 * Properly cleans up to prevent memory leaks.
 */

import { Injectable, signal, computed, effect, DestroyRef, inject, ElementRef } from '@angular/core';
import type { AccordionChangeEvent, AccordionItemState } from '../types/accordion.types';

@Injectable()
export class AccordionService {
  private readonly destroyRef = inject(DestroyRef);

  /** Whether multiple panels can be open simultaneously */
  private readonly _multipleMode = signal<boolean>(false);

  /** Set of expanded panel indices */
  private readonly _expandedIndices = signal<Set<number>>(new Set());

  /** Registered panel states */
  private readonly _panels = signal<AccordionItemState[]>([]);

  /** Panel header elements for focus management */
  private readonly _headerElements = new Map<number, HTMLElement>();

  /** Callback for accordion change events */
  private _onChangeCallback?: (event: AccordionChangeEvent) => void;

  /** Read-only access to expanded indices */
  readonly expandedIndices = computed(() => Array.from(this._expandedIndices()));

  constructor() {
    // Cleanup on destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      this._headerElements.clear();
      this._panels.set([]);
      this._expandedIndices.set(new Set());
    });
  }

  // ============================================
  // CONFIGURATION
  // ============================================

  /** Set multiple expand mode */
  setMultipleMode(multiple: boolean): void {
    this._multipleMode.set(multiple);
    // If switching to single mode, keep only first expanded
    if (!multiple) {
      const expanded = this._expandedIndices();
      if (expanded.size > 1) {
        const first = Array.from(expanded)[0];
        this._expandedIndices.set(new Set([first]));
      }
    }
  }

  /** Set change callback */
  setOnChangeCallback(callback: (event: AccordionChangeEvent) => void): void {
    this._onChangeCallback = callback;
  }

  // ============================================
  // PANEL REGISTRATION
  // ============================================

  /** Register a panel and return its index */
  register(state: Omit<AccordionItemState, 'index'>): number {
    const panels = this._panels();
    const index = panels.length;
    this._panels.set([...panels, { ...state, index }]);

    // If initially expanded, add to expanded set
    if (state.expanded) {
      this.expand(index, 'programmatic', state.id);
    }

    return index;
  }

  /** Register header element for focus management */
  registerHeader(index: number, element: HTMLElement): void {
    this._headerElements.set(index, element);
  }

  /** Unregister a panel */
  unregister(index: number): void {
    this._headerElements.delete(index);
  }

  // ============================================
  // STATE QUERIES
  // ============================================

  /** Check if panel at index is expanded */
  isExpanded(index: number): boolean {
    return this._expandedIndices().has(index);
  }

  /** Get expanded indices as array */
  getExpandedIndices(): number[] {
    return Array.from(this._expandedIndices());
  }

  /** Get panel state by index */
  getPanelState(index: number): AccordionItemState | undefined {
    return this._panels()[index];
  }

  // ============================================
  // STATE MUTATIONS
  // ============================================

  /** Expand panel by index */
  expand(index: number, source: 'user' | 'programmatic' = 'programmatic', itemId?: string): void {
    const panel = this._panels()[index];
    if (!panel || panel.disabled || this.isExpanded(index)) return;

    const expanded = new Set(this._expandedIndices());

    // In single mode, collapse all others
    if (!this._multipleMode()) {
      expanded.clear();
    }

    expanded.add(index);
    this._expandedIndices.set(expanded);

    this._emitChange(itemId ?? panel.id, index, true, source);
  }

  /** Collapse panel by index */
  collapse(index: number, source: 'user' | 'programmatic' = 'programmatic', itemId?: string): void {
    const panel = this._panels()[index];
    if (!panel || !this.isExpanded(index)) return;

    const expanded = new Set(this._expandedIndices());
    expanded.delete(index);
    this._expandedIndices.set(expanded);

    this._emitChange(itemId ?? panel.id, index, false, source);
  }

  /** Toggle panel by index */
  toggle(index: number, source: 'user' | 'programmatic' = 'user', itemId?: string): void {
    if (this.isExpanded(index)) {
      this.collapse(index, source, itemId);
    } else {
      this.expand(index, source, itemId);
    }
  }

  /** Expand panel by ID */
  expandById(id: string): void {
    const panel = this._panels().find(p => p.id === id);
    if (panel) {
      this.expand(panel.index, 'programmatic', id);
    }
  }

  /** Collapse panel by ID */
  collapseById(id: string): void {
    const panel = this._panels().find(p => p.id === id);
    if (panel) {
      this.collapse(panel.index, 'programmatic', id);
    }
  }

  /** Expand all panels (only effective in multiple mode) */
  expandAll(): void {
    if (!this._multipleMode()) return;

    const panels = this._panels();
    const expanded = new Set<number>();

    panels.forEach((panel, index) => {
      if (!panel.disabled) {
        expanded.add(index);
      }
    });

    this._expandedIndices.set(expanded);
  }

  /** Collapse all panels */
  collapseAll(): void {
    this._expandedIndices.set(new Set());
  }

  // ============================================
  // FOCUS MANAGEMENT
  // ============================================

  /** Focus next panel header */
  focusNext(currentIndex: number): void {
    const panels = this._panels();
    let nextIndex = currentIndex + 1;

    // Find next non-disabled panel
    while (nextIndex < panels.length) {
      if (!panels[nextIndex].disabled) {
        this._focusHeader(nextIndex);
        return;
      }
      nextIndex++;
    }

    // Wrap to first
    this.focusFirst();
  }

  /** Focus previous panel header */
  focusPrevious(currentIndex: number): void {
    const panels = this._panels();
    let prevIndex = currentIndex - 1;

    // Find previous non-disabled panel
    while (prevIndex >= 0) {
      if (!panels[prevIndex].disabled) {
        this._focusHeader(prevIndex);
        return;
      }
      prevIndex--;
    }

    // Wrap to last
    this.focusLast();
  }

  /** Focus first panel header */
  focusFirst(): void {
    const panels = this._panels();
    for (let i = 0; i < panels.length; i++) {
      if (!panels[i].disabled) {
        this._focusHeader(i);
        return;
      }
    }
  }

  /** Focus last panel header */
  focusLast(): void {
    const panels = this._panels();
    for (let i = panels.length - 1; i >= 0; i--) {
      if (!panels[i].disabled) {
        this._focusHeader(i);
        return;
      }
    }
  }

  // ============================================
  // PRIVATE
  // ============================================

  private _focusHeader(index: number): void {
    const element = this._headerElements.get(index);
    if (element) {
      element.focus();
    }
  }

  private _emitChange(
    itemId: string,
    index: number,
    expanded: boolean,
    source: 'user' | 'programmatic'
  ): void {
    if (this._onChangeCallback) {
      this._onChangeCallback({ itemId, index, expanded, source });
    }
  }
}
