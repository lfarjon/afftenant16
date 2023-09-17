import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import {
  blockTypeMapping,
  componentTypeMapping,
} from 'src/app/core/models/component-mapping';
import { BlogService } from 'src/app/core/services/blog.service';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @ViewChild(QuillEditorComponent, { static: false })
  quillEditorInstance!: QuillEditorComponent;

  article$: Observable<Article>;
  componentList = Object.keys(componentTypeMapping).concat(
    Object.keys(blockTypeMapping)
  );

  editorModules = {
    toolbar: '#toolbar',
    blotFormatter: {},
  };

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

  ngOnInit(): void {
    console.log(this.componentList);
  }

  addComponent(event: Event) {
    const component = (event.target as HTMLSelectElement).value;
    // Logic to add the chosen component to your Quill editor
  }
}
