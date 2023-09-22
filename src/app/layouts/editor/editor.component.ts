import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { editorNavListItems } from 'src/app/core/menus/editor.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { Page } from 'src/app/core/models/page';
import { tailwindThemes } from 'src/app/core/models/tailwind-colors';
import { Viewport, viewports } from 'src/app/core/models/viewport';
import { Website } from 'src/app/core/models/website';
import { CtaService } from 'src/app/core/services/cta.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/theme-editor/block.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { WebsiteService } from 'src/app/core/services/website.service';
import { AddPageComponent } from 'src/app/modules/admin/add-page/add-page.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnDestroy, AfterViewInit {
  @ViewChild('drawer', { static: false }) drawer!: MatDrawer;
  navListItems: (NavListWithIcon | NavListWithLabel)[] = editorNavListItems;
  routeData: Data;
  isHandset$: Observable<boolean>;
  viewPort$!: Observable<Viewport>;
  theme$: Observable<any>;
  viewports = viewports;
  websiteId: string;
  editingBlock: boolean = false;
  website$: Observable<Website>;
  pages$: Observable<Page[]>;
  page$: Observable<Page>;
  currentPage: Page = {} as Page;
  form: FormGroup;
  tailwindThemes = [
    ...tailwindThemes.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
  ];

  private unsubscribeAll = new Subject();

  constructor(
    private themeService: ThemeService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private blockService: BlockService,
    private ctaService: CtaService,
    private templateService: TemplateService,
    private websiteService: WebsiteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private shadeService: ShadeGeneratorService
  ) {
    const routeSnapshot = this.route.snapshot;
    this.routeData = routeSnapshot.data;
    this.websiteId = JSON.parse(localStorage.getItem('website')!);
    this.website$ = this.websiteService.getWebsite().valueChanges();
    this.isHandset$ = this.layoutService.isHandset$;
    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );
    this.theme$ = this.themeService.getTheme(false).valueChanges();
    this.page$ = this.templateService.currentPage;
    this.pages$ = this.templateService.pages$.pipe(
      takeUntil(this.unsubscribeAll),
      map((pages) =>
        pages.sort((a, b) => Number(b.default) - Number(a.default))
      )
    );
    this.blockService.editingBlock
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ editing }: BlockEditing) => {
        this.editingBlock = editing;
      });

    this.form = this.fb.group({
      page: [''],
    });

    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((action) => {
        if (action === 'SAVE_WEBSITE') {
          this.websiteService.saveWebsite();
          this.ctaService.clearAction();
        }
        if (action === 'PUBLISH_WEBSITE') {
          this.websiteService.saveAndPublishWebsite();
          this.ctaService.clearAction();
        }
      });
    this.templateService.currentPage.subscribe((page) => {
      if (page) this.currentPage = page;
      this.form.patchValue({
        page: page,
      });
    });
    // const autoSaver = interval(10000);
    // autoSaver.pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
    //   this.templateService.saveWebsite();
    // });
  }

  navigate(route: NavListWithIcon | NavListWithLabel) {
    const base: string = '/admin/website/' + this.websiteId;
    this.router.navigate([base + route.routerLink]);
  }

  compareFn(c1: Page, c2: Page): boolean {
    return c1 && c2 ? c1.pageId === c2.pageId : c1 === c2;
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    this.loadDrawer();
  }

  stopEditing() {
    this.blockService.editingBlock.next({
      editing: false,
      block: undefined,
    });
  }

  setPage(page: Page) {
    if (!!page) {
      this.templateService.setPage(page);
    } else {
    }
  }

  openAddPageDialog() {
    const dialogRef = this.dialog.open(AddPageComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  makeDefaultPage(page: Page) {
    const addingPage = false;
    this.websiteService.togglePageDefault(page, addingPage);
  }

  openViewportMenu() {}

  changeViewport(viewport: Viewport, drawer: MatDrawer) {
    if (viewport.viewport !== 'fullscreen') {
      drawer.open();
      this.layoutService.viewPort$.next(viewport);
    } else {
      this.layoutService.viewPort$.next(this.viewports[0]);
      drawer.close();
    }
  }

  saveTheme(theme: any) {
    this.themeService.saveTheme(theme, false);
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }

  loadDrawer() {
    this.templateService.drawer.next(this.drawer);
  }
}
