import { Route } from '@angular/router';
import { AdminComponent } from '../layouts/admin/admin.component';
import { EditorComponent } from '../layouts/editor/editor.component';

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
      cta: 'New website',
      action: 'ADD_WEBSITE',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/links',
    loadChildren: () =>
      import('src/app/modules/admin/links-page/links-page.module').then(
        (m) => m.LinksPageModule
      ),
    data: {
      title: 'Links',
      cta: 'New link',
      action: 'ADD_LINK',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/articles',
    loadChildren: () =>
      import('src/app/modules/admin/articles/articles.module').then(
        (m) => m.ArticlesModule
      ),
    data: {
      title: 'Articles',
      cta: 'New article',
      action: 'NEW_ARTICLE',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/article/:articleId',
    loadChildren: () =>
      import('src/app/modules/admin/article/article.module').then(
        (m) => m.ArticleModule
      ),
    data: {
      title: 'Article',
      cta: 'Publish',
      action: 'PUBLISH_ARTICLE',
    },
  },
  {
    component: EditorComponent,
    path: 'admin/theme',
    loadChildren: () =>
      import('src/app/modules/admin/theme/theme.module').then(
        (m) => m.ThemeModule
      ),
    data: {
      theme: true,
      title: 'Theme editor',
      cta: 'Save',
      action: 'SAVE_WEBSITE',
      second_cta: 'Publish',
      second_action: 'PUBLISH_WEBSITE',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/affiliate-tools',
    loadChildren: () =>
      import(
        'src/app/modules/admin/affiliate-tools/affiliate-tools.module'
      ).then((m) => m.AffiliateToolsModule),
    data: {
      title: 'Affiliate tools',
      cta: 'New tool',
      action: 'NEW_TOOL',
    },
  },
  {
    component: AdminComponent,
    path: 'admin/tool-builder/:toolId',
    loadChildren: () =>
      import('src/app/modules/admin/tool-builder/tool-builder.module').then(
        (m) => m.ToolBuilderModule
      ),
    data: {
      title: 'Tool builder',
      cta: 'Save',
      action: 'SAVE_TOOL',
    },
  },
];
