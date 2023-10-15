import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersusBoxComponent } from './versus-box.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [VersusBoxComponent],
  imports: [CommonModule, MatIconModule, ComponentsModule],
  exports: [VersusBoxComponent],
})
export class VersusBoxModule {}
