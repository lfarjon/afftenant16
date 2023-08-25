import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawerContent', { static: false, read: ElementRef })
  drawerContent!: ElementRef;

  //FOOTER
  footerClasses: string[] = [
    'h-60 bg-black text-white flex flex-col items-center justify-center font-light relative px-3 lg:px-20',
  ];
  theme$: Observable<any>;
  viewPort$!: Observable<Viewport>;
  isHandset$!: Observable<boolean>;
  styles$: Observable<any>;
  isSelected!: string;
  drawer!: MatDrawer;
  private unsubscribeAll = new Subject();

  constructor(
    private templateService: TemplateService,
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();

    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );

    this.isHandset$ = this.layoutService.isHandset$;
    this.theme$ = this.templateService.theme;
    this.templateService.isSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((section) => {
        if (this.drawerContent) {
          const targetElement: HTMLElement | null =
            this.drawerContent.nativeElement.querySelector(
              `#section-${section}`
            );

          if (targetElement) {
            const navHeight = 120; // adjust this to your actual nav height
            const scrollToPosition = targetElement.offsetTop - navHeight;

            this.drawerContent.nativeElement.scrollTop = scrollToPosition;
          }
        }
      });

    this.templateService.drawer
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((drawer) => {
        this.drawer = drawer as MatDrawer;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit() {}

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
