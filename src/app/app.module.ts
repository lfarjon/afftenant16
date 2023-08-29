import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {
  AngularFireModule,
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
} from '@angular/fire/compat';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    LayoutsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: Storage, useValue: {} },
    { provide: FIREBASE_APP_NAME, useValue: environment.firebase },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: 'host', useValue: 'localhost' }, // This can be 'retailable.co' or any other default value.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
