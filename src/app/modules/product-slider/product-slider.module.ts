import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from './product-slider.component';
import { SwiperModule } from 'swiper/angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductSliderComponent],
  imports: [CommonModule, SwiperModule, MatIconModule],
  exports: [ProductSliderComponent],
})
export class ProductSliderModule {}
