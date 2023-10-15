import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkSelectorComponent } from './link-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [LinkSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [LinkSelectorComponent],
})
export class LinkSelectorModule {}
