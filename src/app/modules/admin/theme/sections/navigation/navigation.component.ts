import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { NavListWithIcon, NavListWithLabel } from 'src/app/core/models/menu';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { BlockService } from 'src/app/core/services/theme-editor/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;

  @Input() drawer!: MatDrawer;

  //NAV BAR

  @Input() logoPosition: string = 'CENTER';
  @Input() navBarClasses: string[] = [
    'min-h-16 lg:min-h-20 bg-blue-500 px-3 lg:px-20',
  ];
  @Input() navButtonClasses: string[] = ['py-2 hover:underline'];
  @Input() ctaClasses: string[] = [
    'px-3 py-2 hover:underline rounded-lg lg:order-last',
  ];
  @Input() logoClasses: string[] = [
    'flex items-center justify-center font-semibol text-2xl',
  ];
  @Input() searchButtonClasses: string[] = [];
  @Input() showNavBar: boolean = true;
  @Input() showActionButton: boolean = true;
  @Input() showSearchButton: boolean = true;

  @Output() getNavList = new EventEmitter<
    (NavListWithIcon | NavListWithLabel)[]
  >();
  styles$: Observable<any>;
  viewPort$!: Observable<Viewport>;
  logoBlock$!: Observable<Block>;
  menuBlock$!: Observable<Block>;
  secondaryMenuBlock$!: Observable<Block>;
  ctaBlock$!: Observable<Block>;
  searchBlock$!: Observable<Block>;

  private unsubscribeAll = new Subject();

  constructor(
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private blockService: BlockService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();
    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // Unique section id for this component
    this.blockService
      .getBlocks(this.section.sectionId, this.section.type)
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((blocks) => {
          this.logoBlock$ = of(
            blocks.find((block) => block.type === 'block-logo')!
          );
          this.menuBlock$ = of(
            blocks.find((block) => block.type === 'block-menu')!
          );
          this.secondaryMenuBlock$ = of(
            blocks.find((block) => block.type === 'block-secondary-menu')!
          );
          this.searchBlock$ = of(
            blocks.find((block) => block.type === 'block-search')!
          );
          this.ctaBlock$ = of(
            blocks.find((block) => block.type === 'block-cta')!
          );
          this.blockService.loadBlocksComponents(
            this.section.sectionId,
            blocks,
            this.dynamicChildren
          );
          this.cd.detectChanges();
        })
      )
      .subscribe();
    this.navList();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  navList() {
    //this.getNavList.emit(this.navListItems);
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
