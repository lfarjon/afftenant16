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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { blockImageFields } from 'src/app/core/forms/block-image';
import { Block } from 'src/app/core/models/block';
import { Viewport } from 'src/app/core/models/viewport';
import { LayoutService } from 'src/app/core/services/layout.service';
import {
  BlockEditing,
  BlockService,
} from 'src/app/core/services/block.service';

@Component({
  selector: 'block-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() block!: Block;
  @Input() logoClasses: string[] = [
    'flex items-center justify-center font-semibol text-2xl',
  ];
  @Input() logoImage: string = 'assets/horizontal-logo.png';
  logoPreview: any;
  @Input() logoPosition: string = 'CENTER';
  @Input() viewport!: Viewport;

  block$!: Observable<Block> | undefined;
  editing$!: Observable<BlockEditing>;
  docRef!: string;

  viewPort$!: Observable<Viewport>;

  fields: FormlyFieldConfig[] = [];
  form!: FormGroup;
  model: any;
  options: FormlyFormOptions = {};

  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.fields = [...blockImageFields];
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
          if (editing && block?.blockId === this.blockId) {
            this.openEditor();
          }
        })
      )
      .subscribe();
    this.block$ = this.blockService._blocks.get(this.blockId);
    this.form = this.fb.group({
      fileUrl: [null, Validators.required],
    });

    this.block$
      ?.pipe(
        takeUntil(this.unsubscribeAll),
        tap((items) => {
          const logoFile = items.model.fileUrl;
          if (logoFile.length > 0) {
            this.form.patchValue({ fileUrl: logoFile });
            this.logoImage = logoFile;
          } else {
            this.form.patchValue({
              fileUrl: this.logoImage,
            });
          }
        })
      )
      .subscribe();
    const tenant = JSON.parse(localStorage.getItem('user')!);
    const websiteId = JSON.parse(localStorage.getItem('website')!);
    if (tenant && websiteId && this.blockId) {
      this.docRef = 'tenants/'
        .concat([tenant.uid, websiteId, this.blockId].join('/'))
        .concat('/');
    }
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
        form: this.form,
      },
      panelClass: ['lg:w-96', 'w-full', 'h-auto', 'px-2', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // upload to firebase

      if (result !== undefined) {
        const block: Block = {
          ...result.block,
          model: result.form.value,
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
  saveDownloadUrl(downloadData: { file: any; url: string }) {
    this.form.patchValue({ fileUrl: downloadData.url });
  }
}
