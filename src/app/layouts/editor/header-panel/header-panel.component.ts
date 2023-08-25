import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { BlockService } from 'src/app/core/services/theme-editor/block.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  components$!: Observable<DynamicSection[] | undefined>;
  moreSections: boolean = true;
  private unsubscribeAll = new Subject();

  constructor(
    private templateService: TemplateService,
    private blockService: BlockService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.components$ = combineLatest([
      this.templateService.header$,
      this.templateService.sidenav$,
    ]).pipe(
      takeUntil(this.unsubscribeAll),
      map(([header, sidenav]) => {
        let sections: DynamicSection[] = [];
        if (header && sidenav) {
          sections = header?.concat(sidenav);
          if (sections.find((s) => s.type === 'theme-announcement-bar')) {
            this.moreSections = false;
          } else {
            this.moreSections = true;
          }
          return sections?.map((section) => {
            return {
              ...section,
              blocks: this.blockService.getBlocks(
                section.sectionId,
                section.type,
                section.blocks as unknown as Block[]
              ),
            };
          });
        } else {
          return sections;
        }
      })
    );
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
