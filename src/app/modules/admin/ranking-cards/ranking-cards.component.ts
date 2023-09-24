import {
  Component,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import { Confirmation } from 'src/app/core/models/confirmation';
import {
  RankingCards,
  dummyRankingCardsData,
} from 'src/app/core/models/ranking-cards';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';

@Component({
  selector: 'app-ranking-cards',
  templateUrl: './ranking-cards.component.html',
  styleUrls: ['./ranking-cards.component.scss'],
})
export class RankingCardsComponent implements OnDestroy {
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  @Input() tool!: AffiliateTool;
  form: FormGroup;
  dummyData = dummyRankingCardsData;
  links: RankingCards[] = [];

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
          this.saveTool();
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
          !!data
            ? this.patchValue(data as unknown as RankingCards[])
            : this.patchValue(this.dummyData);
        })
      )
      .subscribe();

    this.form = this.fb.group({
      title: ['', Validators.required],
      feature: ['', Validators.required],
      buttonLink: ['', Validators.required],
      buttonText: ['', Validators.required], // This remains, but will be conditionally required based on the 'buttonType' value.
      buttonType: ['text', Validators.required], // Default value is set to 'text'. Possible values: 'text' and 'image'.
      buttonImage: [''], // No validators added since this is conditionally required.
      score: ['', [Validators.required, Validators.min(1), Validators.max(10)]], // Added range validation for scores between 1 and 10.
      description: ['', Validators.required],
      productImage: ['', Validators.required], // Image for the "Image Section". Assuming it's mandatory, hence Validators.required.
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
      // Other properties...
    };
    const mergedData = { ...initialData, ...updatedData }; // merge new data with current data
    this.routeDataService.setRouteData(mergedData);
  }
  patchValue(data: RankingCards[]) {
    // Patching products
    data.forEach((product: RankingCards) => {
      this.links.push(product);
    });
  }

  openDialog(data?: RankingCards, index?: number) {
    if (data) this.form.patchValue(data);
    const dialogRef = this.dialog.open(this.formDialog, {
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (!!data) {
          this.editLink(this.form.value, index!);
        } else {
          this.addLinkToTool();
        }
      } else {
        this.form.reset();
      }
    });
  }

  addLinkToTool() {
    this.links.push(this.form.value);
    this.form.reset();
  }

  saveTool() {
    const data: RankingCards[] = this.links;
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

  editLink(link: RankingCards, index: number) {
    this.links.splice(index, 1, link);
    this.form.reset();
  }

  delete(index: number) {
    this.links.splice(index, 1);
  }

  onImageSelected() {}
}
