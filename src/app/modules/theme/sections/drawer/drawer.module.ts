import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DrawerComponent } from './drawer.component';
import { SidenavModule } from '../sidenav/sidenav.module';

@NgModule({
  declarations: [DrawerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    DragDropModule,
    ComponentsModule,
    SidenavModule,
  ],
  exports: [DrawerComponent],
})
export class DrawerModule {}
