import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebsiteLoaderService {
  constructor(private afs: AngularFirestore) {}

  getWebsiteData(domain: string): Observable<any> {
    if (domain.includes('.retailable.co') || domain.includes('.localhost')) {
      const subdomain = domain.split('.')[0];
      return this.afs
        .collection('websites', (ref) =>
          ref.where('subdomain', '==', subdomain)
        )
        .valueChanges()
        .pipe(
          take(1),
          map((data) => (data && data.length ? data[0] : null))
        );
    } else {
      return this.afs
        .collection('websites', (ref) => ref.where('domain', '==', domain))
        .valueChanges()
        .pipe(
          take(1),
          map((data) => (data && data.length ? data[0] : null))
        );
    }
  }
}
