import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEditorComponent } from './new-editor.component';
import { RouterModule } from '@angular/router';
import { routes } from './new-editor.routing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ArticleModule } from '../article/article.module';
import { BlockSelectorModule } from '../block-selector/block-selector.module';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [NewEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatBottomSheetModule,
    BlockSelectorModule,
    ArticleModule,
    MatIconModule,
    FormlyModule.forChild({}),
    FormlyMatSliderModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DragDropModule,
  ],
})
export class NewEditorModule {}
