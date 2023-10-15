import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementBarComponent } from './announcement-bar.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SwiperModule } from 'swiper/angular';
import { BlocksModule } from '../../blocks/blocks.module';

@NgModule({
  declarations: [AnnouncementBarComponent],
  imports: [CommonModule, SwiperModule, ComponentsModule, BlocksModule],
  exports: [AnnouncementBarComponent],
})
export class AnnouncementBarModule {}
