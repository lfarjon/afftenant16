import { Route } from '@angular/router';
import { EditorComponent } from '../layouts/editor/editor.component';

export const editorRoutes: Route[] = [
  {
    component: EditorComponent,
    path: 'admin/website/:websiteId/pages',
    loadChildren: () =>
      import('src/app/modules/admin/pages/pages.module').then(
        (m) => m.PagesModule
      ),
    data: {
      title: 'Pages',
      cta: 'New page',
      action: 'NEW_PAGE',
    },
  },
  {
    component: EditorComponent,
    path: 'admin/website/:websiteId/design',
    loadChildren: () =>
      import('src/app/modules/admin/theme/theme.module').then(
        (m) => m.ThemeModule
      ),
    data: {
      theme: true,
      title: 'Page',
      cta: 'Save',
      action: 'SAVE_WEBSITE',
      second_cta: 'Publish',
      second_action: 'PUBLISH_WEBSITE',
    },
  },
  {
    component: EditorComponent,
    path: 'admin/website/preview',
    loadChildren: () =>
      import('src/app/modules/admin/website-editor/website-editor.module').then(
        (m) => m.WebsiteEditorModule
      ),
    data: {
      theme: true,
      title: 'Page',
      cta: 'Save',
      action: 'SAVE_WEBSITE',
      second_cta: 'Publish',
      second_action: 'PUBLISH_WEBSITE',
    },
  },
  {
    component: EditorComponent,
    path: 'admin/website/:websiteId/design/:blockId',
    loadChildren: () =>
      import('src/app/modules/admin/theme/theme.module').then(
        (m) => m.ThemeModule
      ),
    data: {
      theme: true,
      blockEditor: true,
      title: 'Page',
      action: 'SAVE_WEBSITE',
      second_cta: 'Publish',
      second_action: 'PUBLISH_WEBSITE',
    },
  },
];
