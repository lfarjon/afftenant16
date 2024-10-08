import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawerContent } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { publicNavListItems } from 'src/app/core/menus/public.menu';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent {
  @ViewChild(MatDrawerContent) drawerContent!: MatDrawerContent;
  @ViewChild('navbar', { static: false }) navbarElement!: ElementRef;

  isScrolled = false;
  private scrollSubscription!: Subscription;
  isHandset$: Observable<boolean> = this.layoutService.isHandset$;
  menuItems: (NavListWithLabel | NavListWithIcon)[] = publicNavListItems;
  constructor(private layoutService: LayoutService) {}

  ngAfterViewInit() {
    this.scrollSubscription = this.drawerContent
      .elementScrolled()
      .subscribe(() => this.onWindowScroll());
  }

  onWindowScroll() {
    this.isScrolled =
      this.drawerContent.getElementRef().nativeElement.scrollTop > 15;
    if (this.isScrolled) {
      this.navbarElement.nativeElement.classList.add(
        'bg-white',
        'border-b',
        'border-b-slate-300'
      );
    } else {
      this.navbarElement.nativeElement.classList.remove(
        'bg-white',
        'border-b',
        'border-b-slate-300'
      );
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}
