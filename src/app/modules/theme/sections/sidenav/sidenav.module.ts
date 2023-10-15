import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { BlocksModule } from '../../blocks/blocks.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, ComponentsModule, BlocksModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
