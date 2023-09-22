import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { articleRoutes } from './article.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(articleRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ComponentsModule,
  ],
})
export class ArticleModule {}
