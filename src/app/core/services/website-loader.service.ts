import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { DynamicSection } from '../models/dynamic-section';
import { Website } from '../models/website';
import { Page } from '../models/page';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class WebsiteLoaderService {
  theme!: Observable<any>;
  template$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  template!: DynamicSection[] | undefined;
  header$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  header!: DynamicSection[] | undefined;
  footer$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  footer!: DynamicSection[] | undefined;
  sidenav$ = new BehaviorSubject<DynamicSection[] | undefined>([]);
  sidenav!: DynamicSection[] | undefined;
  pageTemplateSections = new Map<string, BehaviorSubject<DynamicSection[]>>();
  website!: Website;
  currentPage = new BehaviorSubject<Page>({} as Page);
  pages$!: Observable<Page[]>;
  pages = new Map<string, BehaviorSubject<Page>>();
  isSelected = new BehaviorSubject<string>('');
  drawer = new BehaviorSubject<MatDrawer | null>(null);
  website$ = new BehaviorSubject<Website | null>(null);
  constructor(private afs: AngularFirestore) {}

  getWebsiteData(domain: string): Observable<any> {
    if (domain.includes('.retailable.co') || domain.includes('.localhost')) {
      const subdomain = domain.split('.')[0];
      return this.afs
        .collection('websites', (ref) =>
          ref.where('subdomain', '==', subdomain)
        )
        .valueChanges()
        .pipe(
          take(1),
          map((data) => (data && data.length ? data[0] : null)),
          tap((data) => {
            this.website$.next(data);
            this.initWebsite(data);
          })
        );
    } else {
      return this.afs
        .collection('websites', (ref) => ref.where('domain', '==', domain))
        .valueChanges()
        .pipe(
          take(1),
          map((data) => (data && data.length ? data[0] : null)),
          tap((data) => {
            this.website$.next(data);
            this.initWebsite(data);
          })
        );
    }
  }

  getTheme(websiteId: string, live: boolean): AngularFirestoreDocument<any> {
    const websiteStatus = live ? 'live' : 'draft';

    return this.afs.doc<any>(
      `websites/${websiteId}-${websiteStatus}/settings/theme_styles`
    );
  }

  initWebsite({ websiteId }: Website) {
    this.pageTemplateSections.clear();
    const baseRef = 'websites/' + websiteId + '-draft';
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

    this.theme = combineLatest([this.pages$, this.website$]).pipe(
      take(1),
      map((theme) => theme)
    );

    this.theme
      .pipe(
        take(1),
        tap(([pages, website]) => {
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

          const page = pages.find((page: Page) => page.default);

          if (page) {
            this.setPage(page);
          }
        })
      )
      .subscribe();
  }

  setPage(page: Page) {
    this.currentPage.next(page);
    //TEMPLATE NEEDS TO BE Current page template from behavior subject map
    this.template = this.pageTemplateSections.get(
      this.currentPage.value.pageId
    )?.value;
    this.template$.next(this.template);
    console.log(this.currentPage.value);
  }
}
