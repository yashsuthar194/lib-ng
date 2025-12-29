import { Signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// ============================================
// Sort Types
// ============================================
export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}

// ============================================
// Pagination Types
// ============================================
export interface PageState {
  index: number;
  size: number;
}

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

// ============================================
// Column Definition Types
// ============================================
export interface ColumnDef<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

// ============================================
// Data Source Types
// ============================================
export type DataInput<T> = T[] | Signal<T[]> | Observable<T[]> | FormArray<FormGroup>;

export interface TableDataSource<T> {
  readonly data: Signal<T[]>;
  readonly loading?: Signal<boolean>;
  readonly totalCount?: Signal<number>;

  connect?(): void;
  disconnect?(): void;
}

// ============================================
// Row Context Types
// ============================================
export interface RowContext<T> {
  $implicit: T;
  index: number;
  first: boolean;
  last: boolean;
  even: boolean;
  odd: boolean;
}

export interface FormRowContext<T> extends RowContext<T> {
  formGroup: FormGroup;
}

// ============================================
// Selection Types
// ============================================
export type SelectionMode = 'none' | 'single' | 'multiple';

export interface SelectionState<T> {
  selected: T[];
  isAllSelected: boolean;
  hasSelection: boolean;
}

// ============================================
// Table Configuration
// ============================================
export interface TableConfig {
  pageSizeOptions: number[];
  defaultPageSize: number;
  showFirstLastButtons: boolean;
  emptyMessage: string;
}

export const DEFAULT_TABLE_CONFIG: TableConfig = {
  pageSizeOptions: [5, 10, 25, 50],
  defaultPageSize: 10,
  showFirstLastButtons: true,
  emptyMessage: 'No data available',
};
