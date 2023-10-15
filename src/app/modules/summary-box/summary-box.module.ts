import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryBoxComponent } from './summary-box.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SummaryBoxComponent],
  imports: [CommonModule, ComponentsModule, MatIconModule],
  exports: [SummaryBoxComponent],
})
export class SummaryBoxModule {}
