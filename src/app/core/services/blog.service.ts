import { Injectable, QueryList, Type } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Article } from '../models/article';
import { DynamicChildLoaderDirective } from '../directives/dynamic-child-loader.directive';
import { BehaviorSubject } from 'rxjs';
import { DynamicSection } from '../models/dynamic-section';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  article$ = new BehaviorSubject<Article>({} as Article);
  fullscreen$ = new BehaviorSubject<boolean>(false);
  constructor(private afs: AngularFirestore) {}

  getArticles(): AngularFirestoreCollection<Article> {
    return this.afs.collection('articles', (ref) =>
      ref.where('websiteId', '==', JSON.parse(localStorage.getItem('website')!))
    );
  }

  getArticle(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc<Article>('articles/' + id);
  }

  saveArticle(article: Article): Promise<any> {
    const articleRef = this.afs.doc('articles/' + article?.articleId);
    return articleRef.set(article, { merge: true });
  }
}
