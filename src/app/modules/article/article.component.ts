import { C } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, take, takeUntil, tap } from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import { Article } from 'src/app/core/models/article';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;
  @ViewChild('contentContainer', { static: false })
  contentContainer!: ElementRef;

  @Input()
  drawer!: MatDrawer;
  isHandset$: Observable<boolean>;
  selectedSection$ = this.sectionService.selectedSection$;

  article$!: Observable<Article>;
  articleForm!: FormGroup;
  fullscreen$: Observable<boolean>;

  private unsubscribeAll = new Subject();

  constructor(
    public dragDropService: DragDropService,
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService,
    private sectionService: SectionService,
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
    this.fullscreen$ = this.blogService.fullscreen$;

    const articleId = this.route.snapshot.params['id'];

    this.blogService
      .getArticle(articleId)
      .valueChanges()
      .pipe(
        tap((article) => {
          //set article$ as an observer of behavior subject article
          this.article$ = this.blogService.article$;
          // set next state of article in
          this.blogService.article$.next(article);
        }),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe();

    this.blogService.article$
      .pipe(
        tap(({ templateSections }) => {
          setTimeout(
            () => {
              this.sectionService.loadSectionsComponents(
                this.dynamicChildren,
                templateSections
              );
              this.cd.detectChanges();
            },

            0
          );
        }),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe();

    this.initArticleForm();
    this.updateRouteData(false);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngOnInit(): void {}

  updateRouteData(published: boolean) {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
    // Update with the required route data
    const updatedData = {
      cta: published ? 'Save draft' : 'Publish',
      action: published ? 'SAVE_DRAFT_ARTICLE' : 'PUBLISH_ARTICLE',
      second_cta: 'Preview',
      second_icon: 'preview',
      second_action: 'PREVIEW_ARCTICLE',
      third_cta: '',
      third_action: 'OPEN_BLOCK_SELECTOR',
      third_icon: 'dashboard_customize',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      tags: [[]],
      content: this.fb.array([], Validators.required),
    });
  }

  get contentArray(): FormArray {
    return this.articleForm.get('content') as FormArray;
  }

  drop(event: any, components: DynamicSection[]) {
    console.log('drop zone');
    this.dragDropService
      .drop(event, components)
      .pipe(
        take(1),
        tap((sections) => {
          const article = this.blogService.article$.value;

          this.blogService.article$.next({
            ...article,
            templateSections: sections,
          });
        })
      )
      .subscribe();
  }

  selectSection(section: DynamicSection) {
    this.sectionService.selectedSection$.next(section);
  }
}
