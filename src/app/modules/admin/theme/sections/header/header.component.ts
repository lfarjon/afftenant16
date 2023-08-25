import {
  AfterViewInit,
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
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DragDropService } from 'src/app/core/services/theme-editor/drag-drop.service';
import { SectionService } from 'src/app/core/services/theme-editor/section.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';

@Component({
  selector: 'theme-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;
  components$!: Observable<DynamicSection[]>;
  @Input() drawer!: MatDrawer;
  @Input() fakeDrawer!: MatDrawer;
  @Input() sidenav: boolean = false;
  @Input() type!: string;

  isHandset$: Observable<boolean>;
  isSelected$ = this.templateService.isSelected;

  private unsubscribeAll = new Subject();

  constructor(
    public templateService: TemplateService,
    public dragDropService: DragDropService,
    private sectionService: SectionService,
    private layoutService: LayoutService
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.templateService.header$
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((sections) => {
          setTimeout(
            () =>
              this.sectionService.loadSectionsComponents(
                this.dynamicChildren,
                sections,
                this.fakeDrawer
              ),
            0
          );
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  selectSection(component: DynamicSection) {
    this.templateService.isSelected.next(component.sectionId);
  }
}
