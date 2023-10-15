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
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { blockAnnouncementField } from 'src/app/core/forms/block-announcement';
import { Block } from 'src/app/core/models/block';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'block-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() block!: Block;
  @Input() showAnnouncementBar: boolean = true;

  style: string =
    'flex items-center justify-center h-8 text-sm font-light relative';

  block$!: Observable<Block> | undefined;
  editing$!: Observable<BlockEditing>;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});

  model: any;
  options: FormlyFormOptions = {};
  viewPort$!: Observable<Viewport>;
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private layoutService: LayoutService,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService,
    private fb: FormBuilder
  ) {
    this.fields = [...blockAnnouncementField];
    this.viewPort$ = this.layoutService.viewPort$.pipe(
      takeUntil(this.unsubscribeAll),
      map((viewport) => viewport)
    );
    this.styles$ = this.themeService.getTheme(false).valueChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.editing$ = this.blockService.editingBlock.pipe(
      takeUntil(this.unsubscribeAll)
    );

    this.editing$
      .pipe(
        tap(({ editing, block }) => {
          if (editing && block?.blockId === this.blockId) {
            this.openEditor();
          }
        })
      )
      .subscribe();
    this.block$ = this.blockService._blocks.get(this.blockId);
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
}
