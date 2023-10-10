import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCollageComponent } from './product-collage.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductCollageComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ProductCollageComponent],
})
export class ProductCollageModule {}
