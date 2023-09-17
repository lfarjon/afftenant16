import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private afs: AngularFirestore) {}

  getArticles(): AngularFirestoreCollection<Article> {
    return this.afs.collection('articles');
  }

  getArticle(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc<Article>('articles/' + id);
  }
  saveArticle(article: Article): Promise<any> {
    const articleRef = this.afs.doc('articles/' + article?.articleId);
    return articleRef.set(article, { merge: true });
  }
}
