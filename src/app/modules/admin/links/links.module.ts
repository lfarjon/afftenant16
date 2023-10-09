import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

import { MatInputModule } from '@angular/material/input';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AddLinkModule } from '../add-link/add-link.module';

@NgModule({
  declarations: [LinksComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    AddLinkModule,
  ],
  providers: [
    { provide: FIREBASE_APP_NAME, useValue: environment.firebase },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  exports: [LinksComponent],
})
export class LinksModule {}
