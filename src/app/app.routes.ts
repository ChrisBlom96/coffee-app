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
];