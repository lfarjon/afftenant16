import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Viewport } from 'src/app/core/models/viewport';
import { Website } from 'src/app/core/models/website';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { TemplateService } from 'src/app/core/services/theme-editor/template.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { WebsiteLoaderService } from 'src/app/core/services/website-loader.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantComponent implements OnInit, OnDestroy {
  @ViewChild('drawerContent', { static: false, read: ElementRef })
  drawerContent!: ElementRef;

  //FOOTER
  footerClasses: string[] = [
    'h-60 bg-black text-white flex flex-col items-center justify-center font-light relative px-3 lg:px-20',
  ];
  theme$!: Observable<any>;
  viewPort$!: Observable<Viewport>;
  isHandset$!: Observable<boolean>;
  styles$!: Observable<any>;
  isSelected!: string;
  drawer!: MatDrawer;
  website!: Website;
  private unsubscribeAll = new Subject();

  constructor(
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private websiteService: TemplateService,
    private shadeService: ShadeGeneratorService,
    private cd: ChangeDetectorRef
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();

    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );

    this.isHandset$ = this.layoutService.isHandset$;
    this.theme$ = this.websiteService.theme;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
