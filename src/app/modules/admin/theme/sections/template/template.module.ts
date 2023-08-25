import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContactFormModule } from '../contact-form/contact-form.module';
import { EmailSignupModule } from '../email-signup/email-signup.module';
import { CollapsibleRowsModule } from '../collapsible-rows/collapsible-rows.module';
import { MultiColumnModule } from '../multi-column/multi-column.module';
import { RichTextModule } from '../rich-text/rich-text.module';
import { SlideshowModule } from '../slideshow/slideshow.module';
import { ImageBannerModule } from '../image-banner/image-banner.module';
import { ImageTextModule } from '../image-text/image-text.module';

@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DragDropModule,
    MatIconModule,
    ContactFormModule,
    EmailSignupModule,
    CollapsibleRowsModule,
    MultiColumnModule,
    RichTextModule,
    SlideshowModule,
    ImageBannerModule,
    ImageTextModule,
  ],
  exports: [TemplateComponent],
})
export class TemplateModule {}
