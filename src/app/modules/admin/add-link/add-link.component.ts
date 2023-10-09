import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Link } from 'src/app/core/models/links';
import { uuidv4 } from '@firebase/util';
import { Category } from 'src/app/core/models/category';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { LinksService } from 'src/app/core/services/links.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Confirmation } from 'src/app/core/models/confirmation';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent {
  URL_PATTERN =
    /^https:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

  linkForm: FormGroup;
  docRef!: string;
  categories: Category[] = [];
  categories$: Observable<Category[]>;
  filteredCategories$!: Observable<Category[]>;
  newLink: boolean = false;
  editing!: number | undefined;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private categoryFilter$ = new BehaviorSubject<string>('');

  constructor(
    public dialog: MatDialogRef<AddLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private linksService: LinksService,
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

    if (this.link) {
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
  }

  getDocRef(link: Link): string {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return 'tenants/'
      .concat([tenant.uid, 'links', link.id].join('/'))
      .concat('/');
  }

  saveDownloadUrl(downloadData: { file: any; url: string }) {
    this.linkForm.patchValue({ imageUrl: downloadData.url });
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

  saveLink(link: Link) {
    if (!this.linkForm.valid) {
      return;
    }

    this.dialog.close();

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
    this.dialog.close();
    this.newLink = false;
    this.editing = undefined;
    this.linksService.deleteLink(link).then(() => {
      //this.links.removeAt(index);
      this.cd.detectChanges();
    });
  }
}
