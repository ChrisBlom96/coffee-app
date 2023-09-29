import { Routes } from '@angular/router';
import { HomePage } from './splash/splash.page';
import { LoginPage } from './login/login.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },  {
    path: 'coffee-flavours',
    loadComponent: () => import('./coffee-flavours/coffee-flavours.page').then( m => m.CoffeeFlavoursPage)
  },

];