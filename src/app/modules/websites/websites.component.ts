import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Confirmation } from 'src/app/core/models/confirmation';
import { Website } from 'src/app/core/models/website';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { CtaService } from 'src/app/core/services/cta.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { WebsiteService } from 'src/app/core/services/website.service';
import { domainValidator } from 'src/app/core/validators/domain.validator';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss'],
})
export class WebsitesComponent implements OnInit, OnDestroy {
  @ViewChild('addDomainDialog') addDomainDialog!: TemplateRef<any>;
  websites$: Observable<Website[]>;
  currentWebsite: string = JSON.parse(localStorage.getItem('website')!);

  domainForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private ctaService: CtaService,
    private websiteService: WebsiteService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private routeDataService: RouteDataService,
    private route: ActivatedRoute
  ) {
    this.updateRouteData();
    this.domainForm = this.fb.group({
      domain: ['', [Validators.required, domainValidator()]],
    });
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'ADD_WEBSITE') {
          this.addWebsite();
          this.ctaService.action$.next(null);
        }
      });

    this.websites$ = this.websiteService
      .getWebsites()
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
  }

  ngOnInit(): void {}

  updateRouteData() {
    //Update Route Data
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addWebsite() {
    const dialogRef = this.dialog.open(this.addDomainDialog, {
      data: this.domainForm,
      panelClass: ['w-96'],
      maxWidth: 'max-w-96',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.websiteService
          .addWebsite(result.value.domain)
          .then(() => {
            const confirmation: Confirmation = {
              message: 'Website successfully added',
              action: 'DISMISS',
              type: 'SNACKBAR',
            };
            this.confirmationService.confirm(confirmation);
          })
          .catch((err) => {
            const confirmation: Confirmation = {
              message: err,
              action: 'DISMISS',
              type: 'SNACKBAR',
            };
            this.confirmationService.confirm(confirmation);
          });
      }
    });
  }

  editWebsite(website: Website) {
    const switching = true;
    this.websiteService.editWebsite(website, switching);
  }

  blog({ websiteId }: Website) {
    this.router.navigate(['/admin', 'website', websiteId, 'blog', 'create']);
  }
}
