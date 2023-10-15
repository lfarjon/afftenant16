import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import { componentTypeMapping } from 'src/app/core/models/component-mapping';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { SectionService } from 'src/app/core/services/section.service';
import { TemplateService } from 'src/app/core/services/template.service';

@Component({
  selector: 'theme-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, OnDestroy {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;
  @Input() drawer!: MatDrawer;
  isHandset$: Observable<boolean>;
  componentTypeMapping: any = componentTypeMapping;
  isClicked = false;
  isSelected$ = this.templateService.isSelected;

  private unsubscribeAll = new Subject();

  constructor(
    public templateService: TemplateService,
    public dragDropService: DragDropService,
    private sectionService: SectionService,
    private layoutService: LayoutService
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
    this.templateService.template$
      .pipe(
        tap((c) =>
          setTimeout(
            () =>
              this.sectionService.loadSectionsComponents(
                this.dynamicChildren,
                c
              ),
            0
          )
        ),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe();

    this.isSelected$ = this.templateService.isSelected;
  }

  ngOnInit(): void {
    //setTimeout(() => this.loadComponents(this.templateService.components), 0);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  selectSection(component: DynamicSection) {
    this.templateService.isSelected.next(component.sectionId);
  }
}
