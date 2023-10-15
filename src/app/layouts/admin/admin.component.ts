import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { adminNavListItems } from 'src/app/core/menus/admin.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { Website } from 'src/app/core/models/website';
import { LayoutService } from 'src/app/core/services/layout.service';
import { RouteDataService } from 'src/app/core/services/route-data.service';
import { WebsiteService } from 'src/app/core/services/website.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewChecked, OnDestroy {
  navListItems: (NavListWithIcon | NavListWithLabel)[] = adminNavListItems;
  routeData: Data;
  isHandset$: Observable<boolean>;
  website$: Observable<Website>;
  private unsubscribeAll = new Subject();

  constructor(
    private layoutService: LayoutService,
    public route: ActivatedRoute,
    private websiteService: WebsiteService,
    private routeDataService: RouteDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.routeData = this.route.snapshot.data;
    this.website$ = this.websiteService.getWebsite().valueChanges();
    this.isHandset$ = this.layoutService.isHandset$;
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngAfterViewChecked() {
    this.routeDataService
      .getRouteData()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        this.routeData = data;
        this.cdr.detectChanges(); // manually check the component
      });
  }
}
