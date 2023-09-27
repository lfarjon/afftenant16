import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { ImageUploaderComponent } from 'src/app/components/image-uploader/image-uploader.component';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import { Confirmation } from 'src/app/core/models/confirmation';
import {
  ProductBox,
  dummyProductBoxData,
} from 'src/app/core/models/product-box';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent {
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;

  @ViewChild(ImageUploaderComponent, { static: false })
  imageUploader!: ImageUploaderComponent;
  @Input() tool!: AffiliateTool;
  form: FormGroup;
  link!: ProductBox;
  dummyData = dummyProductBoxData;
  imageBeingUploaded!: boolean;
  imagePreview!: string;
  private unsubscribeAll = new Subject();

  constructor(
    private route: ActivatedRoute,
    private ctaService: CtaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private affToolsService: AffiliateToolsService,
    private confirmationService: ConfirmationService,
    private routeDataService: RouteDataService
  ) {
    this.updateRouteData();
    //CTA OBSERVING
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((action) => {
        if (action === 'SAVE_TOOL') {
          this.saveLink();
          this.ctaService.clearAction();
        }
        if (action === 'EDIT_TOOL') {
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
          !!data
            ? this.patchValue(data as unknown as ProductBox)
            : this.patchValue(this.dummyData);
        })
      )
      .subscribe();

    this.form = this.fb.group({
      title: ['', Validators.required],
      feature: ['', Validators.required],
      buttonLink: ['', Validators.required],
      buttonText: ['', Validators.required], // This remains, but will be conditionally required based on the 'buttonType' value.
      score: ['', [Validators.required, Validators.min(1), Validators.max(10)]], // Added range validation for scores between 1 and 10.
      description: ['', Validators.required],
      image: ['', Validators.required], // Image for the "Image Section". Assuming it's mandatory, hence Validators.required.
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  updateRouteData() {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
    // Update with the required route data
    const updatedData = {
      second_cta: 'Edit card',
      second_action: 'EDIT_TOOL',
      second_icon: 'edit',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }

  patchValue(data: ProductBox) {
    // Patching product
    this.link = data;
  }

  openDialog() {
    if (!!this.link) this.form.patchValue(this.link);
    const dialogRef = this.dialog.open(this.formDialog, {
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (!!this.link) {
          this.editLink(this.form.value!);
        }
      } else {
        this.form.reset();
      }
    });
  }

  editLink(data: ProductBox) {
    this.link = data;
  }

  async saveLink() {
    if (this.imageUploader.newFileSelected && !this.imageUploader.hasFile()) {
      alert('Please select a file for all uploaders before saving.');
      return;
    }

    if (this.imageUploader.newFileSelected) {
      await this.imageUploader.startUpload();
    } else {
      this.continueSaving({
        file: null,
        url: this.form.get('image')?.value,
      });
    }
  }

  getDocRef(product: any): string {
    const tenant = JSON.parse(localStorage.getItem('user')!);
    return 'tenants/'
      .concat([tenant.uid, 'tools', product.id].join('/'))
      .concat('/');
  }

  continueSaving(downloadData: { file: any; url: string }) {
    this.link.image = downloadData.url;
    this.saveTool();
  }

  updateImagePreview(dataUrl: string) {
    this.imagePreview = dataUrl;
    this.imageBeingUploaded = true;
  }

  saveTool() {
    const data: ProductBox = this.link;
    const merge = false;

    this.affToolsService
      .saveTool(this.tool, data, merge)
      .then(() => this.handleSuccess())
      .catch((err) => this.handleError(err));
  }

  handleSuccess() {
    const message = 'Successfully saved Ranking Cards!';
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
