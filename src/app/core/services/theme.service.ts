import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private afs: AngularFirestore) {}

  saveTheme(theme: any, live: boolean): Promise<any> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    const websiteStatus = live ? 'live' : 'draft';

    const themeStyleRef = this.afs.doc(
      `websites/${websiteId}-${websiteStatus}/settings/theme_styles`
    );

    return themeStyleRef.set(theme, { merge: false });
  }

  getTheme(live: boolean): AngularFirestoreDocument<any> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    const websiteStatus = live ? 'live' : 'draft';

    return this.afs.doc<any>(
      `websites/${websiteId}-${websiteStatus}/settings/theme_styles`
    );
  }
}
