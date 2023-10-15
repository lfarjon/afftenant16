import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopThreeComponent } from './top-three.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [TopThreeComponent],
  imports: [CommonModule, MatIconModule, ComponentsModule],
  exports: [TopThreeComponent],
})
export class TopThreeModule {}
