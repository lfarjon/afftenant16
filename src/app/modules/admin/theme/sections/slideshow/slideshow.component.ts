import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Swiper,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { blockTypeMapping } from 'src/app/core/models/component-mapping';
import { BlockService } from 'src/app/core/services/theme-editor/block.service';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @ViewChild('slideshow') slideshow!: any;

  @Input() section!: DynamicSection;
  private swiper: Swiper | undefined;

  blockTypeMapping: any = blockTypeMapping;

  currentSlide = 0;
  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: false,
    scrollbar: { draggable: true },
    init: true,
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    loop: true,
    speed: 500,
    slideNextClass: 'next-class',
  };

  slides: any[] = [];
  styles$: Observable<any>;
  interval: any;

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private cd: ChangeDetectorRef,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();
  }

  onSwiper(swiper: any, styles: any) {
    if (swiper) {
      this.interval = setInterval(() => {
        swiper?.slideNext();
      }, 3000);
    }
  }
  onSlideChange() {
    console.log('slide change');
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
          this.slides = blocks;

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
    this.swiper?.destroy;
    clearInterval(this.interval);
  }
}
