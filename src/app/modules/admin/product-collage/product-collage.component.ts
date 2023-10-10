import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feature } from 'src/app/core/models/feature';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-product-collage',
  templateUrl: './product-collage.component.html',
  styleUrls: ['./product-collage.component.scss'],
})
export class ProductCollageComponent {
  @Input() products!: Product[];
  @Input() features!: Feature[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  columnsPerRow = 1; // Adjust this value based on the number of columns per row

  constructor(
    private routeDataService: RouteDataService,
    private route: ActivatedRoute
  ) {
    this.updateRouteData();
  }

  updateRouteData() {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
    // Update with the required route data
    const updatedData = {
      second_cta: 'Add product',
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
}
