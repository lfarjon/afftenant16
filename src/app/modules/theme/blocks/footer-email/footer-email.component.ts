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
import { Block } from 'src/app/core/models/block';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';
import { blockEmailFields } from 'src/app/core/forms/block-email-signup';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Viewport } from 'src/app/core/models/viewport';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';

@Component({
  selector: 'block-email-signup',
  templateUrl: './footer-email.component.html',
  styleUrls: ['./footer-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterEmailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() block!: Block;
  @Input() viewport!: Viewport;
  @Input() styles!: any;
  viewPort$!: Observable<Viewport>;
  editing$!: Observable<BlockEditing>;
  block$!: Observable<Block> | undefined;

  fields: FormlyFieldConfig[] = [];
  form!: FormGroup;
  model: any;
  options: FormlyFormOptions = {};

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private shadeService: ShadeGeneratorService,
    private cd: ChangeDetectorRef
  ) {
    this.fields = [...blockEmailFields];
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
      } else {
        this.blockService.editingBlock.next({
          editing: false,
          block: undefined,
        });
      }

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
