import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  Observable,
  take,
  tap,
  combineLatest,
  map,
} from 'rxjs';
import { DynamicSection } from '../models/dynamic-section';
import { Page } from '../models/page';
import { Website } from '../models/website';
import { DragDropService } from './drag-drop.service';
import { BlockService } from './block.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  theme!: Observable<any>;
  template$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  template!: DynamicSection[] | undefined;
  header$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  header!: DynamicSection[] | undefined;
  footer$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  footer!: DynamicSection[] | undefined;
  sidenav$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  sidenav!: DynamicSection[] | undefined;
  website!: Website;
  currentPage = new BehaviorSubject<Page>({} as Page);
  pages$!: Observable<Page[]>;
  pages = new Map<string, BehaviorSubject<Page>>();
  articles$!: Observable<Article[]>;
  articles = new Map<string, BehaviorSubject<Article>>();
  pageTemplateSections = new Map<string, BehaviorSubject<DynamicSection[]>>();
  isSelected = new BehaviorSubject<string>('');
  drawer = new BehaviorSubject<MatDrawer | null>(null);
  constructor(
    private dragDropService: DragDropService,
    private afs: AngularFirestore,
    private blockService: BlockService
  ) {
    this.initWebsite();
  }

  initWebsite() {
    this.pageTemplateSections.clear();
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    const baseRef = 'websites/' + websiteId + '-draft';

    const website$: Observable<Website | undefined> = this.afs
      .doc<Website>(baseRef)
      .valueChanges();

    this.pages$ = this.afs
      .collection<Page>(baseRef + '/pages/')
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, ...data };
          });
        })
      );

    this.theme = combineLatest([this.pages$, website$]).pipe(
      take(1),
      map((theme) => theme)
    );

    this.theme
      .pipe(
        tap(([pages, website]) => {
          //This part will be problematic.
          //Change it to load a page as it is requested.
          //No neeed to fetch all of them when website loads
          //Only need the requested page.

          pages.map((page: Page) => {
            const pageData = new BehaviorSubject<Page>({
              ...page,
            });
            this.pages.set(page.pageId, pageData);

            const sections = new BehaviorSubject<DynamicSection[]>([
              ...page.templateSections,
            ]);
            this.pageTemplateSections.set(page.pageId, sections);
          });
          this.header = website?.header;
          this.header$.next(this.header);
          this.sidenav = website?.sidenav;
          this.sidenav$.next(this.sidenav);
          this.footer = website?.footer;
          this.footer$.next(this.footer);

          const localStoragePage = JSON.parse(localStorage.getItem('page')!);
          const page =
            pages.find((page: Page) => page.pageId === localStoragePage) ||
            pages.find((page: Page) => page.default);

          if (page) {
            this.setPage(page);
          }
        })
      )
      .subscribe();
  }

  setPage(page: Page) {
    localStorage.setItem('page', JSON.stringify(page.pageId));
    this.currentPage.next(page);
    //TEMPLATE NEEDS TO BE Current page template from behavior subject map
    this.template = this.pageTemplateSections.get(
      this.currentPage.value.pageId
    )?.value;
    this.template$.next(this.template);
  }

  drop(event: CdkDragDrop<any>, components: DynamicSection[], section: string) {
    this.dragDropService
      .drop(event, components)
      .pipe(
        take(1),
        tap((c) => {
          switch (section) {
            case 'HEADER':
              this.header$.next(c);
              break;

            case 'SIDENAV':
              this.sidenav$.next(c);
              break;

            case 'FOOTER':
              this.footer$.next(c);
              break;

            case 'TEMPLATE':
              const currentPage = JSON.parse(localStorage.getItem('page')!);
              const sections = this.pageTemplateSections.get(currentPage);
              sections?.next(c);
              this.template$.next(c);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();
  }

  toggleTemplateSectionVisiblity(section: DynamicSection, index: number) {
    const currentPage = JSON.parse(localStorage.getItem('page')!);
    const sections = this.pageTemplateSections.get(currentPage);

    if (sections) {
      const currentSections = sections.value;
      const updatedSections = [...currentSections!]; // Create a new array with the existing blocks

      // Toggle the visibility of the block at the specified index
      updatedSections[index] = {
        ...updatedSections[index],
        visible: !updatedSections[index].visible,
      };

      sections?.next(updatedSections);
      this.template$.next(updatedSections); // Update the BehaviorSubject with the updated array
    }
  }

  addTemplateSection(section: DynamicSection, pageId: string) {
    const sections = this.pageTemplateSections.get(pageId);

    if (sections) {
      const currentSections = sections.value;
      //Generate the blocks for the section
      this.blockService.getBlocks(
        section.sectionId,
        section.type,
        undefined,
        true
      );
      //Add the blocks to the section
      section = {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      } as unknown as DynamicSection;
      //Adding a section to current template
      sections.next([...currentSections!, section]);
      this.template$.next(sections.value);
      this.isSelected.next(section.sectionId);
    }
  }

  removeTemplateSection(sectionId: string, index: number) {
    const currentPage = JSON.parse(localStorage.getItem('page')!);
    const sections = this.pageTemplateSections.get(currentPage);

    if (sections) {
      const currentBlocks = sections.value;
      currentBlocks?.splice(index, 1);
      sections.next(currentBlocks);
      this.template$.next(currentBlocks);
    }
  }

  toggleHeaderSectionVisiblity(section: DynamicSection, index: number) {
    if (this.header$) {
      const currentSections = this.header$.value;
      const updatedSections = [...currentSections!]; // Create a new array with the existing blocks

      // Toggle the visibility of the block at the specified index
      updatedSections[index] = {
        ...updatedSections[index],
        visible: !updatedSections[index].visible,
      };

      this.header$.next(updatedSections); // Update the BehaviorSubject with the updated array
    }
  }

  addHeaderSection(section: DynamicSection) {
    if (this.header$) {
      const currentSections = this.header$.value;

      //Generate the blocks for the section
      this.blockService.getBlocks(
        section.sectionId,
        section.type,
        undefined,
        true
      );
      //Add the blocks to the section
      section = {
        ...section,
        blocks: this.blockService.getBlocksValues(section.sectionId),
      } as unknown as DynamicSection;

      this.header$.next([section, ...currentSections!]);
    }
  }

  removeHeaderSection(sectionId: string, index: number) {
    if (this.header$) {
      const currentBlocks = this.header$.value;
      currentBlocks?.splice(index, 1);
      this.header$.next(currentBlocks);
    }
  }

  toggleSidenavSectionVisibility(section: DynamicSection, index: number) {
    if (this.sidenav$) {
      const currentSections = this.sidenav$.value;
      const updatedSections = [...currentSections!]; // Create a new array with the existing blocks

      // Toggle the visibility of the block at the specified index
      updatedSections[index] = {
        ...updatedSections[index],
        visible: !updatedSections[index].visible,
      };

      this.sidenav$.next(updatedSections); // Update the BehaviorSubject with the updated array
    }
  }

  addSidenavSection(section: DynamicSection) {
    if (this.sidenav$) {
      const currentSections = this.sidenav$.value;
      this.sidenav$.next([...currentSections!, section]);
    }
  }

  removeSidenavSection(sectionId: string, index: number) {
    if (this.sidenav$) {
      const currentBlocks = this.sidenav$.value;
      currentBlocks?.splice(index, 1);
      this.sidenav$.next(currentBlocks);
    }
  }

  toggleFooterSectionVisiblity(section: DynamicSection, index: number) {
    if (this.footer$) {
      const currentSections = this.footer$.value;
      const updatedSections = [...currentSections!]; // Create a new array with the existing blocks

      // Toggle the visibility of the block at the specified index
      updatedSections[index] = {
        ...updatedSections[index],
        visible: !updatedSections[index].visible,
      };

      this.footer$.next(updatedSections); // Update the BehaviorSubject with the updated array
    }
  }

  addFooterSection(section: DynamicSection) {
    if (this.footer$) {
      const currentSections = this.footer$.value;
      this.footer$.next([...currentSections!, section]);
    }
  }

  removeFooterSection(sectionId: string, index: number) {
    if (this.footer$) {
      const currentBlocks = this.footer$.value;
      currentBlocks?.splice(index, 1);
      this.footer$.next(currentBlocks);
    }
  }
}
