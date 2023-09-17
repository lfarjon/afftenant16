import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { BlogService } from 'src/app/core/services/blog.service';
import { CtaService } from 'src/app/core/services/cta.service';
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
    private blogService: BlogService
  ) {
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
      title: '',
      handle: '',
      content: '',
      last_saved: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      status: 'DRAFT',
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
