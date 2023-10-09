import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopThreeComponent } from './top-three.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TopThreeComponent],
  imports: [CommonModule, MatIconModule],
  exports: [TopThreeComponent],
})
export class TopThreeModule {}
