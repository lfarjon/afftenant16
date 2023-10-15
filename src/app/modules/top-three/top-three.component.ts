import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { Product } from 'src/app/core/models/product';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'aff-top-three',
  templateUrl: './top-three.component.html',
  styleUrls: ['./top-three.component.scss'],
})
export class TopThreeComponent implements AfterViewInit {
  @Input() tool!: DynamicSection;
  @Input() data!: Product[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  constructor(
    private routeDataService: RouteDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.updateRouteData();
  }

  ngAfterViewInit(): void {
    console.log(this.tool);
    this.cd.detectChanges();
  }
  updateRouteData() {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
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
