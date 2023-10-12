import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { lorem } from 'src/app/core/models/lorem';
import { BlogService } from 'src/app/core/services/blog.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles$!: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctaService: CtaService,
    private blogService: BlogService,
    private routeDataService: RouteDataService
  ) {
    //Set Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);

    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'NEW_ARTICLE') {
          this.addArticle();
          this.ctaService.action$.next(null);
        }
      });

    this.articles$ = this.blogService
      .getArticles()
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
  }

  ngOnInit(): void {}

  handleSelectionChange(selectedRows: any) {
    // You can handle selected rows here.
  }

  handleAction(row: any) {
    this.router.navigate(['admin/article/' + row.id]);
  }

  addArticle() {
    const article: Article = {
      articleId: uuid(),
      websiteId: JSON.parse(localStorage.getItem('website')!),
      title: lorem.generateSentences(1),
      handle: '',
      content: '',
      tags: [''],
      updated_at: new Date(),
      published_at: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      published: false,
    };

    this.blogService.saveArticle(article).then(() => {
      this.router.navigate(['admin/article/' + article.articleId]);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
