import { Signal, computed, signal } from '@angular/core';
import { TableDataSource } from '../types/table.types';

/**
 * Data source that wraps a Signal<T[]>.
 */
export class SignalDataSource<T> implements TableDataSource<T> {
  readonly data: Signal<T[]>;
  readonly loading = signal(false);
  readonly totalCount: Signal<number>;

  constructor(dataSignal: Signal<T[]>) {
    this.data = dataSignal;
    this.totalCount = computed(() => this.data().length);
  }
}
