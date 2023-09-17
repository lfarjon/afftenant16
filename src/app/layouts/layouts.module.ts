import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { EditorModule } from './editor/editor.module';
import { BlogModule } from './blog/blog.module';

const layouts = [PublicModule, AdminModule, EditorModule, BlogModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...layouts],
})
export class LayoutsModule {}
