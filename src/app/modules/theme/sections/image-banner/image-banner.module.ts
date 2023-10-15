import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBannerComponent } from './image-banner.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ImageBannerComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ImageBannerComponent],
})
export class ImageBannerModule {}
