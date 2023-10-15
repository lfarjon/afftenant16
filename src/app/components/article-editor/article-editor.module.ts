import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorComponent } from './article-editor.component';
import { QuillToolbarModule } from '../quill-toolbar/quill-toolbar.module';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ArticleEditorComponent],
  imports: [
    CommonModule,
    QuillModule,
    QuillToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [ArticleEditorComponent],
})
export class ArticleEditorModule {}
