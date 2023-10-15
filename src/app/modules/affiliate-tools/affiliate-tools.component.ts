import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CtaService } from 'src/app/core/services/cta.service';
import { Subject, takeUntil, Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { Link } from 'src/app/core/models/links';
import { AddLinkComponent } from '../add-link/add-link.component';

import {
  addLocalFeaturesToProduct,
  addLocalFeaturesToProducts,
  buildGlobalFeatures,
  dummyFeatures,
} from 'src/app/core/models/feature';
import {
  createProduct,
  createProducts,
  createSummaryBox,
  createVSBox,
} from 'src/app/core/models/product';
import { DynamicSection } from 'src/app/core/models/dynamic-section';

@Component({
  selector: 'app-affiliate-tools',
  templateUrl: './affiliate-tools.component.html',
  styleUrls: ['./affiliate-tools.component.scss'],
})
export class AffiliateToolsComponent {
  @ViewChild('addToolDialog') addToolDialog!: TemplateRef<any>;
  tools$!: Observable<DynamicSection[]>;
  toolForm: FormGroup;
  tools: {
    type: string;
    displayName: string;
    multiple: boolean;
    max?: number;
  }[] = [
    { type: 'aff-ranking-cards', displayName: 'Ranking cards', multiple: true },
    {
      type: 'aff-comparison-table',
      displayName: 'Comparison table',
      multiple: true,
    },
    {
      type: 'aff-comparison-matrix',
      displayName: 'Comparison matrix',
      multiple: true,
    },
    { type: 'aff-top-three', displayName: 'Top 3 box', multiple: true, max: 3 },
    {
      type: 'aff-versus-box',
      displayName: 'Versus box',
      multiple: true,
      max: 2,
    },

    { type: 'aff-product-box', displayName: 'Product box', multiple: false },
    { type: 'aff-summary-box', displayName: 'Summary box', multiple: false },
    {
      type: 'aff-product-slider',
      displayName: 'Product slider',
      multiple: true,
    },
    {
      type: 'aff-product-collage',
      displayName: 'Product collage',
      multiple: true,
    },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private toolsService: AffiliateToolsService,
    private router: Router,
    private ctaService: CtaService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService
  ) {
    //Set Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);

    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'NEW_TOOL') {
          this.openNewToolDialog();
          this.ctaService.action$.next(null);
        }
      });

    this.tools$ = this.toolsService
      .getTools()
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

    this.toolForm = this.fb.group({
      title: ['', Validators.required],
      tool: [{}, Validators.required],
      links: [[], []], // Initialize without any validators
      generateAIContent: [false],
    });

    // Subscribe to changes in the "tool" control
    this.toolForm
      .get('tool')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedTool) => {
        const linksControl = this.toolForm.get('links');

        // Check if the selected tool has a "max" property
        if (selectedTool && selectedTool.max) {
          // Add the max validator to the "links" control
          linksControl?.setValidators([
            Validators.required,
            this.maxArrayLength(selectedTool.max),
          ]);
        } else {
          // Remove any validators from the "links" control
          linksControl?.clearValidators();
        }

        // Update the validation status of the "links" control
        linksControl?.updateValueAndValidity();
      });
  }

  // Custom validator function to enforce maximum array length
  maxArrayLength(max: number) {
    return (control: AbstractControl) => {
      if (control.value && control.value.length > max) {
        return { maxArrayLength: true };
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openAddLinkDialog(link?: Link) {
    const dialogRef = this.dialog.open(AddLinkComponent, {
      data: link,
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });
  }

  openNewToolDialog() {
    const dialogRef = this.dialog.open(this.addToolDialog, {
      data: {},
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.newTool();
    });
  }

  newTool() {
    let tool: DynamicSection = {
      sectionId: uuid(),
      websiteId: JSON.parse(localStorage.getItem('website')!),
      title: this.toolForm.value.title,
      updated_at: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      type: this.toolForm.value.tool.type,
    } as DynamicSection;

    const links = this.toolForm.value.links;

    if (links) {
      let products = this.generateData(
        this.toolForm.value.tool,
        this.toolForm.value.links
      );

      //Build local or global features
      if (this.toolForm.value.tool.type === 'aff-comparison-matrix') {
        // If MATRIX, build global features
        const globalFeatures = buildGlobalFeatures(products, dummyFeatures);

        tool = {
          ...tool,
          globalFeatures: globalFeatures,
        };
      } else {
        // Else build local (product level) features
        if (Array.isArray(products)) {
          products = addLocalFeaturesToProducts(products);
        } else {
          products = addLocalFeaturesToProduct(products);
        }
      }

      tool = {
        ...tool,
        data: products,
      };
    }

    this.toolsService.saveTool(tool).then(() => {
      this.router.navigate(['/admin/tool-builder/' + tool.sectionId]);
    });
  }

  generateData({ type }: DynamicSection, links: Link[] | Link) {
    let data: any;

    switch (type) {
      case 'aff-ranking-cards':
        data = createProducts(links as Link[]);
        break;
      case 'aff-comparison-matrix':
        data = createProducts(links as Link[]);
        break;
      case 'aff-comparison-table':
        data = createProducts(links as Link[]);
        break;
      case 'aff-top-three':
        data = createProducts(links as Link[]);
        break;
      case 'aff-versus-box':
        data = createVSBox(links as Link[]);
        break;
      case 'aff-product-box':
        data = createProduct(links as Link);
        break;
      case 'aff-summary-box':
        data = createSummaryBox(links as Link);
        break;
      case 'aff-product-slider':
        data = createProducts(links as Link[]);
        break;
      case 'aff-product-collage':
        data = createProducts(links as Link[]);
        break;
      default:
        break;
    }
    return data;
  }

  limitSelection(links: Link[]) {
    const selectedTool = this.toolForm.value.tool;

    if (selectedTool?.max) {
      if (links.length > selectedTool.max) {
        // If the selected links exceed the max limit, truncate the selection
        this.toolForm.get('links')?.setValue(links.slice(0, selectedTool.max));
      }
    }
  }

  handleSelectionChange(selectedRows: any) {
    // You can handle selected rows here.
  }

  handleAction(row: any) {
    this.router.navigate(['admin/tool-builder/' + row.id]);
  }
}
