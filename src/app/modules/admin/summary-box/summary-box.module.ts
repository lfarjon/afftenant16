import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryBoxComponent } from './summary-box.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [SummaryBoxComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [SummaryBoxComponent],
})
export class SummaryBoxModule {}
