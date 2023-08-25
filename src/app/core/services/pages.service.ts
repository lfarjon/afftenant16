import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { defaultPages, Page } from '../models/page';

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

  getPages(): AngularFirestoreCollection<Page> {
    return this.afs.collection('pages');
  }

  getPage(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc<Page>('pages/' + id);
  }
  savePage(page: Page): Promise<any> {
    const pageRef = this.afs.doc('pages/' + page?.pageId);
    return pageRef.set(page, { merge: true });
  }
}
