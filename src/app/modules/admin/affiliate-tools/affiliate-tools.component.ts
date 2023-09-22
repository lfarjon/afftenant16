import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CtaService } from 'src/app/core/services/cta.service';
import { Subject, takeUntil, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { AffiliateTool } from 'src/app/core/models/affiliate-tool';
import { AffiliateToolsService } from 'src/app/core/services/affiliate-tools.service';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-affiliate-tools',
  templateUrl: './affiliate-tools.component.html',
  styleUrls: ['./affiliate-tools.component.scss'],
})
export class AffiliateToolsComponent {
  @ViewChild('addToolDialog') addToolDialog!: TemplateRef<any>;
  tools$!: Observable<AffiliateTool[]>;
  toolForm: FormGroup;
  tools: { type: string; displayName: string }[] = [
    { type: 'RANKING_CARDS', displayName: 'Ranking cards' },
    { type: 'COMPARISON_TABLE', displayName: 'Comparison table' },
    { type: 'PRODUCT_BOX', displayName: 'Product box' },
    { type: 'TOP_3_BOX', displayName: 'Top 3 box' },
    { type: 'PROS_CONS_BOX', displayName: 'Pros & cons box' },
    { type: 'RATING_BOX', displayName: 'Rating box' },
    { type: 'VERSUS_BOX', displayName: 'Versus box' },
    { type: 'PRODUCT_SLIDER', displayName: 'Product slider' },
    { type: 'PRODUCT_COLLAGE', displayName: 'Product collage' },
  ];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private toolsService: AffiliateToolsService,
    private router: Router,
    private ctaService: CtaService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'NEW_TOOL') {
          this.openNewToolDialog();
          this.ctaService.action$.next(null);
        }
      });

    this.tools$ = this.toolsService
      .getTools()
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, ...data };
          });
        })
      );

    this.toolForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openNewToolDialog() {
    const dialogRef = this.dialog.open(this.addToolDialog, {
      data: {},
      panelClass: ['lg:w-3/5', 'w-full', 'h-auto', 'min-h-fit'],
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.newTool();
    });
  }

  newTool() {
    const tool: AffiliateTool = {
      id: uuid(),
      websiteId: JSON.parse(localStorage.getItem('website')!),
      title: this.toolForm.value.title,
      last_saved: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      type: this.toolForm.value.type,
    } as AffiliateTool;

    this.toolsService.saveTool(tool).then(() => {
      this.router.navigate(['/admin/tool-builder/' + tool.id]);
    });
  }

  handleSelectionChange(selectedRows: any) {
    // You can handle selected rows here.
  }

  handleAction(row: any) {
    this.router.navigate(['admin/tool-builder/' + row.id]);
  }
}
