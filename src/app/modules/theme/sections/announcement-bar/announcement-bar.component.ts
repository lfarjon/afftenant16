import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
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

import { Subject, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { blockTypeMapping } from 'src/app/core/models/component-mapping';
import { BlockService } from 'src/app/core/services/block.service';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
@Component({
  selector: 'theme-announcement-bar',
  templateUrl: './announcement-bar.component.html',
  styleUrls: ['./announcement-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @ViewChild('announcementBar') announcementBar!: any;

  @Input() section!: DynamicSection;
  private swiper: Swiper | undefined;

  blockTypeMapping: any = blockTypeMapping;
  interval: any;
  currentSlide = 0;
  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: false,
    pagination: false, // updated this line
    scrollbar: { draggable: true },
    init: true,
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    loop: true,
    speed: 500,
  };

  slides: any[] = [];

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private cd: ChangeDetectorRef
  ) {}

  onSwiper(swiper: Swiper) {
    if (swiper) {
      this.interval = setInterval(() => {
        swiper?.slideNext();
      }, 3000);
    }
  }
  onSlideChange() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // Unique section id for this component
    this.blockService
      .getBlocks(this.section.sectionId, this.section.type)
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((blocks) => {
          this.slides = blocks.sort((a, b) => b.order - a.order);

          this.blockService.loadBlocksComponents(
            this.section.sectionId,
            blocks,
            this.dynamicChildren
          );
          this.cd.detectChanges();
        })
      )
      .subscribe();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
    this.swiper?.destroy;
    clearInterval(this.interval);
  }
}
