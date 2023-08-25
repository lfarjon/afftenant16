import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { CtaService } from 'src/app/core/services/cta.service';
import { LinksService } from 'src/app/core/services/links.service';
import { uuidv4 } from '@firebase/util';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  @ViewChild('linkFormTemplate') linkDialog!: TemplateRef<any>;
  links$: Observable<Link[]>;
  filteredLinks$: Observable<Link[]>;
  filteredLinks: Link[] = [];
  linkForm: FormGroup;
  URL_PATTERN =
    /^https:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

  newLink: boolean = false;
  editing!: number | undefined;
  docRef!: string;
  categories: Category[] = [];
  categories$: Observable<Category[]>;
  filteredCategories$!: Observable<Category[]>;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private filter$ = new BehaviorSubject<string>('');
  private categoryFilter$ = new BehaviorSubject<string>('');

  private unsubscribe$ = new Subject<void>();

  constructor(
    private ctaService: CtaService,
    private linksService: LinksService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.linkForm = this.fb.group({
      id: uuidv4(),
      imageUrl: [''],
      active: false,
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(this.URL_PATTERN)]],
      categories: [],
      active_at: new Date(),
      published_at: new Date(),
      clicks: 0,
    });
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'ADD_LINK') {
          this.openLinkDialog();
          this.ctaService.action$.next(null);
        }
      });

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

    this.categories$ = this.linksService
      .getCategories()
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

    this.filteredCategories$ = combineLatest([
      this.categories$,
      this.categoryFilter$,
    ]).pipe(
      map(([categories, filterString]) => {
        const lowerCaseFilter = filterString.trim().toLowerCase();
        return categories.filter((category) =>
          category.name.toLowerCase().includes(lowerCaseFilter)
        );
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
    if (link) {
      this.linkForm.patchValue({
        ...link,
        active_at: new Date(link.active_at.seconds * 1000),
      });
      this.categories = link.categories;
      this.linkForm.updateValueAndValidity();
    } else {
      this.linkForm.reset();
      this.categories = [];
      this.linkForm.patchValue({
        id: uuidv4(),
        clicks: 0,
        imageUrl: '',
        active: false,
        categories: [],
      });
    }

    const dialogRef = this.dialog.open(this.linkDialog, {
      data: {
        form: this.linkForm,
        link: link,
      },
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });
  }

  saveLink(link: Link) {
    if (!this.linkForm.valid) {
      return;
    }

    this.dialog.closeAll();

    link = this.prepareLinkData(link);
    this.saveLinkData(link)
      .then(() => this.saveCategories(link.categories))
      .then(() =>
        this.handleSuccess([link.title, 'successfully saved'].join(' '))
      )
      .catch(this.handleError);
  }

  prepareLinkData(link: Link): Link {
    return {
      ...link,
      categories: this.categories,
      published_at: new Date(),
    };
  }

  saveLinkData(link: Link): Promise<void> {
    return this.linksService.addLink(link);
  }

  saveCategories(categories: Category[]): Promise<void[]> {
    const categoryPromises: Promise<void>[] = categories.map((category) =>
      this.linksService.saveCategory(category)
    );

    return Promise.all(categoryPromises);
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

  deleteLink(link: Link) {
    this.dialog.closeAll();
    this.newLink = false;
    this.editing = undefined;
    this.linksService.deleteLink(link).then(() => {
      //this.links.removeAt(index);
      this.cd.detectChanges();
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

  saveDownloadUrl(downloadData: { file: any; url: string }) {
    this.linkForm.patchValue({ imageUrl: downloadData.url });
  }

  getDocRef(link: Link): string {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return 'tenants/'
      .concat([tenant.uid, 'links', link.id].join('/'))
      .concat('/');
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

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categories.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  removeCategory(category: Category): void {
    const index = this.categories.findIndex(
      (cat: any) => cat.name === category.name
    );
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selectedCategory(event: any): void {
    const selectedName = event.option.viewValue;
    if (!this.categories.some((category) => category.name === selectedName)) {
      this.categories.push({ name: selectedName });
    }
  }

  updateCategoryFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.categoryFilter$.next(inputElement.value);
  }
}
