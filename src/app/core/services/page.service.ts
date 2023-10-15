import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Page } from '../models/page';
import { DynamicSection } from '../models/dynamic-section';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BlockService } from './block.service';
import { TemplateService } from './template.service';
import { Confirmation } from '../models/confirmation';
import { ConfirmationService } from './confirmation.service';
import { WebsiteService } from './website.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(
    private afs: AngularFirestore,
    private blockService: BlockService,
    private templateService: TemplateService,
    private websiteService: WebsiteService,
    private confirmationService: ConfirmationService
  ) {}

  getPages(): Observable<Page[]> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const pagesRef: AngularFirestoreCollection<Page> = this.afs.collection(
      'websites/' +
        JSON.parse(localStorage.getItem('website')!) +
        '-draft/pages'
    );
    return pagesRef.snapshotChanges().pipe(
      map((actions: any) => {
        return actions.map((action: any) => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data();
          return { id, ...data };
        });
      })
    );
  }

  addPage(page: Page) {
    const websiteId = JSON.parse(localStorage.getItem('website')!);

    const batch = this.afs.firestore.batch();

    const pageRef = this.afs.firestore.doc(
      'websites/' + websiteId + '-draft/pages/' + page.pageId
    );
    //ADD THE INITIAL BLOCKS
    page.templateSections = page.templateSections.map((section) => {
      this.blockService.getBlocks(
        section.sectionId,
        section.type,
        undefined,
        true
      );
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    batch.set(pageRef, page, { merge: true });

    if (page.default) {
      for (let [pageId, otherPage] of this.templateService.pages) {
        const otherPageRef = this.afs.firestore.doc(
          'websites/' + websiteId + '-draft/pages/' + pageId
        );
        const otherPageValue: Page = { ...otherPage.value, default: false };
        batch.set(otherPageRef, otherPageValue, { merge: true });
      }
    }
    batch.commit().then(() => {
      this.templateService.pages.set(
        page.pageId,
        new BehaviorSubject<Page>({
          ...page,
        })
      );
      this.templateService.pageTemplateSections.set(
        page.pageId,
        new BehaviorSubject<DynamicSection[]>([...page.templateSections])
      );
      this.templateService.currentPage.next(page);
      this.templateService.template$.next(
        this.templateService.pageTemplateSections.get(page.pageId)?.value
      );
      this.templateService.setPage(page);

      const confirmation: Confirmation = {
        message: 'Page successfully added!',
        action: 'DISMISS',
        type: 'SNACKBAR',
      };

      this.confirmationService.confirm(confirmation);
    });
  }

  togglePageDefault(defaultPage: Page, addingPage: boolean) {
    for (let [pageId, page] of this.templateService.pages) {
      if (pageId === defaultPage.pageId) {
        const pageSubject = page;
        const pageCurrentValue: Page = { ...pageSubject?.value, default: true };
        pageSubject?.next(pageCurrentValue);
      } else {
        const pageSubject = page;
        const pageCurrentValue: Page = {
          ...pageSubject?.value,
          default: false,
        };
        pageSubject?.next(pageCurrentValue);
      }
    }
    if (!addingPage) {
      const confirm = false;
      this.websiteService.saveWebsite(confirm);

      const confirmation: Confirmation = {
        message: `${defaultPage.title} is the default page!`,
        action: 'DISMISS',
        type: 'SNACKBAR',
      };

      this.confirmationService.confirm(confirmation);
    }
  }
}
