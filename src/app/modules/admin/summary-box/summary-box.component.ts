import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-summary-box',
  templateUrl: './summary-box.component.html',
  styleUrls: ['./summary-box.component.scss'],
})
export class SummaryBoxComponent {
  @Input() product!: Product;
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

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
      third_cta: 'Add feature',
      third_action: 'ADD_FEATURE',
      third_icon: 'checklist',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }

  edit(data: any) {
    this.editProduct.emit({
      data: data,
    });
  }
}
