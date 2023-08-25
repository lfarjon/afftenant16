import { PlatformLocation } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { Page } from 'src/app/core/models/page';
import { CtaService } from 'src/app/core/services/cta.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PagesService } from 'src/app/core/services/pages.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { Confirmation } from 'src/app/core/models/confirmation';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  page$: Observable<Page>;
  form: FormGroup;
  metaTitle: string = '';
  metaDescription: string = '';
  quillContent!: string;
  location: any;
  siteTitle: string;
  routeData: Data;
  editSEO: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ctaService: CtaService,
    private confirmationService: ConfirmationService,
    private pagesService: PagesService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private title: Title,
    public platformLocation: PlatformLocation
  ) {
    this.location = (platformLocation as any).location.origin;
    this.siteTitle = this.title.getTitle();
    this.isHandset$ = this.layoutService.isHandset$;
    this.routeData = this.route.snapshot.data;

    this.form = this.fb.group({
      id: ['', Validators.required],
      handle: ['', Validators.required],
      title: ['', Validators.required],
      content: [''],
      visibility: [false, Validators.required],
      template: ['', Validators.required],
      published_at: new Date(),
      metafields: this.fb.group({
        title: '',
        description: ['', [Validators.maxLength(300)]],
      }),
    });

    this.form.controls['title'].valueChanges.subscribe((value) => {
      if (!this.form.get('metafields.title')!.value) {
        this.form
          .get('metafields.title')!
          .setValue(value, { emitEvent: false });
      }
    });

    const id = this.route.snapshot.params['id'];
    this.page$ = this.pagesService
      .getPage(id)
      .valueChanges()
      .pipe(
        take(1),
        map((page) => page)
      );

    this.page$.subscribe((page) => {
      this.form.patchValue(page);
      this.form.value.metafields.description = this.quillContent;
    });

    this.ctaService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        if (action === 'SAVE_PAGE') {
          this.savePage();
          this.ctaService.clearAction();
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onContentChanged(event: any) {
    console.log(event);
    const strippedValue = event.text
      .replace(/<br>|\\n|\\r/g, ' ')
      .trim()
      .replace(/\s\s+/g, ' ');

    if (!this.form.get('metafields.description')!.value) {
      const descriptionValue = strippedValue.slice(0, 300);
      this.form
        .get('metafields.description')!
        .setValue(descriptionValue, { emitEvent: false });
    }
  }

  savePage() {
    this.form.patchValue({
      published_at: new Date(),
    });

    this.pagesService.savePage(this.form.value as Page).then(() => {
      const confirmation: Confirmation = {
        message: 'Page has been successfully saved',
        action: 'DISMISS',
        type: 'SNACKBAR',
      };

      this.confirmationService.confirm(confirmation);
    });
  }

  back() {
    this.router.navigate([
      'admin/website/' + this.route.snapshot.params['websiteId'] + '/pages',
    ]);
  }
}
