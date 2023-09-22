import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CtaComponent } from './cta/cta.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './table/table.component';
import { CustomDatePipe } from '../core/pipes/custom-date.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragHandleComponent } from './drag-handle/drag-handle.component';
import { MatIconModule } from '@angular/material/icon';
import { VisibilityToggleComponent } from './visibility-toggle/visibility-toggle.component';
import { ExpandSectionComponent } from './expand-section/expand-section.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DynamicChildLoaderDirective } from '../core/directives/dynamic-child-loader.directive';
import { DynamicBlockLoaderDirective } from '../core/directives/dynamic-block-loader.directive';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { MobileEditComponent } from './mobile-edit/mobile-edit.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { QuillModule } from 'ngx-quill';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    CustomDatePipe,
    LoaderComponent,
    CtaComponent,
    TableComponent,
    DragHandleComponent,
    VisibilityToggleComponent,
    ExpandSectionComponent,
    ExpansionPanelComponent,
    DynamicChildLoaderDirective,
    DynamicBlockLoaderDirective,
    DropzoneComponent,
    MobileEditComponent,
    TextEditorComponent,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    QuillModule,
  ],
  exports: [
    LoaderComponent,
    CtaComponent,
    TableComponent,
    DragHandleComponent,
    VisibilityToggleComponent,
    ExpandSectionComponent,
    ExpansionPanelComponent,
    DynamicChildLoaderDirective,
    DynamicBlockLoaderDirective,
    DropzoneComponent,
    MobileEditComponent,
    TextEditorComponent,
    ImageUploaderComponent,
  ],
  providers: [
    { provide: FIREBASE_APP_NAME, useValue: environment.firebase },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
})
export class ComponentsModule {}
