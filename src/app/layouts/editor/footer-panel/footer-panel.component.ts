import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { BlockService } from 'src/app/core/services/theme-editor/block.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';

@Component({
  selector: 'app-footer-panel',
  templateUrl: './footer-panel.component.html',
  styleUrls: ['./footer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  components$!: Observable<DynamicSection[] | undefined>;
  isSelected = this.templateService.isSelected;
  private unsubscribeAll = new Subject();
  constructor(
    private templateService: TemplateService,
    private blockService: BlockService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.components$ = this.templateService.footer$.pipe(
      takeUntil(this.unsubscribeAll),
      map((components) =>
        components?.map((component) => {
          return {
            ...component,
            blocks: this.blockService.getBlocks(
              component.sectionId,
              component.type,
              component.blocks as unknown as Block[]
            ),
          };
        })
      )
    );
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
