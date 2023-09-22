import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article>;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    const articleId = this.route.snapshot.params['articleId'];
    this.article$ = this.blogService
      .getArticle(articleId)
      .valueChanges()
      .pipe(
        map((article) => {
          article.last_saved = article.last_saved.toDate();
          return article;
        })
      );
  }

  ngOnInit(): void {}
}
