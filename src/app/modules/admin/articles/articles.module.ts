import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { RouterModule } from '@angular/router';
import { articlesRoutes } from './articles.routing';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(articlesRoutes),
    ComponentsModule,
  ],
})
export class ArticlesModule {}
