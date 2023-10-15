import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
