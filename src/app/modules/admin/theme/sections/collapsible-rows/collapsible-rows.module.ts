import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleRowsComponent } from './collapsible-rows.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [CollapsibleRowsComponent],
  imports: [CommonModule, ComponentsModule, ComponentsModule],
  exports: [CollapsibleRowsComponent],
})
export class CollapsibleRowsModule {}
