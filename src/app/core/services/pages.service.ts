import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { defaultPages } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private afs: AngularFirestore) {}

  generateDefaultPages() {
    const batch = this.afs.firestore.batch();

    defaultPages.map((page) => {
      const pageRef = this.afs.collection('pages').doc(page.pageId).ref; // or however you want to structure your document references
      batch.set(pageRef, page, { merge: true }); // or any other initial data you want to set
    });

    return batch.commit();
  }
}
