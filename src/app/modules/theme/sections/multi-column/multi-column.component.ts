import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { blockTypeMapping } from 'src/app/core/models/component-mapping';
import { Observable, map, takeUntil, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { BlockService } from 'src/app/core/services/block.service';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Viewport } from 'src/app/core/models/viewport';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-multi-column',
  templateUrl: './multi-column.component.html',
  styleUrls: ['./multi-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiColumnComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;

  viewPort$!: Observable<Viewport>;
  styles$: Observable<any>;
  blockTypeMapping: any = blockTypeMapping;
  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private cd: ChangeDetectorRef,
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();
    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Unique section id for this component
    this.blockService
      .getBlocks(this.section.sectionId, this.section.type)
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((blocks) => {
          this.blockService.loadBlocksComponents(
            this.section.sectionId,
            blocks,
            this.dynamicChildren
          );
          this.cd.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
