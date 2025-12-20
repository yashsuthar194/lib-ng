// Public API for the Table Library

// Core Component
export { TableComponent } from './core';

// Column Definition
export { ColumnDefDirective } from './column-def';

// Data Sources
export {
  ArrayDataSource,
  SignalDataSource,
  ObservableDataSource,
  FormArrayDataSource,
  createDataSource,
  isTableDataSource,
} from './data-sources';

// Types
export * from './types/table.types';
