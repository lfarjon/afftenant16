import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from 'src/app/components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { FooterPanelComponent } from './footer-panel/footer-panel.component';
import { TemplatePanelComponent } from './template-panel/template-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockEditorModule } from 'src/app/modules/admin/block-editor/block-editor.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPageModule } from 'src/app/modules/admin/add-page/add-page.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    EditorComponent,
    HeaderPanelComponent,
    FooterPanelComponent,
    TemplatePanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    ComponentsModule,
    DragDropModule,
    MatExpansionModule,
    ReactiveFormsModule,
    BlockEditorModule,
    MatSelectModule,
    MatDialogModule,
    AddPageModule,
    MatMenuModule,
  ],
  exports: [EditorComponent],
})
export class EditorModule {}
