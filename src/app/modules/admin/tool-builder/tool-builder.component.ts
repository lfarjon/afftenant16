import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import { Feature } from 'src/app/core/models/feature';
import { Link } from 'src/app/core/models/links';
import { Product } from 'src/app/core/models/product';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { LinksService } from 'src/app/core/services/links.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-tool-builder',
  templateUrl: './tool-builder.component.html',
  styleUrls: ['./tool-builder.component.scss'],
})
export class ToolBuilderComponent {
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  selectedTool$: Observable<AffiliateTool>;
  productForm!: FormGroup;
  featuresForm!: FormGroup;
  newProduct: boolean = false;
  products: Product[] = [];
  product!: Product;
  features: Feature[] = [];
  tool!: AffiliateTool;

  private unsubscribeAll = new Subject();

  constructor(
    private toolsService: AffiliateToolsService,
    private confirmationService: ConfirmationService,
    private routeDataService: RouteDataService,
    private linkService: LinksService,
    private ctaService: CtaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.updateRouteData();
    //CTA OBSERVING
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((action) => {
        if (action === 'SAVE_TOOL') {
          this.saveTool();
          this.ctaService.clearAction();
        }
        if (action === 'ADD_TOOL') {
          this.openDialog();
          this.ctaService.clearAction();
        }
        // if (action === 'ADD_FEATURE') {
        //   this.openFeaturesDialog();
        //   this.ctaService.clearAction();
        // }
      });
    const toolId = this.route.snapshot.params['toolId'];
    this.selectedTool$ = this.toolsService.getTool(toolId).valueChanges();
    this.selectedTool$
      .pipe(
        take(1),
        tap((tool: AffiliateTool) => {
          this.tool = tool;
          Array.isArray(tool.data)
            ? (this.products = tool.data)
            : (this.product = tool.data!);

          this.features = tool.features;
        })
      )
      .subscribe();

    this.initProductForm();
    this.featuresForm = this.fb.group({
      features: this.fb.array([]),
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
      second_cta: 'Add card',
      second_action: 'ADD_TOOL',
      second_icon: 'add_circle',
      third_cta: 'Add feature',
      third_action: 'ADD_FEATURE',
      third_icon: 'checklist',
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }

  initProductForm() {
    this.productForm = this.fb.group({
      links: [
        [],
        this.newProduct ? Validators.required : null, // Conditionally apply Validators.required
      ],
      id: ['', Validators.required],
      linkId: ['', Validators.required],
      title: ['', Validators.required],
      badge: ['', Validators.required],
      image: ['', Validators.required],
      buttonLink: ['', Validators.required],
      buttonText: ['', Validators.required], // This remains, but will be conditionally required based on the 'buttonType' value.
      ratings: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ], // Added range validation for scores between 1 and 10.
    });
  }

  get globalFeatures() {
    return this.featuresForm.get('features') as FormArray;
  }

  openDialog({ data, index }: { data?: Product; index?: any } = {}) {
    // Prep the data first
    if (data) {
      //EDIT the data including the features
      this.newProduct = false;
      this.productForm.patchValue(data);
      this.features.map((feature) => {
        const featureForm = this.fb.group({
          name: feature.name,
          value: feature.values[data.id],
        });
        this.globalFeatures.push(featureForm);
      });
    } else {
      // Add new data including the features
      this.newProduct = true;
      this.productForm.patchValue({
        id: uuid(),
      });
      this.features.map((feature) => {
        const featureForm = this.fb.group({
          name: feature.name,
          value: '',
        });
        this.globalFeatures.push(featureForm);
      });
    }
    //Now open the dialog
    const dialogRef = this.dialog.open(this.formDialog, {
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    //Once dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (!!data) {
          this.editProduct(
            this.productForm.value,
            this.featuresForm.value,
            index!
          );
        } else {
          this.addProduct(this.featuresForm.value);
        }
      }

      this.productForm.reset();
      this.initProductForm();
      this.globalFeatures.clear();
    });
  }

  editProduct(product: Product, { features }: any, index: number) {
    //insert edit product in products array
    this.products.splice(index, 1, product);

    //Replace the product's features in the features array
    this.features.map((feature) => {
      features.map((feat: any) => {
        if (feat.name === feature.name) {
          feature.values[product.id] = feat.value;
        }
      });
    });
  }

  addProduct({ features }: any) {
    const form = this.productForm.value;
    const link = form.links;
    //insert the product in products array
    this.products.push({
      id: form.id,
      linkId: link.id,
      buttonLink: link.url,
      image: link.imageUrl,
      ...form,
    });

    //Replace the product's features in the features array
    this.features.map((feature) => {
      features.map((feat: any) => {
        if (feat.name === feature.name) {
          feature.values[form.id] = feat.value;
        }
      });
    });
  }

  deleteProduct({ index, data }: { index: number; data: { id: string } }) {
    this.products.splice(index, 1);
  }

  patchLink(link: Link) {
    this.productForm.patchValue({
      linkId: link.id,
      buttonLink: link.url,
      image: link.imageUrl,
      title: link.title,
    });
  }

  saveTool() {
    const merge = false;

    this.toolsService
      .saveTool(this.tool, this.products, this.features, merge)
      .then(() => this.confirmationService.handleSuccess('Successfully saved!'))
      .catch((err) => this.confirmationService.handleError(err));
  }
}
