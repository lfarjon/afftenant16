import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { Link } from 'src/app/core/models/links';
import { LinksService } from 'src/app/core/services/links.service';

@Component({
  selector: 'app-link-selector',
  templateUrl: './link-selector.component.html',
  styleUrls: ['./link-selector.component.scss'],
})
export class LinkSelectorComponent implements OnDestroy {
  @Input() form!: FormGroup;
  @Input() multiple!: boolean;
  @Input() newProduct: boolean = true;
  @Output() linkSelected = new EventEmitter<Link>();
  @Output() limitSelected = new EventEmitter<Link[]>();
  links$: Observable<Link[]>; // Replace 'Link' with your actual link type
  filteredLinks$: Observable<Link[]>;
  filteredLinks: Link[] = [];
  private filter$ = new BehaviorSubject<string>('');
  private unsubscribe$ = new Subject<void>();

  constructor(
    private linksService: LinksService,
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue); // Update the filter value
  }

  toggleSelect(select: MatSelect) {
    if (!select.panelOpen) {
      select.open();
    }
  }

  newSelection(link: Link) {
    this.linkSelected.emit(link);
  }

  limitSelection({ value }: MatSelectChange) {
    this.limitSelected.emit(value);
  }
}
