import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from './product-box.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductBoxComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ComponentsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [ProductBoxComponent],
})
export class ProductBoxModule {}
