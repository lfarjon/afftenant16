import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from 'src/app/components/components.module';
import { EmailSignupModule } from '../email-signup/email-signup.module';
import { InnerFooterModule } from '../inner-footer/inner-footer.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    DragDropModule,
    ComponentsModule,
    EmailSignupModule,
    InnerFooterModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
