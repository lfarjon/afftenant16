import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiColumnComponent } from './multi-column.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MultiColumnComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [MultiColumnComponent],
})
export class MultiColumnModule {}
