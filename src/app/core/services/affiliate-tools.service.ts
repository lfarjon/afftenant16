import { Injectable, Type } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AffiliateTool } from '../models/affiliate-tool';
import { Feature } from '../models/feature';

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

  saveTool(
    tool: AffiliateTool,
    data?: any,
    features?: Feature[],
    merge?: boolean
  ): Promise<any> {
    const toolRef = this.afs.doc('affiliate-tools/' + tool?.id);
    if (data && features) {
      tool = {
        ...tool,
        data: data,
        features: features,
      };
    }
    return toolRef.set(tool, { merge: merge ? merge : true });
  }
}
