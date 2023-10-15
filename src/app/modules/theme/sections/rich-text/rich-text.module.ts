import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextComponent } from './rich-text.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RichTextComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [RichTextComponent],
})
export class RichTextModule {}
