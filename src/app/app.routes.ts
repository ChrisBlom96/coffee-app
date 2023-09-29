import { Routes } from '@angular/router';
import { HomePage } from './splash/splash.page';
import { LoginPage } from './login/login.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'splash',
    component: HomePage,
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'coffee-flavours',
    loadComponent: () => import('./coffee-flavours/coffee-flavours.page').then( m => m.CoffeeFlavoursPage)
  },  {
    path: 'flavour-edit',
    loadComponent: () => import('./flavour-edit/flavour-edit.page').then( m => m.FlavourEditPage)
  },


];