import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import Swiper, { SwiperOptions } from 'swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnDestroy, AfterViewInit {
  @Input() products!: Product[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  private swiper: Swiper | undefined;

  interval: any;

  config: SwiperOptions = {
    navigation: true,
    pagination: false,
    scrollbar: { draggable: true },
    init: true,
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    loop: false,
    speed: 500,
    slideNextClass: 'next-class',
  };

  private unsubscribeAll = new Subject();

  constructor(
    private routeDataService: RouteDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.updateRouteData();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  updateRouteData() {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
    // Update with the required route data
    const updatedData = {
      second_cta: 'Add card',
      second_action: 'ADD_TOOL',
      second_icon: 'add_circle',
      third_cta: 'Add feature',
      third_action: 'ADD_FEATURE',
      third_icon: 'checklist',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }

  onSwiper(swiper: any) {}

  onSlideChange() {}

  edit(data: any, index: number) {
    this.editProduct.emit({
      data: data,
      index: index,
    });
  }

  delete(data: any, index: number) {
    this.deleteProduct.emit({
      data: data,
      index: index,
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
    this.swiper?.destroy;
  }
}
