import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links.component';
import { RouterModule } from '@angular/router';
import { linksRoutes } from './links.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Storage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [LinksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(linksRoutes),
    ComponentsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  providers: [
    { provide: FIREBASE_APP_NAME, useValue: environment.firebase },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
})
export class LinksModule {}
