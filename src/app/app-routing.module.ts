import { Route } from '@angular/router';
import { PublicComponent } from './layouts/public/public.component';
import { adminRoutes } from './routes/admin.routes';
import { AuthRoutes } from './routes/auth.routes';
import { editorRoutes } from './routes/editor.routes';

export const routes: Route[] = [
  ...AuthRoutes,
  ...adminRoutes,
  ...editorRoutes,
  {
    component: PublicComponent,
    path: '',
    loadChildren: () =>
      import('src/app/modules/public/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
];
