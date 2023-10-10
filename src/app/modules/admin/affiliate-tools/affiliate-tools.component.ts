import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CtaService } from 'src/app/core/services/cta.service';
import { Subject, takeUntil, Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
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
  buildFeatures,
  buildProductFeatures,
  dummyFeatures,
} from 'src/app/core/models/feature';
import {
  createProduct,
  createProducts,
  createSummaryBox,
  createVSBox,
} from 'src/app/core/models/product';

@Component({
  selector: 'app-affiliate-tools',
  templateUrl: './affiliate-tools.component.html',
  styleUrls: ['./affiliate-tools.component.scss'],
})
export class AffiliateToolsComponent {
  @ViewChild('addToolDialog') addToolDialog!: TemplateRef<any>;
  tools$!: Observable<AffiliateTool[]>;
  toolForm: FormGroup;
  tools: {
    type: string;
    displayName: string;
    multiple: boolean;
    max?: number;
  }[] = [
    { type: 'RANKING_CARDS', displayName: 'Ranking cards', multiple: true },
    {
      type: 'COMPARISON_TABLE',
      displayName: 'Comparison table',
      multiple: true,
    },
    {
      type: 'COMPARISON_MATRIX',
      displayName: 'Comparison matrix',
      multiple: true,
    },
    { type: 'TOP_3_BOX', displayName: 'Top 3 box', multiple: true, max: 3 },
    { type: 'VERSUS_BOX', displayName: 'Versus box', multiple: true, max: 2 },

    { type: 'PRODUCT_BOX', displayName: 'Product box', multiple: false },
    { type: 'SUMMARY_BOX', displayName: 'Summary box', multiple: false },
    { type: 'PRODUCT_SLIDER', displayName: 'Product slider', multiple: true },
    { type: 'PRODUCT_COLLAGE', displayName: 'Product collage', multiple: true },
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
    let tool: AffiliateTool = {
      id: uuid(),
      websiteId: JSON.parse(localStorage.getItem('website')!),
      title: this.toolForm.value.title,
      last_saved: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      type: this.toolForm.value.tool.type,
    } as AffiliateTool;

    const links = this.toolForm.value.links;
    if (links) {
      const products = this.generateData(
        this.toolForm.value.tool,
        this.toolForm.value.links
      );

      tool = {
        ...tool,
        data: products,
        features: Array.isArray(links)
          ? buildFeatures(products, dummyFeatures)
          : buildProductFeatures(),
      };
    }

    this.toolsService.saveTool(tool).then(() => {
      this.router.navigate(['/admin/tool-builder/' + tool.id]);
    });
  }

  generateData({ type }: AffiliateTool, links: Link[] | Link) {
    let data: any;

    switch (type) {
      case 'RANKING_CARDS':
        data = createProducts(links as Link[]);
        break;
      case 'COMPARISON_MATRIX':
        data = createProducts(links as Link[]);
        break;
      case 'COMPARISON_TABLE':
        data = createProducts(links as Link[]);
        break;
      case 'TOP_3_BOX':
        data = createProducts(links as Link[]);
        break;
      case 'VERSUS_BOX':
        data = createVSBox(links as Link[]);
        break;
      case 'PRODUCT_BOX':
        data = createProduct(links as Link);
        break;
      case 'SUMMARY_BOX':
        data = createSummaryBox(links as Link);
        break;
      case 'PRODUCT_SLIDER':
        data = createProducts(links as Link[]);
        break;
      case 'PRODUCT_COLLAGE':
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
