import { Route } from '@angular/router';
import { PublicComponent } from '../layouts/public/public.component';

export const AuthRoutes: Route[] = [
  {
    component: PublicComponent,
    path: 'login',
    loadChildren: () =>
      import('src/app/modules/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    component: PublicComponent,
    path: 'register',
    loadChildren: () =>
      import('src/app/modules/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
];
