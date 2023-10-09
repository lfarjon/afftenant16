import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksPageComponent } from './links-page.component';
import { LinksModule } from '../links/links.module';
import { RouterModule } from '@angular/router';
import { linksRoutes } from './links.routing';

@NgModule({
  declarations: [LinksPageComponent],
  imports: [CommonModule, RouterModule.forChild(linksRoutes), LinksModule],
})
export class LinksPageModule {}
