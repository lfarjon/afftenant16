import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTextComponent } from './image-text.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ImageTextComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ImageTextComponent],
})
export class ImageTextModule {}
