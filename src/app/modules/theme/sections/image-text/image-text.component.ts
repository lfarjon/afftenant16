import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { BlockService } from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageTextComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;
  viewPort$!: Observable<Viewport>;
  image: string = 'assets/placeholders/600x600.png';
  styles$: Observable<any>;

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
          const image = blocks.find((block) => block.type === 'block-image')
            ?.model.fileUrl;
          if (image?.length > 0) {
            this.image = image;
          }
          this.blockService.loadBlocksComponents(
            this.section.sectionId,
            blocks,
            this.dynamicChildren,
            'image-with-text'
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
