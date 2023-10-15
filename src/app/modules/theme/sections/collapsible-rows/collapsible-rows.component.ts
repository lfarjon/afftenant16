import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { blockTypeMapping } from 'src/app/core/models/component-mapping';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { BlockService } from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-collapsible-rows',
  templateUrl: './collapsible-rows.component.html',
  styleUrls: ['./collapsible-rows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleRowsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;
  blockTypeMapping: any = blockTypeMapping;
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService,
    private cd: ChangeDetectorRef
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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

  darken(hex: string): string {
    return this.shadeService.darkenShade(hex);
  }
}
