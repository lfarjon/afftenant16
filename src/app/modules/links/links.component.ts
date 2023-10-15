import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { Confirmation } from 'src/app/core/models/confirmation';
import { Link } from 'src/app/core/models/links';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { LinksService } from 'src/app/core/services/links.service';
import { MatDialog } from '@angular/material/dialog';

import { AddLinkComponent } from '../add-link/add-link.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  links$: Observable<Link[]>;
  filteredLinks$: Observable<Link[]>;
  filteredLinks: Link[] = [];
  private filter$ = new BehaviorSubject<string>('');
  private unsubscribe$ = new Subject<void>();

  constructor(
    private linksService: LinksService,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) {
    this.links$ = this.linksService
      .getLinks()
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, ...data };
          });
        })
      );

    // Combine the original observable with the filter observable
    this.filteredLinks$ = combineLatest([this.links$, this.filter$]).pipe(
      map(([links, filterString]) => {
        const lowerCaseFilter = filterString.trim().toLowerCase();
        // Filter the links based on the title and url
        const filteredLinks = links.filter(
          (link) =>
            link.title.toLowerCase().includes(lowerCaseFilter) ||
            link.url.toLowerCase().includes(lowerCaseFilter) ||
            (link.categories &&
              link.categories.some((category) =>
                category.name.toLowerCase().includes(lowerCaseFilter)
              ))
        );

        // Then, sort the filtered links by the most recent published_at date
        return filteredLinks;
      })
    );

    this.filteredLinks$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((links) => {
        this.filteredLinks = links.sort(
          (a: Link, b: Link) => Number(b.published_at) - Number(a.published_at) // Sorting in descending order of date
        );
        this.cd.detectChanges(); // Trigger change detection since we're using OnPush strategy
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openLinkDialog(link?: Link) {
    const dialogRef = this.dialog.open(AddLinkComponent, {
      data: link,
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue); // Update the filter value
  }

  openPicker(event: Event) {
    event.preventDefault();
    this.picker.open();
  }

  toggleStatus(link: Link) {
    this.linksService
      .toggleStatus(link)
      .then(() =>
        this.handleSuccess(
          [
            link.title,
            link.active ? 'successfully deactivated' : 'successfully activated',
          ].join(' ')
        )
      )
      .catch(this.handleError);
  }

  handleSuccess(message: string) {
    const confirmation: Confirmation = {
      message: message,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirmationService.confirm(confirmation);
  }

  handleError = (err: any) => {
    const confirmation: Confirmation = {
      message: err,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirmationService.confirm(confirmation);
  };

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
