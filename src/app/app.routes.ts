import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './features/pages/auth/login/login.component';
import { HomeComponent } from './features/pages/dashboard/home/home.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardModule } from './features/pages/dashboard/dashboard.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
