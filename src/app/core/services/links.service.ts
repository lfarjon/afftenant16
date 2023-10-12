import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Link } from '../models/links';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private afs: AngularFirestore) {}

  getLinks(): AngularFirestoreCollection<Link> {
    return this.afs.collection('links', (ref) =>
      ref
        .where('websiteId', '==', JSON.parse(localStorage.getItem('website')!))
        .orderBy('published_at', 'desc')
    );
  }

  getLink(id: string): AngularFirestoreDocument<Link> {
    return this.afs.doc('links/' + id);
  }

  addLink(link: Link): Promise<any> {
    if (!!link.active_at) {
      link.active_at = new Date(link.active_at);
    } else {
      link.active_at = new Date();
    }
    const linkRef = this.afs.doc('links/' + link.id);
    return linkRef.set(link, { merge: true });
  }

  deleteLink(link: Link): Promise<any> {
    const linkRef = this.afs.doc('links/' + link.id);
    return linkRef.delete();
  }

  toggleStatus(link: Link) {
    const linkRef = this.afs.doc('links/' + link.id);
    return linkRef.update({ active: !link.active });
  }

  getCategories(): AngularFirestoreCollection<Category> {
    return this.afs.collection('categories', (ref) =>
      ref.where('websiteId', '==', JSON.parse(localStorage.getItem('website')!))
    );
  }

  saveCategory(category: Category): Promise<any> {
    const categoryRef = this.afs.doc(
      `categories/${category.name.toLowerCase()}`
    );

    return categoryRef.set({ name: category.name }, { merge: true });
  }
}
