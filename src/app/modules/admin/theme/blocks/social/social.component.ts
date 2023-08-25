import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import {
  blockSocialFields,
  socialIcons,
} from 'src/app/core/forms/block-social';
import { Block } from 'src/app/core/models/block';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/theme-editor/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'block-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() block!: Block;
  @Input() viewport!: Viewport;
  @Input() styles!: any;

  block$!: Observable<Block> | undefined;
  editing$!: Observable<BlockEditing>;
  viewPort$!: Observable<Viewport>;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  socials: any[] = [];
  socialIcons = socialIcons;
  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService,
    private cd: ChangeDetectorRef
  ) {
    this.fields = [...blockSocialFields];
    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.editing$ = this.blockService.editingBlock.pipe(
      takeUntil(this.unsubscribeAll)
    );

    this.editing$
      .pipe(
        tap(({ editing, block }) => {
          if (editing && block?.blockId === this.block?.blockId) {
            this.openEditor();
          }
        })
      )
      .subscribe();
    this.block$ = this.blockService._blocks.get(this.block?.blockId);
    this.block$
      ?.pipe(
        takeUntil(this.unsubscribeAll),
        tap(({ model }) =>
          Object.entries(model).map(([network, link]) => {
            if (!!link) {
              this.socials.push({
                network: network,
                link: link,
                icon: this.socialIcons[network],
              });
            }
          })
        ),
        map((block) => block)
      )
      .subscribe();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  openEditor() {
    const dialogRef = this.dialog.open(this.editorRef, {
      data: {
        block: { ...this.blockService.editingBlock.value.block },
        model: { ...this.blockService.editingBlock.value.block?.model },
        fields: this.fields,
      },
      panelClass: ['lg:w-96', 'w-full', 'h-auto', 'px-2', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.socials = [];
        const block: Block = {
          ...result.block,
          model: result.model,
        };
        this.blockService.editingBlock.next({
          editing: false,
          block: undefined,
        });
        this.blockService.updateBlocks(this.sectionId, block);
      }

      this.blockService.editingBlock.next({
        editing: false,
        block: undefined,
      });
      this.cd.detectChanges();
    });
  }

  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }

  darken(hex: string): string {
    return this.shadeService.darkenShade(hex);
  }
}
