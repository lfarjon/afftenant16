import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import { Article } from 'src/app/core/models/article';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { BlogService } from 'src/app/core/services/blog.service';
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

  article$!: Observable<Article>;
  articleForm!: FormGroup;
  fullscreen$: Observable<boolean>;

  private unsubscribeAll = new Subject();

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService,
    private sectionService: SectionService
  ) {
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
          console.log(this.dynamicChildren);
          setTimeout(
            () =>
              this.sectionService.loadSectionsComponents(
                this.dynamicChildren,
                templateSections
              ),
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
      second_action: 'PREVIEW_ARCTICLE',
      third_cta: 'Saved',
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
}
