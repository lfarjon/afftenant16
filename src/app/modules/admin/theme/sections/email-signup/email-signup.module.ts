import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailSignupComponent } from './email-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  declarations: [EmailSignupComponent],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  exports: [EmailSignupComponent],
})
export class EmailSignupModule {}
