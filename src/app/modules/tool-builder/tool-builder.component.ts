import {
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import {
  GlobalFeature,
  LocalFeature,
  buildGlobalFeatures,
} from 'src/app/core/models/feature';
import { Link } from 'src/app/core/models/links';
import { Product } from 'src/app/core/models/product';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { LinksService } from 'src/app/core/services/links.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-tool-builder',
  templateUrl: './tool-builder.component.html',
  styleUrls: ['./tool-builder.component.scss'],
})
export class ToolBuilderComponent {
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  @ViewChild('globalFeaturesDialog') globalFeaturesDialog!: TemplateRef<any>;
  showFeatures: boolean = true;
  showForm: boolean = true;
  showDescription: boolean = false;
  showProsAndCons: boolean = false;
  justTitle: boolean = false;
  selectedTool$: Observable<DynamicSection>;
  productForm!: FormGroup;
  globalFeaturesForm!: FormGroup;
  newProduct: boolean = false;
  products: Product[] = [];
  product!: any;
  globalFeatures: GlobalFeature[] = [];
  tool!: DynamicSection;
  allowLinkChange: boolean = false;

  private unsubscribeAll = new Subject();

  constructor(
    private toolsService: AffiliateToolsService,
    private confirmationService: ConfirmationService,
    private linkService: LinksService,
    private ctaService: CtaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
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
        if (action === 'ADD_FEATURE') {
          this.openFeaturesDialog();
          this.ctaService.clearAction();
        }
      });
    const toolId = this.route.snapshot.params['toolId'];
    this.selectedTool$ = this.toolsService.getTool(toolId).valueChanges();
    this.selectedTool$
      .pipe(
        take(1),
        tap((tool: DynamicSection) => {
          this.tool = tool;
          //check if changing links is allowed in edit
          this.allowLinkChange = true;

          if (
            this.tool.type === 'aff-product-collage' ||
            this.tool.type === 'aff-product-slider'
          ) {
            this.showFeatures = false;
            this.showForm = false;
          }

          if (this.tool.type === 'aff-product-slider') this.justTitle = true;

          if (
            this.tool.type === 'aff-summary-box' ||
            this.tool.type === 'aff-product-box'
          ) {
            this.showDescription = true;
          }
          if (this.tool.type === 'aff-summary-box') {
            this.showProsAndCons = true;
          }

          Array.isArray(tool.data)
            ? (this.products = tool.data)
            : (this.product = tool.data!);

          this.globalFeatures = tool.globalFeatures!;
        })
      )
      .subscribe();

    this.initProductForm();
    this.initGlobalFeaturesForm();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  initGlobalFeaturesForm() {
    this.globalFeaturesForm = this.fb.group({
      features: this.fb.array([]),
    });
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
      description: [''],
      pros: this.fb.array([]),
      cons: this.fb.array([]),
      localFeatures: this.fb.array([]),
    });
  }

  get globalFeaturesValue() {
    return this.globalFeaturesForm.get('features') as FormArray;
  }

  get localFeatures() {
    return this.productForm.get('localFeatures') as FormArray;
  }

  get pros() {
    return this.productForm.get('pros') as FormArray;
  }

  get cons() {
    return this.productForm.get('cons') as FormArray;
  }

  addLocalFeature(localFeature?: LocalFeature) {
    const newLocalFeature = this.fb.group({
      name: '',
      value: ['', Validators.required],
    });

    localFeature && newLocalFeature.patchValue(localFeature);

    this.localFeatures.push(newLocalFeature);
  }

  removeLocalFeature(i: number) {
    this.localFeatures.removeAt(i);
  }

  addPro(pro?: string) {
    const newPro = this.fb.group({
      pro: [''],
    });

    pro && newPro.patchValue({ pro: pro });

    this.pros.push(newPro);
  }

  removePro(i: number) {
    this.pros.removeAt(i);
  }

  addCon(con?: string) {
    const newCon = this.fb.group({
      con: [''],
    });

    con && newCon.patchValue({ con: con });
    this.cons.push(newCon);
  }

  removeCon(i: number) {
    this.cons.removeAt(i);
  }

  openDialog(
    { data, index }: { data?: Product; index?: number } = {},
    multiple?: boolean
  ) {
    // Prep the data first
    if (data) {
      //EDIT the data including the features
      this.newProduct = false;
      this.productForm.patchValue(data);

      if (this.tool.type !== 'aff-comparison-matrix') {
        data.localFeatures?.map((feature) => {
          this.addLocalFeature(feature);
        });
      } else {
        this.globalFeatures.map((feature) => {
          const globalFeaturesForm = this.fb.group({
            name: feature.name,
            value: feature.values[data.id],
          });
          this.globalFeaturesValue.push(globalFeaturesForm);
        });
      }

      if (this.tool.type === 'aff-summary-box') {
        data.pros?.map((pro) => {
          this.addPro(pro);
        });
        data.cons?.map((con) => {
          this.addCon(con);
        });
      }
    } else {
      // Add new data including the features
      this.newProduct = true;
      this.productForm.patchValue({
        id: uuid(),
      });

      if (this.tool.type === 'aff-summary-box') {
        this.addPro();
        this.addCon();
      }

      if (this.tool.type === 'aff-comparison-matrix') {
        this.globalFeatures.map((feature) => {
          const featureForm = this.fb.group({
            name: feature.name,
            value: '',
          });
          this.globalFeaturesValue.push(featureForm);
        });
      }
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
          if (multiple) {
            this.editProduct(
              this.productForm.value,
              this.globalFeaturesForm.value,
              index,
              multiple
            );
          } else {
            let product: any = this.productForm.value;
            // IF SUMMARY BOX, format the pros and cons before passing it as Product type
            if (this.tool.type === 'aff-summary-box') {
              const pros: string[] = [];
              const cons: string[] = [];

              product.pros.map((pro: any) => pros.push(pro.pro));
              product.cons.map((con: any) => cons.push(con.con));

              product = {
                ...product,
                cons: cons,
                pros: pros,
              };
            }

            this.editProduct(product, this.globalFeaturesForm.value);
          }
        } else {
          this.addProduct(this.globalFeaturesForm.value);
        }
      }

      this.productForm.reset();
      this.initProductForm();
      this.globalFeaturesValue.clear();
    });
  }

  editProduct(
    product: Product,
    { features }: any,
    index?: number,
    multiple?: boolean
  ) {
    if (multiple) {
      //insert edit product in products array
      this.products.splice(index!, 1, product);
    } else {
      this.product = product;
    }

    if (this.tool.type === 'aff-comparison-matrix') {
      //Replace the product's features in the features array
      this.globalFeatures.map((feature, i: number) => {
        features.map((feat: any, j: number) => {
          if (feat.name === feature.name) {
            feature.values[product.id] = feat.value;
          }
        });
      });
    }
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
    this.globalFeatures.map((feature) => {
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
    if (this.tool.type === 'aff-comparison-matrix') {
      this.toolsService
        .saveTool(this.tool, this.products, this.globalFeatures, merge)
        .then(() =>
          this.confirmationService.handleSuccess('Successfully saved!')
        )
        .catch((err) => this.confirmationService.handleError(err));
    } else {
      if (this.products.length > 0) {
        this.toolsService
          .saveTool(this.tool, this.products, undefined, merge)
          .then(() =>
            this.confirmationService.handleSuccess('Successfully saved!')
          )
          .catch((err) => this.confirmationService.handleError(err));
      } else {
        this.toolsService
          .saveTool(this.tool, this.product, undefined, merge)
          .then(() =>
            this.confirmationService.handleSuccess('Successfully saved!')
          )
          .catch((err) => this.confirmationService.handleError(err));
      }
    }
  }

  addGlobalFeature(feature?: GlobalFeature) {
    const newGlobalFeature = this.fb.group({
      name: '',
    });

    feature?.name && newGlobalFeature.patchValue({ name: feature.name });

    this.globalFeaturesValue.push(newGlobalFeature);
  }

  removeGlobalFeature(i: number) {
    this.globalFeaturesValue.removeAt(i);
    this.globalFeatures.splice(i, 1);
  }

  openFeaturesDialog() {
    //patch the global features
    this.globalFeatures.map((feature) => {
      this.addGlobalFeature(feature);
    });
    //Now open the dialog
    const dialogRef = this.dialog.open(this.globalFeaturesDialog, {
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    //Once dialog is closed, update features
    dialogRef.afterClosed().subscribe((result) => {
      const changedFeatures = this.globalFeaturesForm.value.features;
      if (result === true) {
        //Make the name changes of existing features
        this.globalFeatures.map((feature, i: number) => {
          changedFeatures.map((feat, j: number) => {
            if (i === j) {
              feature.name = feat.name;
            }
          });
        });
        //check if there are any new features
        const newFeatures: string[] = [];
        if (changedFeatures.length > this.globalFeatures.length) {
          for (
            let i = this.globalFeatures.length;
            i < changedFeatures.length;
            i++
          ) {
            newFeatures.push(changedFeatures[i].name);
          }
        }
        if (newFeatures.length > 0) {
          const newlyBuiltFeatures = buildGlobalFeatures(
            this.products,
            newFeatures
          );
          this.globalFeatures = this.globalFeatures.concat(newlyBuiltFeatures);
        }
      }
      this.globalFeaturesForm.reset();
      this.initGlobalFeaturesForm();
      this.globalFeaturesValue.clear();
    });
  }
}
