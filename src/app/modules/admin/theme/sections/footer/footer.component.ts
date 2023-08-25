import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  mergeMap,
  takeUntil,
  tap,
} from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DragDropService } from 'src/app/core/services/theme-editor/drag-drop.service';
import { SectionService } from 'src/app/core/services/theme-editor/section.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';

@Component({
  selector: 'theme-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;
  @Input() drawer!: MatDrawer;
  components$!: Observable<DynamicSection[]>;
  isClicked = false;
  isSelected$ = this.templateService.isSelected;
  isHandset$: Observable<boolean>;

  private unsubscribeAll = new Subject();

  constructor(
    public templateService: TemplateService,
    public dragDropService: DragDropService,
    private sectionService: SectionService,
    private layoutService: LayoutService
  ) {
    this.isHandset$ = this.layoutService.isHandset$;

    this.templateService.footer$
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((c) => {
          setTimeout(
            () =>
              this.sectionService.loadSectionsComponents(
                this.dynamicChildren,
                c
              ),
            0
          );
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  selectSection(component: DynamicSection) {
    this.templateService.isSelected.next(component.sectionId);
  }
}
