import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./splash/splash.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
];
