import { Routes } from '@angular/router';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/examples-layout.component').then(m => m.ExamplesLayoutComponent),
    children: [
      { path: '', redirectTo: 'table/basic', pathMatch: 'full' },
      // Table routes
      {
        path: 'table/basic',
        loadComponent: () =>
          import('../examples/table/basic/basic-table.component').then(
            m => m.BasicTableExampleComponent
          ),
      },
      {
        path: 'table/observable',
        loadComponent: () =>
          import('../examples/table/observable/observable-table.component').then(
            m => m.ObservableTableExampleComponent
          ),
      },
      {
        path: 'table/columns',
        loadComponent: () =>
          import('../examples/table/columns/columns-table.component').then(
            m => m.ColumnsTableExampleComponent
          ),
      },
      {
        path: 'table/sorting',
        loadComponent: () =>
          import('../examples/table/sorting/sorting-table.component').then(
            m => m.SortingTableExampleComponent
          ),
      },
      {
        path: 'table/pagination',
        loadComponent: () =>
          import('../examples/table/pagination/pagination-table.component').then(
            m => m.PaginationTableExampleComponent
          ),
      },
      {
        path: 'table/editable',
        loadComponent: () =>
          import('../examples/table/editable/editable-table.component').then(
            m => m.EditableTableExampleComponent
          ),
      },
      // Select routes
      {
        path: 'select/basic',
        loadComponent: () =>
          import('../examples/select/basic/basic-select.component').then(
            m => m.BasicSelectExampleComponent
          ),
      },
      {
        path: 'select/searchable',
        loadComponent: () =>
          import('../examples/select/searchable/searchable-select.component').then(
            m => m.SearchableSelectExampleComponent
          ),
      },
      {
        path: 'select/multi',
        loadComponent: () =>
          import('../examples/select/multi/multi-select.component').then(
            m => m.MultiSelectExampleComponent
          ),
      },
      {
        path: 'select/template',
        loadComponent: () =>
          import('../examples/select/template/template-select.component').then(
            m => m.TemplateSelectExampleComponent
          ),
      },
      {
        path: 'select/forms',
        loadComponent: () =>
          import('../examples/select/forms/forms-select.component').then(
            m => m.FormsSelectExampleComponent
          ),
      },
      // Tabs routes
      {
        path: 'tabs/basic',
        loadComponent: () =>
          import('../examples/tabs/basic/basic-tabs.component').then(
            m => m.BasicTabsExampleComponent
          ),
      },
      {
        path: 'tabs/programmatic',
        loadComponent: () =>
          import('../examples/tabs/programmatic/programmatic-tabs.component').then(
            m => m.ProgrammaticTabsExampleComponent
          ),
      },
      {
        path: 'tabs/animated',
        loadComponent: () =>
          import('../examples/tabs/animated/animated-tabs.component').then(
            m => m.AnimatedTabsExampleComponent
          ),
      },
      {
        path: 'tabs/lazy',
        loadComponent: () =>
          import('../examples/tabs/lazy/lazy-tabs.component').then(m => m.LazyTabsExampleComponent),
      },
      // Modal routes
      {
        path: 'modal/basic',
        loadComponent: () =>
          import('../examples/modal/basic/basic-modal.component').then(
            m => m.BasicModalExampleComponent
          ),
      },
      {
        path: 'modal/animated',
        loadComponent: () =>
          import('../examples/modal/animated/animated-modal.component').then(
            m => m.AnimatedModalExampleComponent
          ),
      },
      // Button routes
      {
        path: 'button',
        loadComponent: () =>
          import('../examples/button/button-example.component').then(m => m.ButtonExampleComponent),
      },
      // Checkbox routes
      {
        path: 'checkbox',
        loadComponent: () =>
          import('../examples/checkbox/checkbox-example.component').then(
            m => m.CheckboxExampleComponent
          ),
      },
      // Toast routes
      {
        path: 'toast',
        loadComponent: () =>
          import('../examples/toast/toast-example.component').then(m => m.ToastExampleComponent),
      },
      // Tooltip routes
      {
        path: 'tooltip',
        loadComponent: () =>
          import('../examples/tooltip/tooltip-example.component').then(
            m => m.TooltipExampleComponent
          ),
      },
      // Alert routes
      {
        path: 'alert',
        loadComponent: () =>
          import('../examples/alert/alert-example.component').then(m => m.AlertExampleComponent),
      },
      // Progress routes
      {
        path: 'progress',
        loadComponent: () =>
          import('../examples/progress/progress-example.component').then(
            m => m.ProgressExampleComponent
          ),
      },
      // Card routes
      {
        path: 'card',
        loadComponent: () =>
          import('../examples/card/card-example.component').then(m => m.CardExampleComponent),
      },
      // Badge routes
      {
        path: 'badge',
        loadComponent: () =>
          import('../examples/badge/badge-example.component').then(m => m.BadgeExampleComponent),
      },
      // Avatar routes
      {
        path: 'avatar',
        loadComponent: () =>
          import('../examples/avatar/avatar-example.component').then(m => m.AvatarExampleComponent),
      },
      // Accordion routes
      {
        path: 'accordion',
        loadComponent: () =>
          import('../examples/accordion/accordion-example.component').then(
            m => m.AccordionExampleComponent
          ),
      },
      // Breadcrumb routes
      {
        path: 'breadcrumb',
        loadComponent: () =>
          import('../examples/breadcrumb/breadcrumb-example.component').then(
            m => m.BreadcrumbExampleComponent
          ),
      },
      // Stepper routes
      {
        path: 'stepper',
        loadComponent: () =>
          import('../examples/stepper/stepper-example.component').then(
            m => m.StepperExampleComponent
          ),
      },
      // Skeleton routes
      {
        path: 'skeleton',
        loadComponent: () =>
          import('../examples/skeleton/skeleton-example.component').then(
            m => m.SkeletonExampleComponent
          ),
      },
      // Input routes (lazy loaded)
      {
        path: 'input',
        loadChildren: () => import('./input/input.routes').then(m => m.INPUT_ROUTES),
      },
      // DatePicker routes
      {
        path: 'datepicker',
        loadComponent: () =>
          import('../examples/datepicker/datepicker-example.component').then(
            m => m.DatePickerExampleComponent
          ),
      },
    ],
  },
];

export default EXAMPLES_ROUTES;
