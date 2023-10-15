import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { EditorModule } from './editor/editor.module';

const layouts = [PublicModule, AdminModule, EditorModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...layouts],
})
export class LayoutsModule {}
