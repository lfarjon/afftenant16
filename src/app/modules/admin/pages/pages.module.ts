import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routing';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(pagesRoutes), ComponentsModule],
})
export class PagesModule {}
