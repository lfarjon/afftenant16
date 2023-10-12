import { Injectable, Type } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AffiliateTool } from '../models/affiliate-tool';
import { GlobalFeature } from '../models/feature';

@Injectable({
  providedIn: 'root',
})
export class AffiliateToolsService {
  constructor(private afs: AngularFirestore) {}

  getTools(): AngularFirestoreCollection<AffiliateTool> {
    return this.afs.collection('affiliate-tools', (ref) =>
      ref.where('websiteId', '==', JSON.parse(localStorage.getItem('website')!))
    );
  }

  getTool(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc<AffiliateTool>('affiliate-tools/' + id);
  }

  saveTool(
    tool: AffiliateTool,
    data?: any,
    globalFeatures?: GlobalFeature[],
    merge?: boolean
  ): Promise<any> {
    const toolRef = this.afs.doc('affiliate-tools/' + tool?.id);

    tool = {
      ...tool,
      updated_at: new Date(),
    };

    if (data) {
      tool = {
        ...tool,
        data: data,
      };
    }

    if (!!globalFeatures) {
      tool = {
        ...tool,
        globalFeatures: globalFeatures,
      };
    }

    return toolRef.set(tool, { merge: merge ? merge : true });
  }
}
