import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from './sections/header/header.module';
import { FooterModule } from './sections/footer/footer.module';
import { TemplateModule } from './sections/template/template.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DrawerModule } from './sections/drawer/drawer.module';

@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    DragDropModule,
    MatIconModule,
    DrawerModule,
    HeaderModule,
    FooterModule,
    TemplateModule,
    ComponentsModule,
  ],
  exports: [ThemeComponent],
})
export class ThemeModule {}
