import { Route } from '@angular/router';
import { AdminComponent } from '../layouts/admin/admin.component';

export const adminRoutes: Route[] = [
  //Admin Routes
  {
    component: AdminComponent,
    path: 'admin',
    loadChildren: () =>
      import('src/app/modules/admin/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: {
      title: 'Dashboard',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/websites',
    loadChildren: () =>
      import('src/app/modules/admin/websites/websites.module').then(
        (m) => m.WebsitesModule
      ),
    data: {
      title: 'Websites',
      cta: 'Add website',
      action: 'ADD_WEBSITE',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/links',
    loadChildren: () =>
      import('src/app/modules/admin/links/links.module').then(
        (m) => m.LinksModule
      ),
    data: {
      title: 'Links',
      cta: 'New link',
      action: 'ADD_LINK',
    },
  },
];
