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
  },
];