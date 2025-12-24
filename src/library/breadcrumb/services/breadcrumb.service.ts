/**
 * Breadcrumb Service
 *
 * Manages breadcrumb state with signal-based reactivity.
 * Supports auto-generation from router and programmatic control.
 * Uses Angular 17+ features: signals, DestroyRef, takeUntilDestroyed.
 */

import {
  Injectable,
  signal,
  computed,
  inject,
  DestroyRef,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, of, Observable, firstValueFrom } from 'rxjs';
import type {
  BreadcrumbItem,
  BreadcrumbOverrideMode,
  RouteBreadcrumb,
  RouteBreadcrumbConfig,
} from '../types/breadcrumb.types';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  /** Internal breadcrumb items */
  private readonly _items = signal<BreadcrumbItem[]>([]);

  /** Whether auto-generation from router is enabled */
  private readonly _autoGenerate = signal<boolean>(false);

  /** Override mode for hybrid control */
  private readonly _overrideMode = signal<BreadcrumbOverrideMode>('none');

  /** Partial overrides (keyed by ID) */
  private readonly _overrides = signal<Map<string, Partial<BreadcrumbItem>>>(new Map());

  /** Full override items (when overrideMode is 'full') */
  private readonly _fullOverrideItems = signal<BreadcrumbItem[]>([]);

  // ============================================
  // PUBLIC READONLY STATE
  // ============================================

  /** Current breadcrumb items (read-only) */
  readonly items = computed(() => {
    const mode = this._overrideMode();

    if (mode === 'full') {
      return this._fullOverrideItems();
    }

    const baseItems = this._items();
    const overrides = this._overrides();

    if (mode === 'partial' && overrides.size > 0) {
      return baseItems.map(item => {
        const override = item.id ? overrides.get(item.id) : undefined;
        return override ? { ...item, ...override } : item;
      });
    }

    return baseItems;
  });

  /** Whether auto-generation is active */
  readonly autoGenerate = computed(() => this._autoGenerate());

  /** Current override mode */
  readonly overrideMode = computed(() => this._overrideMode());

  constructor() {
    // Listen to router navigation events
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this._autoGenerate() && this._overrideMode() !== 'full') {
        this.regenerateFromRoute();
      }
    });
  }

  // ============================================
  // AUTO-GENERATION CONTROL
  // ============================================

  /** Enable auto-generation from router */
  enableAutoGenerate(): void {
    this._autoGenerate.set(true);
    this.regenerateFromRoute();
  }

  /** Disable auto-generation */
  disableAutoGenerate(): void {
    this._autoGenerate.set(false);
  }

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  /** Set entire breadcrumb trail (disables auto-generate) */
  set(items: BreadcrumbItem[]): void {
    this._autoGenerate.set(false);
    this._overrideMode.set('none');
    this._items.set(this.ensureIds(items));
  }

  /** Add item to end of trail */
  push(item: BreadcrumbItem): void {
    const itemWithId = this.ensureId(item);
    this._items.update(items => [...items, itemWithId]);
  }

  /** Remove and return last item */
  pop(): BreadcrumbItem | undefined {
    const items = this._items();
    if (items.length === 0) return undefined;

    const last = items[items.length - 1];
    this._items.update(arr => arr.slice(0, -1));
    return last;
  }

  /** Clear all items */
  clear(): void {
    this._items.set([]);
    this._overrides.set(new Map());
    this._overrideMode.set('none');
  }

  // ============================================
  // UPDATE METHODS (Multiple Strategies)
  // ============================================

  /** Update item by ID (RECOMMENDED) */
  updateById(id: string, changes: Partial<BreadcrumbItem>): void {
    this._items.update(items =>
      items.map(item => item.id === id ? { ...item, ...changes } : item)
    );
  }

  /** Update item by route path/link */
  updateByPath(path: string, changes: Partial<BreadcrumbItem>): void {
    this._items.update(items =>
      items.map(item => {
        const itemPath = Array.isArray(item.link) ? item.link.join('/') : item.link;
        return itemPath === path ? { ...item, ...changes } : item;
      })
    );
  }

  /** Update item by label match */
  updateByLabel(label: string, changes: Partial<BreadcrumbItem>): void {
    this._items.update(items =>
      items.map(item => item.label === label ? { ...item, ...changes } : item)
    );
  }

  /** Update item by index (legacy support) */
  updateByIndex(index: number, changes: Partial<BreadcrumbItem>): void {
    this._items.update(items =>
      items.map((item, i) => i === index ? { ...item, ...changes } : item)
    );
  }

  // ============================================
  // FIND METHODS
  // ============================================

  /** Find item by ID */
  findById(id: string): BreadcrumbItem | undefined {
    return this.items().find(item => item.id === id);
  }

  /** Find item by path */
  findByPath(path: string): BreadcrumbItem | undefined {
    return this.items().find(item => {
      const itemPath = Array.isArray(item.link) ? item.link.join('/') : item.link;
      return itemPath === path;
    });
  }

  // ============================================
  // REMOVE METHODS
  // ============================================

  /** Remove item by ID */
  removeById(id: string): void {
    this._items.update(items => items.filter(item => item.id !== id));
  }

  /** Remove item by index */
  removeByIndex(index: number): void {
    this._items.update(items => items.filter((_, i) => i !== index));
  }

  // ============================================
  // OVERRIDE MANAGEMENT (for auto-generate mode)
  // ============================================

  /** Override specific item by ID while keeping auto-generation */
  overrideById(id: string, changes: Partial<BreadcrumbItem>): void {
    this._overrideMode.set('partial');
    this._overrides.update(map => {
      const newMap = new Map(map);
      newMap.set(id, { ...map.get(id), ...changes });
      return newMap;
    });
  }

  /** Completely override with custom items (pauses auto-generation) */
  overrideAll(items: BreadcrumbItem[]): void {
    this._overrideMode.set('full');
    this._fullOverrideItems.set(this.ensureIds(items));
  }

  /** Clear all overrides */
  clearOverrides(): void {
    this._overrides.set(new Map());
    this._fullOverrideItems.set([]);
    this._overrideMode.set('none');
  }

  /** Restore auto-generation and clear full override */
  restoreAutoGenerate(): void {
    this._overrideMode.set('none');
    this._fullOverrideItems.set([]);
    if (this._autoGenerate()) {
      this.regenerateFromRoute();
    }
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  /** Regenerate breadcrumbs from current route */
  private regenerateFromRoute(): void {
    const root = this.route.root;
    const items = this.buildBreadcrumbs(root.snapshot);
    this._items.set(items);
  }

  /** Recursively build breadcrumb trail from route tree */
  private buildBreadcrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [];

    let current: ActivatedRouteSnapshot | null = route;
    while (current) {
      const breadcrumbData = current.data['breadcrumb'] as RouteBreadcrumb | undefined;

      if (breadcrumbData) {
        const item = this.createItemFromRoute(current, breadcrumbData);
        if (item) {
          items.push(item);
        }
      }

      current = current.firstChild;
    }

    // Mark last item as current
    if (items.length > 0) {
      items[items.length - 1].current = true;
    }

    return items;
  }

  /** Create breadcrumb item from route data */
  private createItemFromRoute(
    route: ActivatedRouteSnapshot,
    data: RouteBreadcrumb
  ): BreadcrumbItem | null {
    const config = typeof data === 'string' ? { label: data } : data as RouteBreadcrumbConfig;

    // Build path from route segments
    const pathSegments = this.getFullPath(route);
    const link = '/' + pathSegments.join('/');

    // Generate ID from path or use custom
    const id = config.id ?? this.generateIdFromPath(pathSegments);

    return {
      id,
      label: config.label,
      link,
      icon: config.icon,
      current: false,
      disabled: false,
    };
  }

  /** Get full path segments from route */
  private getFullPath(route: ActivatedRouteSnapshot): string[] {
    const segments: string[] = [];
    let current: ActivatedRouteSnapshot | null = route;

    while (current) {
      if (current.url.length > 0) {
        segments.unshift(...current.url.map(s => s.path));
      }
      current = current.parent;
    }

    return segments;
  }

  /** Generate unique ID from path segments */
  private generateIdFromPath(segments: string[]): string {
    if (segments.length === 0) return 'home';
    return segments.join('-').replace(/[^a-zA-Z0-9-]/g, '');
  }

  /** Ensure all items have IDs */
  private ensureIds(items: BreadcrumbItem[]): BreadcrumbItem[] {
    return items.map((item, index) => this.ensureId(item, index));
  }

  /** Ensure single item has ID */
  private ensureId(item: BreadcrumbItem, index?: number): BreadcrumbItem {
    if (item.id) return item;

    // Generate from link if available
    if (item.link) {
      const path = Array.isArray(item.link) ? item.link.join('-') : item.link;
      return { ...item, id: path.replace(/[^a-zA-Z0-9-]/g, '') || `item-${index ?? 0}` };
    }

    // Generate from label
    return { ...item, id: item.label.toLowerCase().replace(/\s+/g, '-') };
  }
}
