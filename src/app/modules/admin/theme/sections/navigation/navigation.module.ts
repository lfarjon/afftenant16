import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BlocksModule } from '../../blocks/blocks.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatIconModule,
    BlocksModule,
  ],
  exports: [NavigationComponent],
})
export class NavigationModule {}
