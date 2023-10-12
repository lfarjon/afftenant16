import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { BlogService } from 'src/app/core/services/blog.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$!: Observable<Article>;
  articleForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService
  ) {
    this.initArticleForm();
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['articleId'];
    this.article$ = this.blogService
      .getArticle(articleId)
      .valueChanges()
      .pipe(
        map((article) => {
          article.published_at = article.published_at.toDate();
          article.updated_at = article.updated_at.toDate();
          article.published
            ? this.updateRouteData(true)
            : this.updateRouteData(false);
          this.articleForm.patchValue(article);
          return article;
        })
      );
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[]],
    });
  }

  updateRouteData(published: boolean) {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
    // Update with the required route data
    const updatedData = {
      cta: published ? 'Save draft' : 'Publish',
      action: published ? 'SAVE_DRAFT_ARTICLE' : 'PUBLISH_ARTICLE',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }
}
