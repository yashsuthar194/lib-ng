import { Routes } from '@angular/router';

export const INPUT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full',
  },
  {
    path: 'basic',
    loadComponent: () =>
      import('./basic/basic-input.component').then(m => m.BasicInputExampleComponent),
    title: 'Basic Input',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search/search-input.component').then(m => m.SearchInputExampleComponent),
    title: 'Search Input',
  },
  {
    path: 'form-field',
    loadComponent: () =>
      import('./form-field/form-field-example.component').then(m => m.FormFieldExampleComponent),
    title: 'Form Field',
  },
];
