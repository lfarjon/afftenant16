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
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
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
  selector: 'block-secondary-menu',
  templateUrl: './secondary-menu.component.html',
  styleUrls: ['./secondary-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryMenuComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('editorRef') editorRef!: TemplateRef<any>;

  //Input the BlockId and sectionId
  @Input() blockId!: string;
  @Input() sectionId!: string;
  @Input() block!: Block;
  @Input() viewport!: Viewport;

  @Input() logoClasses: string[] = [
    'flex items-center justify-center font-semibol text-2xl',
  ];
  @Input() logoImage: string = 'assets/horizontal-logo.png';
  @Input() logoPosition: string = 'CENTER';

  @Input() navButtonClasses: string[] = ['py-2 hover:underline'];
  block$!: Observable<Block> | undefined;
  editing$!: Observable<BlockEditing>;
  form!: FormGroup;
  styles$: Observable<any>;
  viewPort$!: Observable<Viewport>;
  private unsubscribeAll = new Subject();

  constructor(
    private blockService: BlockService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
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
    this.form = this.fb.group({
      navListItems: this.fb.array([]),
    });

    this.block$
      ?.pipe(
        takeUntil(this.unsubscribeAll),
        tap((items) => {
          const navListItems = items.model.navListItems;
          if (navListItems.length > 0) {
            // Clear the form array first
            while (this.navListItems.length !== 0) {
              this.navListItems.removeAt(0);
            }

            navListItems.map((item: any) => {
              const newGroup = this.fb.group({
                label: ['', Validators.required],
                routerLink: ['', Validators.required],
                icon: [''],
              });
              newGroup.patchValue(item);
              this.navListItems.push(newGroup);
            });
          } else {
            this.addItem();
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
      if (result !== undefined) {
        const block: Block = {
          ...result.block,
          model: result.form.value,
        };
        this.form.reset();
        this.form.patchValue(result.form.value);
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

  get navListItems() {
    return this.form.get('navListItems') as FormArray;
  }

  addItem() {
    const newGroup = this.fb.group({
      label: ['', Validators.required],
      routerLink: ['', Validators.required],
      icon: [''],
    });
    this.navListItems.push(newGroup);
  }

  removeItem(index: number) {
    this.navListItems.removeAt(index);
  }
  darkOrLight(color: string): string {
    return this.shadeService.getFontColorForBackground(color);
  }
}
