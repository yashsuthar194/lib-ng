import { Signal, isSignal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable, isObservable } from 'rxjs';
import { TableDataSource, DataInput } from '../types/table.types';
import { ArrayDataSource } from './array-data-source';
import { SignalDataSource } from './signal-data-source';
import { ObservableDataSource } from './observable-data-source';
import { FormArrayDataSource } from './form-array-data-source';

/**
 * Factory function to create the appropriate data source based on input type.
 * Supports: T[], Signal<T[]>, Observable<T[]>, FormArray<FormGroup>
 */
export function createDataSource<T>(input: DataInput<T>): TableDataSource<T> {
  if (Array.isArray(input)) {
    return new ArrayDataSource(input);
  }

  if (isSignal(input)) {
    return new SignalDataSource(input as Signal<T[]>);
  }

  if (isObservable(input)) {
    return new ObservableDataSource(input as Observable<T[]>);
  }

  if (input instanceof FormArray) {
    return new FormArrayDataSource(input as FormArray<FormGroup>);
  }

  throw new Error(
    `Unsupported data source type. Expected T[], Signal<T[]>, Observable<T[]>, or FormArray. ` +
    `Received: ${typeof input}`
  );
}

/**
 * Type guard to check if input is already a TableDataSource
 */
export function isTableDataSource<T>(input: unknown): input is TableDataSource<T> {
  return (
    input !== null &&
    typeof input === 'object' &&
    'data' in input &&
    isSignal((input as TableDataSource<T>).data)
  );
}
