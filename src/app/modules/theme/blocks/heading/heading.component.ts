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
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { blockHeadingField } from 'src/app/core/forms/block-heading-form';
import { Block } from 'src/app/core/models/block';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'block-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() context!: string;

  block$!: Observable<Block> | undefined;
  editing$!: Observable<BlockEditing>;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
    this.styles$ = this.themeService.getTheme(false).valueChanges();
    this.fields = [...blockHeadingField];
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
}
