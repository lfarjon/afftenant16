import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { editorNavListItems } from 'src/app/core/menus/editor.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  websiteId: string;
  isHandset$: Observable<boolean>;
  navListItems: (NavListWithIcon | NavListWithLabel)[] = editorNavListItems;
  routeData: Data;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const routeSnapshot = this.route.snapshot;
    this.routeData = routeSnapshot.data;

    this.websiteId = routeSnapshot.params['websiteId'];
    this.isHandset$ = this.layoutService.isHandset$;
  }

  navigate(route: NavListWithIcon | NavListWithLabel) {
    const base: string = '/admin/website/' + this.websiteId;
    this.router.navigate([base + route.routerLink]);
  }
}
