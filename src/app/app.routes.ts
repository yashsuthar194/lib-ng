import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.routes').then(m => m.EXAMPLES_ROUTES),
  },
];
