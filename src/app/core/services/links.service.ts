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
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return this.afs.collection('tenants/' + tenant.uid + '/links', (ref) =>
      ref.orderBy('published_at', 'desc')
    );
  }

  getLink(id: string): AngularFirestoreDocument<Link> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return this.afs.doc('tenants/' + tenant.uid + '/links/' + id);
  }

  addLink(link: Link): Promise<any> {
    if (!!link.active_at) {
      link.active_at = new Date(link.active_at);
    } else {
      link.active_at = new Date();
    }
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const linkRef = this.afs.doc('tenants/' + tenant.uid + '/links/' + link.id);
    return linkRef.set(link, { merge: true });
  }

  deleteLink(link: Link): Promise<any> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const linkRef = this.afs.doc('tenants/' + tenant.uid + '/links/' + link.id);
    return linkRef.delete();
  }

  toggleStatus(link: Link) {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const linkRef = this.afs.doc('tenants/' + tenant.uid + '/links/' + link.id);
    return linkRef.update({ active: !link.active });
  }

  getCategories(): AngularFirestoreCollection<Category> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    // Assuming the categories are stored as documents in a 'categories' sub-collection
    return this.afs.collection('tenants/' + tenant.uid + '/categories');
  }

  saveCategory(category: Category): Promise<any> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const categoryRef = this.afs.doc(
      `tenants/${tenant.uid}/categories/${category.name.toLowerCase()}`
    );

    return categoryRef.set({ name: category.name }, { merge: true });
  }
}
