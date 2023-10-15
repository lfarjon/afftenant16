import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { blockTypeMapping } from 'src/app/core/models/component-mapping';
import { Observable, takeUntil, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { BlockService } from 'src/app/core/services/block.service';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSignupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;
  form: FormGroup;
  blockTypeMapping: any = blockTypeMapping;
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();
  constructor(
    private fb: FormBuilder,
    private blockService: BlockService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService,
    private cd: ChangeDetectorRef
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.blockService
      .getBlocks(this.section.sectionId, this.section.type)
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((blocks) => {
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

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }

  darken(hex: string): string {
    return this.shadeService.darkenShade(hex);
  }
}
