import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, take, tap } from 'rxjs';
import {
  RankingCards,
  dummyRankingCardsData,
} from 'src/app/core/models/ranking-cards';
import { AddLinkComponent } from '../add-link/add-link.component';
import { LinksService } from 'src/app/core/services/links.service';
import { Link } from 'src/app/core/models/links';
import { Feature } from 'src/app/core/models/feature';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-ranking-cards',
  templateUrl: './ranking-cards.component.html',
  styleUrls: ['./ranking-cards.component.scss'],
})
export class RankingCardsComponent implements OnDestroy {
  @Input() products!: Product[];
  @Input() features!: Feature[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  dummyData = dummyRankingCardsData;
  private unsubscribeAll = new Subject();

  constructor(private dialog: MatDialog, private linkService: LinksService) {}

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  // openFeaturesDialog() {
  //   const dialogRef = this.dialog.open(this.featuresDialog, {
  //     panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
  //     maxWidth: '100vw',
  //   });
  // }

  editLink({ linkId }: RankingCards) {
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
