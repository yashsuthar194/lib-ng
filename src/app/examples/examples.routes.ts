import { Routes } from '@angular/router';
import { ExamplesLayoutComponent } from './layout/examples-layout.component';
import { BasicTableExampleComponent } from './table/basic/basic-table.component';
import { ObservableTableExampleComponent } from './table/observable/observable-table.component';
import { ColumnsTableExampleComponent } from './table/columns/columns-table.component';
import { SortingTableExampleComponent } from './table/sorting/sorting-table.component';
import { PaginationTableExampleComponent } from './table/pagination/pagination-table.component';
import { EditableTableExampleComponent } from './table/editable/editable-table.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    component: ExamplesLayoutComponent,
    children: [
      { path: '', redirectTo: 'table/basic', pathMatch: 'full' },
      { path: 'table/basic', component: BasicTableExampleComponent },
      { path: 'table/observable', component: ObservableTableExampleComponent },
      { path: 'table/columns', component: ColumnsTableExampleComponent },
      { path: 'table/sorting', component: SortingTableExampleComponent },
      { path: 'table/pagination', component: PaginationTableExampleComponent },
      { path: 'table/editable', component: EditableTableExampleComponent },
    ]
  }
];

export default EXAMPLES_ROUTES;
