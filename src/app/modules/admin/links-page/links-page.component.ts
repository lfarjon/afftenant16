import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CtaService } from 'src/app/core/services/cta.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { LinksComponent } from '../links/links.component';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
})
export class LinksPageComponent {
  @ViewChild(LinksComponent) linkComponent!: LinksComponent;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private ctaService: CtaService,
    private routeDataService: RouteDataService,
    private route: ActivatedRoute
  ) {
    this.updateRouteData();

    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'ADD_LINK') {
          this.linkComponent.openLinkDialog();
          this.ctaService.action$.next(null);
        }
      });
  }

  updateRouteData() {
    const initialData = this.route.snapshot.data; // get initial route data
    this.routeDataService.setRouteData(initialData);
  }
}
