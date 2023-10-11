import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feature } from 'src/app/core/models/feature';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent {
  @Input() product!: Product;
  @Input() features!: Feature[];
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
  }

  edit(data: any) {
    this.editProduct.emit({
      data: data,
    });
  }
}
