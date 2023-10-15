import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComponentsModule } from 'src/app/components/components.module';
import { ArticleEditorModule } from 'src/app/components/article-editor/article-editor.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    //RouterModule.forChild(articleRoutes),
    ComponentsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ArticleEditorModule,
  ],
  exports: [ArticleComponent],
})
export class ArticleModule {}
