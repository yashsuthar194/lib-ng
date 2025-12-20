import { Signal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TableDataSource } from '../types/table.types';

interface ObservableState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

/**
 * Data source that wraps an Observable<T[]>.
 */
export class ObservableDataSource<T> implements TableDataSource<T> {
  private readonly _state: Signal<ObservableState<T>>;

  readonly data: Signal<T[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<Error | null>;
  readonly totalCount: Signal<number>;

  constructor(dataObservable: Observable<T[]>) {
    // Convert observable to signal with loading state
    this._state = toSignal(
      dataObservable.pipe(
        map(data => ({ data, loading: false, error: null })),
        startWith({ data: [] as T[], loading: true, error: null }),
        catchError(error => of({ data: [] as T[], loading: false, error }))
      ),
      { initialValue: { data: [], loading: true, error: null } }
    );

    this.data = computed(() => this._state().data);
    this.loading = computed(() => this._state().loading);
    this.error = computed(() => this._state().error);
    this.totalCount = computed(() => this.data().length);
  }
}
