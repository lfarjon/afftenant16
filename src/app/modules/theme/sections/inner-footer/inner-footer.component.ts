import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { BlockService } from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-inner-footer',
  templateUrl: './inner-footer.component.html',
  styleUrls: ['./inner-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerFooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;
  @Input() footerClasses: string[] = [
    'min-h-60 h-full flex flex-col items-center justify-center font-light relative px-3 lg:px-20 py-10',
  ];
  viewPort$!: Observable<Viewport>;
  logoBlock$!: Observable<Block>;
  menuBlock$!: Observable<Block>;
  socialBlock$!: Observable<Block>;
  emailBlock$!: Observable<Block>;
  copyrightBlock$!: Observable<Block>;
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();
  constructor(
    private blockService: BlockService,
    private cd: ChangeDetectorRef,
    private layoutService: LayoutService,
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
          const menuBlock = blocks.find(
            (block) => block.type === 'block-menu'
          )!;
          menuBlock.allowHide = true;
          this.menuBlock$ = of(menuBlock);
          this.socialBlock$ = of(
            blocks.find((block) => block.type === 'block-social')!
          );
          this.emailBlock$ = of(
            blocks.find((block) => block.type === 'block-email-signup')!
          );
          this.copyrightBlock$ = of(
            blocks.find((block) => block.type === 'block-copyright')!
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
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  darken(hex: string): string {
    return this.shadeService.darkenShade(hex, 25);
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
