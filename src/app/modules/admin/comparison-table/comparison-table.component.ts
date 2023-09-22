import {
  Component,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { ImageUploaderComponent } from 'src/app/components/image-uploader/image-uploader.component';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import {
  ComparisonTable,
  dummyComparisonTableData,
} from 'src/app/core/models/comparison-table-data';
import { Confirmation } from 'src/app/core/models/confirmation';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss'],
})
export class ComparisonTableComponent implements OnDestroy {
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  @ViewChildren(ImageUploaderComponent)
  imageUploaders!: QueryList<ImageUploaderComponent>;
  @Input() tool!: AffiliateTool;
  currentUploadIndex!: number;
  uploadedImagesCount = 0;
  comparisonTableForm: FormGroup;
  data!: ComparisonTable;

  // Dummy data
  dummyData = dummyComparisonTableData;

  imageBeingUploaded: { [key: number]: boolean } = {};
  imagePreviews: { [key: number]: string } = {};

  private unsubscribeAll = new Subject();

  constructor(
    private route: ActivatedRoute,
    private affToolsService: AffiliateToolsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private ctaService: CtaService
  ) {
    //CTA OBSERVING
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((action) => {
        if (action === 'SAVE_TOOL') {
          this.saveTable();
          this.ctaService.clearAction();
        }
        if (action === 'ADD_TOOL') {
          this.openDialog();
          this.ctaService.clearAction();
        }
      });
    this.affToolsService
      .getTool(this.route.snapshot.params['toolId'])
      .valueChanges()
      .pipe(
        take(1),
        tap(({ data }: AffiliateTool) => {
          console.log(data);
          !!data
            ? this.patchValue(data as unknown as ComparisonTable)
            : this.patchValue(this.dummyData);
        })
      )
      .subscribe();
    this.comparisonTableForm = this.fb.group({
      comparisonPoints: this.fb.array([]), // Rows
      products: this.fb.array([]), // Columns
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  updateImagePreview(dataUrl: string, index: number) {
    this.imagePreviews[index] = dataUrl;
    this.imageBeingUploaded[index] = true;
  }

  patchValue(data: ComparisonTable) {
    // Patching products
    data.products.forEach((product) => {
      this.addProduct(product);
    });

    // Patching comparison points
    data.comparisonPoints.forEach((comparisonPoint) => {
      this.addComparisonPoint(comparisonPoint);
    });
  }

  get comparisonPoints() {
    return this.comparisonTableForm.get('comparisonPoints') as FormArray;
  }

  get products() {
    return this.comparisonTableForm.get('products') as FormArray;
  }

  addComparisonPoint(comparisonData?: {
    value: string;
    productsDetails: any[];
  }) {
    let productsDetailsFormArray;

    if (comparisonData) {
      productsDetailsFormArray = this.fb.array(
        comparisonData.productsDetails.map((detail) => this.fb.group(detail))
      );
    } else {
      // If there is no comparisonData provided, create productsDetailsFormArray with the same length as products FormArray.
      productsDetailsFormArray = this.fb.array(
        this.products.controls.map(() => this.fb.group({ detail: '' }))
      );
    }

    const pointGroup = this.fb.group({
      value: [comparisonData?.value || '', Validators.required],
      productsDetails: productsDetailsFormArray,
    });

    this.comparisonPoints.push(pointGroup);
  }

  addProduct(productData?: { badge: string; image: string; link: string }) {
    const productGroup = this.fb.group(
      productData || {
        id: uuid(),
        title: ['', Validators.required],
        badge: ['', Validators.required],
        image: ['', Validators.required],
        link: ['', Validators.required],
        linkText: ['', Validators.required],
      }
    );

    this.products.push(productGroup);

    // Add details to each comparison point for this new product
    this.comparisonPoints.controls.forEach((cp: any) => {
      const productsDetails = cp.get('productsDetails') as FormArray;
      productsDetails.push(this.fb.group({ detail: '' }));
    });

    console.log(this.comparisonTableForm.value);
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
    this.comparisonPoints.controls.forEach((cp) => {
      (cp.get('productsDetails') as FormArray).removeAt(index);
    });
  }

  removeComparisonPoint(index: number): void {
    this.comparisonPoints.removeAt(index);
  }

  createProductDetailsArray() {
    const array: FormGroup[] = [];
    for (let i = 0; i < this.products.length; i++) {
      array.push(this.fb.group({ detail: '' }));
    }
    return array;
  }

  getProductDetails(cp: AbstractControl): FormArray {
    return cp.get('productsDetails') as FormArray;
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.formDialog, {
      data: {},
      panelClass: ['lg:w-5/6', 'w-full', 'h-5/6', 'overflow-y-scroll'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //if (result) this.addToComparisonTable();
    });
  }

  async saveTable() {
    const uploaders: ImageUploaderComponent[] = this.imageUploaders.toArray();
    for (const uploader of uploaders) {
      if (uploader.newFileSelected && !uploader.hasFile()) {
        alert('Please select a file for all uploaders before saving.');
        return;
      }
    }

    const productControls = (
      this.comparisonTableForm.get('products') as FormArray
    ).controls;
    for (let i = 0; i < productControls.length; i++) {
      this.currentUploadIndex = i;
      const uploader: ImageUploaderComponent = uploaders[i];
      if (uploader.newFileSelected) {
        // Only start the upload if a new file has been selected
        await uploader.startUpload();
      } else {
        this.continueSaving({
          file: null,
          url: productControls[i].get('image')?.value,
        });
      }
    }
  }

  getDocRef(product: any): string {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return 'tenants/'
      .concat([tenant.uid, 'tools', product.id].join('/'))
      .concat('/');
  }

  continueSaving(downloadData: { file: any; url: string }) {
    this.patchImages(this.currentUploadIndex, downloadData.url);
    this.uploadedImagesCount++;
    if (this.uploadedImagesCount === this.products.controls.length) {
      this.saveTool();
    }
  }

  patchImages(index: number, imageUrl: string) {
    const productsFormArray = this.comparisonTableForm.get(
      'products'
    ) as FormArray;

    // Get the specific product form group by index
    const productFormGroup = productsFormArray.at(index) as FormGroup;

    // Update the 'image' form control value
    productFormGroup.patchValue({
      image: imageUrl,
    });
  }

  saveTool() {
    const data: ComparisonTable = {
      ...this.comparisonTableForm.value,
    };

    const merge = false;

    this.affToolsService
      .saveTool(this.tool, data, merge)
      .then(() => this.handleSuccess())
      .catch((err) => this.handleError(err));
    this.uploadedImagesCount = 0; // Resetting the counter
  }

  handleSuccess() {
    const message = 'Successfully saved confirmation table!';
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
}
