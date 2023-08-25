import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from 'src/app/components/components.module';
import { AnnouncementBarModule } from '../announcement-bar/announcement-bar.module';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    DragDropModule,
    ComponentsModule,
    AnnouncementBarModule,
    NavigationModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
