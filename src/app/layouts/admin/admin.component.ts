import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { adminNavListItems } from 'src/app/core/menus/admin.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { Website } from 'src/app/core/models/website';
import { LayoutService } from 'src/app/core/services/layout.service';
import { WebsiteService } from 'src/app/core/services/website.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  navListItems: (NavListWithIcon | NavListWithLabel)[] = adminNavListItems;
  routeData: Data;
  isHandset$: Observable<boolean>;
  website$: Observable<Website>;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private websiteService: WebsiteService
  ) {
    this.routeData = this.route.snapshot.data;
    this.website$ = this.websiteService.getWebsite().valueChanges();
    this.isHandset$ = this.layoutService.isHandset$;
  }
}
