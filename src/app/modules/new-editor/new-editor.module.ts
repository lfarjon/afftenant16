import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEditorComponent } from './new-editor.component';
import { RouterModule } from '@angular/router';
import { routes } from './new-editor.routing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ArticleModule } from '../article/article.module';
import { BlockSelectorModule } from '../block-selector/block-selector.module';

@NgModule({
  declarations: [NewEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatBottomSheetModule,
    BlockSelectorModule,
    ArticleModule,
  ],
})
export class NewEditorModule {}
