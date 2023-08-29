import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { adminNavListItems } from 'src/app/core/menus/admin.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  navListItems: (NavListWithIcon | NavListWithLabel)[] = adminNavListItems;
  routeData: Data;
  isHandset$: Observable<boolean>;

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute
  ) {
    this.routeData = this.route.snapshot.data;
    this.isHandset$ = this.layoutService.isHandset$;
  }
}
