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
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
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
import { ConfirmComponent } from './confirm/confirm.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { QuillToolbarModule } from './quill-toolbar/quill-toolbar.module';
import { DomSanitizer } from '@angular/platform-browser';

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
    ConfirmComponent,
    StarRatingComponent,
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
    QuillToolbarModule,
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
    ConfirmComponent,
    StarRatingComponent,
    MatIconModule,
  ],
  providers: [
    { provide: FIREBASE_APP_NAME, useValue: environment.firebase },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
})
export class ComponentsModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    const image_banner = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
  
    `;

    this.matIconRegistry.addSvgIconLiteral(
      'image_banner',
      this.domSanitizer.bypassSecurityTrustHtml(image_banner)
    );

    // Add more SVG code as needed...
  }
}
