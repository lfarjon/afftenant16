import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonTableComponent } from './comparison-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ComparisonTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QuillModule,
    MatToolbarModule,
    MatIconModule,
    ComponentsModule,
    MatRadioModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatDialogModule,
  ],
  exports: [ComparisonTableComponent],
})
export class ComparisonTableModule {}
