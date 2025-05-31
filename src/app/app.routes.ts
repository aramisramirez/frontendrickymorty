import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./cliente/cliente.routes').then((m) => m.CLIENTE_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./cliente/cliente.routes').then((m) => m.CLIENTE_ROUTES),
  },
];
