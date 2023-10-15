import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalFeature } from 'src/app/core/models/feature';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'aff-comparison-matrix',
  templateUrl: './comparison-matrix.component.html',
  styleUrls: ['./comparison-matrix.component.scss'],
})
export class ComparisonMatrixComponent implements AfterViewInit {
  @Input() data!: Product[];
  @Input() globalFeatures!: GlobalFeature[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  constructor(
    private routeDataService: RouteDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.updateRouteData();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
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
      third_cta: 'Add comparison feature',
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
