import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { uuidv4 } from '@firebase/util';
import {
  DynamicSection,
  footerSections,
  headerSections,
  sidenavSections,
} from '../models/dynamic-section';
import { defaultPages, Page } from '../models/page';
import { Website } from '../models/website';
import { TemplateService } from './template.service';
import { Confirmation } from '../models/confirmation';
import { ConfirmationService } from './confirmation.service';
import { BlockService } from './block.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { tailwindThemes } from '../models/tailwind-colors';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  private cloudFunctionURL = 'YOUR_CLOUD_FUNCTION_URL';

  constructor(
    private afs: AngularFirestore,
    private confirmationService: ConfirmationService,
    private templateService: TemplateService,
    private blockService: BlockService,
    private router: Router,
    private http: HttpClient
  ) {}

  createLoadBalancerForDomain(domain: string): Observable<any> {
    return this.http.post(this.cloudFunctionURL, { domain: domain });
  }

  addWebsite(inputDomain: string): Promise<any> {
    // Remove 'http://', 'https://', 'www.' from the start of the domain if they exist and trailing slashes
    let domain = inputDomain
      .replace(/^(https?:\/\/)?www\./, '')
      .replace(/\/$/, '')
      .toLowerCase();

    // Replace the TLD with '.retailable.co'
    const subdomain = domain.replace(/\./g, '-').toLowerCase();

    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = uuidv4();
    const batch = this.afs.firestore.batch();
    // Start by creating the headers and footers for the website from the predefined sections
    // (See headerSections and footerSections)
    // and generate the initial blocks for each section
    //retrieving the correct behavior subject values for each section

    const domainRef = 'domains/' + domain;

    batch.set(this.afs.firestore.doc(domainRef), {
      domain: domain,
      subdomain: subdomain,
      tenantId: tenant.uid,
      websiteId: websiteId,
    });

    let headers = [...headerSections].map((section) => {
      //generate new UUID to be sure
      section = {
        ...section,
        sectionId: uuidv4(),
      };

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

    let sidenavs = [...sidenavSections].map((section) => {
      //generate new UUID to be sure
      section = {
        ...section,
        sectionId: uuidv4(),
      };
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

    let footers = [...footerSections].map((section) => {
      //generate new UUID to be sure
      section = {
        ...section,
        sectionId: uuidv4(),
      };
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

    const websiteData: Website = {
      domain: domain,
      subdomain: subdomain,
      websiteId: websiteId,
      templateId: 'default',
      tenantId: tenant.uid,
      header: headers, //has blocks
      sidenav: sidenavs,
      footer: footers, //has blocks
    } as Website;

    const liveRef = 'websites/' + websiteData.websiteId + '-live';
    const draftRef = 'websites/' + websiteData.websiteId + '-draft';

    const liveWebsiteRef = this.afs.firestore.doc(liveRef);
    const draftWebsiteRef = this.afs.firestore.doc(draftRef);
    batch.set(liveWebsiteRef, {
      ...websiteData,
      status: 'LIVE',
    } as Website);

    batch.set(draftWebsiteRef, {
      ...websiteData,
      status: 'DRAFT',
    } as Website);

    // ADD THEME
    const draftThemeRef = this.afs.firestore.doc(
      draftRef + `/settings/theme_styles`
    );

    const liveThemeRef = this.afs.firestore.doc(
      liveRef + `/settings/theme_styles`
    );

    batch.set(
      draftThemeRef,
      tailwindThemes.find((t) => t.name === 'corporate')
    );

    batch.set(
      liveThemeRef,
      tailwindThemes.find((t) => t.name === 'corporate')
    );

    //Add the default pages to the website. Each default pages has its own predefined templatesections
    // (see defaultPages)

    defaultPages.map((page: Page) => {
      page = {
        ...page,
        pageId: uuidv4(),
      };
      //Add the blocks to each section
      page.templateSections = page.templateSections.map((section) => {
        //generate new UUID to be sure
        section = {
          ...section,
          sectionId: uuidv4(),
        };
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

      //build the page references
      const livePageRef = this.afs.firestore.doc(
        liveRef + '/pages/' + page.pageId
      );
      const draftPageRef = this.afs.firestore.doc(
        draftRef + '/pages/' + page.pageId
      );

      //save pages
      batch.set(livePageRef, page);
      batch.set(draftPageRef, page);
    });

    return batch.commit();
  }

  getWebsites(): AngularFirestoreCollection<Website> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return this.afs.collection('websites', (ref) =>
      ref.where('status', '==', 'DRAFT').where('tenantId', '==', tenant.uid)
    );
  }

  saveWebsite(confirm?: boolean) {
    const batch = this.afs.firestore.batch();
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    // const draftRef =
    //   'tenants/' + tenant.uid + '/websites/' + websiteId + '-draft';

    const draftRef = 'websites/' + websiteId + '-draft';

    const draftWebsiteRef = this.afs.firestore.doc(draftRef);

    //Add blocks value
    let headers = this.templateService.header$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    let sidenavs = this.templateService.sidenav$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    let footers = this.templateService.footer$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    const websiteData: Website = {
      tenantId: tenant.uid,
      header: headers,
      footer: footers,
      sidenav: sidenavs,
    } as Website;
    batch.set(draftWebsiteRef, websiteData, { merge: true });

    //Save pages
    for (let [pageSectionId, pageSections] of this.templateService
      .pageTemplateSections) {
      for (let [pageId, page] of this.templateService.pages) {
        if (pageSectionId === pageId) {
          //Add the blocks to each section
          let pageData: Page = {
            ...page.value,
            templateSections: [...pageSections.value],
          };

          pageData.templateSections = pageSections.value.map(
            (section: DynamicSection) => {
              this.blockService.getBlocks(section.sectionId, section.type);
              return {
                ...section,
                blocks: this.blockService.getBlocksValues(section.sectionId),
              };
            }
          );

          //build the page references
          const draftPageRef = this.afs.firestore.doc(
            draftRef + '/pages/' + pageSectionId
          );

          batch.set(draftPageRef, pageData, { merge: true });
        }
      }
    }

    batch.commit().then(() => {
      if (confirm !== false) {
        const confirmation: Confirmation = {
          message: 'Website successfully saved!',
          action: 'DISMISS',
          type: 'SNACKBAR',
        };

        this.confirmationService.confirm(confirmation);
      }
    });
  }

  saveAndPublishWebsite() {
    const batch = this.afs.firestore.batch();
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);

    const draftRef = 'websites/' + websiteId + '-draft';
    const liveRef = 'websites/' + websiteId + '-live';
    const draftWebsiteRef = this.afs.firestore.doc(draftRef);
    const liveWebsiteRef = this.afs.firestore.doc(liveRef);

    //SAVE THEME HERE

    //Add blocks value
    let headers = this.templateService.header$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    let sidenavs = this.templateService.sidenav$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    let footers = this.templateService.footer$.value?.map((section) => {
      this.blockService.getBlocks(section.sectionId, section.type);
      return {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      };
    });

    const websiteData: Website = {
      tenantId: tenant.uid,
      header: headers,
      footer: footers,
      sidenav: sidenavs,
    } as Website;

    batch.set(draftWebsiteRef, websiteData, { merge: true });
    batch.set(liveWebsiteRef, websiteData, { merge: true });

    //Save pages
    for (let [pageSectionId, pageSections] of this.templateService
      .pageTemplateSections) {
      for (let [pageId, page] of this.templateService.pages) {
        if (pageSectionId === pageId) {
          //Add the blocks to each section
          let pageData: Page = {
            ...page.value,
            templateSections: [...pageSections.value],
          };

          pageData.templateSections = pageSections.value.map(
            (section: DynamicSection) => {
              this.blockService.getBlocks(section.sectionId, section.type);
              return {
                ...section,
                blocks: this.blockService.getBlocksValues(section.sectionId),
              };
            }
          );

          //build the page references
          const draftPageRef = this.afs.firestore.doc(
            draftRef + '/pages/' + pageSectionId
          );
          //build the page references
          const livePageRef = this.afs.firestore.doc(
            liveRef + '/pages/' + pageSectionId
          );

          batch.set(draftPageRef, pageData, { merge: true });
          batch.set(livePageRef, pageData, { merge: true });
        }
      }
    }

    batch.commit().then(() => {
      const confirmation: Confirmation = {
        message: 'Website successfully saved and published!',
        action: 'DISMISS',
        type: 'SNACKBAR',
      };

      this.confirmationService.confirm(confirmation);
    });
  }

  editWebsite({ websiteId, domain }: Website, switching?: boolean) {
    localStorage.removeItem('website');
    localStorage.setItem('website', JSON.stringify(websiteId));
    this.templateService.initWebsite();

    if (switching) {
      const confirmation: Confirmation = {
        message: `Switched to ${domain}!`,
        action: 'DISMISS',
        type: 'SNACKBAR',
      };

      this.confirmationService.confirm(confirmation);

      this.router.navigate(['/admin']);
    }
  }

  getWebsite(): AngularFirestoreDocument<any> {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    console.log(websiteId);
    const websiteStatus = 'draft';

    return this.afs.doc<any>(`websites/${websiteId}-${websiteStatus}`);
  }
}
