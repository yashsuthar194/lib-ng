import { Routes } from '@angular/router';
import { ExamplesLayoutComponent } from './layout/examples-layout.component';
// Table examples
import { BasicTableExampleComponent } from './table/basic/basic-table.component';
import { ObservableTableExampleComponent } from './table/observable/observable-table.component';
import { ColumnsTableExampleComponent } from './table/columns/columns-table.component';
import { SortingTableExampleComponent } from './table/sorting/sorting-table.component';
import { PaginationTableExampleComponent } from './table/pagination/pagination-table.component';
import { EditableTableExampleComponent } from './table/editable/editable-table.component';
// Select examples
import { BasicSelectExampleComponent } from './select/basic/basic-select.component';
import { SearchableSelectExampleComponent } from './select/searchable/searchable-select.component';
import { MultiSelectExampleComponent } from './select/multi/multi-select.component';
import { TemplateSelectExampleComponent } from './select/template/template-select.component';
import { FormsSelectExampleComponent } from './select/forms/forms-select.component';
// Tabs examples
import { BasicTabsExampleComponent } from './tabs/basic/basic-tabs.component';
import { ProgrammaticTabsExampleComponent } from './tabs/programmatic/programmatic-tabs.component';
import { AnimatedTabsExampleComponent } from './tabs/animated/animated-tabs.component';
import { LazyTabsExampleComponent } from './tabs/lazy/lazy-tabs.component';
// Modal routes
import { BasicModalExampleComponent } from './modal/basic/basic-modal.component';
import { AnimatedModalExampleComponent } from './modal/animated/animated-modal.component';
// Button examples
import { ButtonExampleComponent } from './button/button-example.component';
// Checkbox examples
import { CheckboxExampleComponent } from './checkbox/checkbox-example.component';
// Toast examples
import { ToastExampleComponent } from './toast/toast-example.component';
// Tooltip examples
import { TooltipExampleComponent } from './tooltip/tooltip-example.component';
// Alert examples
import { AlertExampleComponent } from './alert/alert-example.component';
// Progress examples
import { ProgressExampleComponent } from './progress/progress-example.component';
// Card examples
import { CardExampleComponent } from './card/card-example.component';
// Badge examples
import { BadgeExampleComponent } from './badge/badge-example.component';
// Avatar examples
import { AvatarExampleComponent } from './avatar/avatar-example.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    component: ExamplesLayoutComponent,
    children: [
      { path: '', redirectTo: 'table/basic', pathMatch: 'full' },
      // Table routes
      { path: 'table/basic', component: BasicTableExampleComponent },
      { path: 'table/observable', component: ObservableTableExampleComponent },
      { path: 'table/columns', component: ColumnsTableExampleComponent },
      { path: 'table/sorting', component: SortingTableExampleComponent },
      { path: 'table/pagination', component: PaginationTableExampleComponent },
      { path: 'table/editable', component: EditableTableExampleComponent },
      // Select routes
      { path: 'select/basic', component: BasicSelectExampleComponent },
      { path: 'select/searchable', component: SearchableSelectExampleComponent },
      { path: 'select/multi', component: MultiSelectExampleComponent },
      { path: 'select/template', component: TemplateSelectExampleComponent },
      { path: 'select/forms', component: FormsSelectExampleComponent },
      // Tabs routes
      { path: 'tabs/basic', component: BasicTabsExampleComponent },
      { path: 'tabs/programmatic', component: ProgrammaticTabsExampleComponent },
      { path: 'tabs/animated', component: AnimatedTabsExampleComponent },
      { path: 'tabs/lazy', component: LazyTabsExampleComponent },
      // Modal routes
      { path: 'modal/basic', component: BasicModalExampleComponent },
      { path: 'modal/animated', component: AnimatedModalExampleComponent },
      // Button routes
      { path: 'button', component: ButtonExampleComponent },
      // Checkbox routes
      { path: 'checkbox', component: CheckboxExampleComponent },
      // Toast routes
      { path: 'toast', component: ToastExampleComponent },
      // Tooltip routes
      { path: 'tooltip', component: TooltipExampleComponent },
      // Alert routes
      { path: 'alert', component: AlertExampleComponent },
      // Progress routes
      { path: 'progress', component: ProgressExampleComponent },
      // Card routes
      { path: 'card', component: CardExampleComponent },
      // Badge routes
      { path: 'badge', component: BadgeExampleComponent },
      // Avatar routes
      { path: 'avatar', component: AvatarExampleComponent },
      // Input routes (lazy loaded)
      { 
        path: 'input', 
        loadChildren: () => import('./input/input.routes').then(m => m.INPUT_ROUTES) 
      },
    ]
  }
];

export default EXAMPLES_ROUTES;


