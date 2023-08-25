import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockEditorComponent } from './block-editor.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BlockEditorComponent],
  imports: [
    CommonModule,
    FormlyModule.forChild({}),
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [BlockEditorComponent],
  providers: [],
})
export class BlockEditorModule {}
