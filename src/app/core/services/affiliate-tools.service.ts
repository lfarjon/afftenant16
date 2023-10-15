import { Injectable, Type } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GlobalFeature } from '../models/feature';
import { DynamicSection } from '../models/dynamic-section';

@Injectable({
  providedIn: 'root',
})
export class AffiliateToolsService {
  constructor(private afs: AngularFirestore) {}

  getTools(): AngularFirestoreCollection<DynamicSection> {
    return this.afs.collection('affiliate-tools', (ref) =>
      ref.where('websiteId', '==', JSON.parse(localStorage.getItem('website')!))
    );
  }

  getTool(sectionId: string): AngularFirestoreDocument<any> {
    return this.afs.doc<DynamicSection>('affiliate-tools/' + sectionId);
  }

  saveTool(
    tool: DynamicSection,
    data?: any,
    globalFeatures?: GlobalFeature[],
    merge?: boolean
  ): Promise<any> {
    const toolRef = this.afs.doc('affiliate-tools/' + tool?.sectionId);

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
