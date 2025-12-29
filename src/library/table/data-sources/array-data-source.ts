import { signal, Signal, computed } from '@angular/core';
import { TableDataSource } from '../types/table.types';

/**
 * Data source that wraps a plain array.
 */
export class ArrayDataSource<T> implements TableDataSource<T> {
  private readonly _data = signal<T[]>([]);

  readonly data: Signal<T[]> = this._data.asReadonly();
  readonly loading = signal(false);
  readonly totalCount: Signal<number> = computed(() => this._data().length);

  constructor(initialData: T[] = []) {
    this._data.set(initialData);
  }

  /**
   * Update the data in the source
   */
  setData(data: T[]): void {
    this._data.set(data);
  }

  /**
   * Add an item to the data source
   */
  add(item: T): void {
    this._data.update(current => [...current, item]);
  }

  /**
   * Remove an item from the data source
   */
  remove(predicate: (item: T) => boolean): void {
    this._data.update(current => current.filter(item => !predicate(item)));
  }

  /**
   * Update an item in the data source
   */
  update(predicate: (item: T) => boolean, updater: (item: T) => T): void {
    this._data.update(current => current.map(item => (predicate(item) ? updater(item) : item)));
  }
}
