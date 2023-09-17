import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AffiliateTool } from '../models/affiliate-tool';

@Injectable({
  providedIn: 'root',
})
export class AffiliateToolsService {
  constructor(private afs: AngularFirestore) {}

  getTools(): AngularFirestoreCollection<AffiliateTool> {
    return this.afs.collection('affiliate-tools');
  }

  getTool(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc<AffiliateTool>('affiliate-tools/' + id);
  }

  saveTool(tool: AffiliateTool): Promise<any> {
    const toolRef = this.afs.doc('affiliate-tools/' + tool?.id);
    return toolRef.set(tool, { merge: true });
  }
}
