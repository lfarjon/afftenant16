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
import { Observable, Subject, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { blockHeadingField } from 'src/app/core/forms/block-heading-form';
import { Block } from 'src/app/core/models/block';
import { ShadeGeneratorService } from 'src/app/core/services/shade-generator.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'block-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() block!: Block;
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() context!: string;

  block$!: Observable<Block>;
  editing$!: Observable<BlockEditing>;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  styles$: Observable<any>;

  private unsubscribeAll = new Subject();

  constructor(
    public sectionService: SectionService,
    private blockService: BlockService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private themeService: ThemeService,
    private shadeService: ShadeGeneratorService
  ) {
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
          }
        })
      )
      .subscribe();

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  editBlock(block: Block) {
    this.blockService.editingBlock.next({
      editing: true,
      block: block,
    });
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
