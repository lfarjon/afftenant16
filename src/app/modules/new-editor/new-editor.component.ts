import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import { Article } from 'src/app/core/models/article';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NewEditorComponent {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;
  selectedSection$ = this.sectionService.selectedSection$;

  editingBlock$ = new BehaviorSubject<Block | null>(null);
  article$!: Observable<Article>;
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  private unsubscribeAll = new Subject();

  constructor(
    public sectionService: SectionService,
    public dragDropService: DragDropService,
    private blockService: BlockService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.blockService.editingBlock
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap(({ editing, block }) => {
          if (editing && block) {
            this.editingBlock$.next(block);
            this.cd.detectChanges();
          } else {
            this.editingBlock$.next(null);
          }
        })
      )
      .subscribe();

    const articleId = this.route.snapshot.params['id'];

    this.blogService
      .getArticle(articleId)
      .valueChanges()
      .pipe(
        tap((article) => {
          console.log(article);
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
  }

  clearSelection() {
    this.sectionService.selectedSection$.next(null);
  }

  drop(event: any, components: DynamicSection[]) {
    const data = event.item.data;

    if (data) {
      // //Add block to asset
      this.sectionService.addBlockToAsset(
        event.currentIndex,
        data.id,
        data.assetType,
        data.block,
        data.blockType
      );
    } else {
      this.dragDropService.dropSection(event);
    }
  }

  selectSection(section: DynamicSection) {
    this.sectionService.selectedSection$.next(section);
  }
}
