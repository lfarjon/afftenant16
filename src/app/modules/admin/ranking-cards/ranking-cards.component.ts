import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, take, tap } from 'rxjs';

import { AddLinkComponent } from '../add-link/add-link.component';
import { LinksService } from 'src/app/core/services/links.service';
import { Link } from 'src/app/core/models/links';
import { Product } from 'src/app/core/models/product';
import { ActivatedRoute } from '@angular/router';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'aff-ranking-cards',
  templateUrl: './ranking-cards.component.html',
  styleUrls: ['./ranking-cards.component.scss'],
})
export class RankingCardsComponent implements OnDestroy {
  @Input() products!: Product[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  private unsubscribeAll = new Subject();

  constructor(
    private routeDataService: RouteDataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private linkService: LinksService
  ) {
    this.updateRouteData();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  editLink({ linkId }: Product) {
    this.linkService
      .getLink(linkId)
      .valueChanges()
      .pipe(
        take(1),
        tap((link) => {
          this.openLinkDialog(link as Link);
        })
      )
      .subscribe();
  }

  openLinkDialog(link: Link) {
    const dialogRef = this.dialog.open(AddLinkComponent, {
      data: link,
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
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
