import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow.component';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { BlocksModule } from '../../blocks/blocks.module';

@NgModule({
  declarations: [SlideshowComponent],
  imports: [CommonModule, SwiperModule, ComponentsModule, BlocksModule],
  exports: [SlideshowComponent],
})
export class SlideshowModule {}
