import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Page, defaultPages } from 'src/app/core/models/page';
import { uuidv4 } from '@firebase/util';
import { PageService } from 'src/app/core/services/page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  pageTemplates: Page[] = [...defaultPages];
  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    public dialogRef: MatDialogRef<AddPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      template: [{}, Validators.required],
      title: ['', Validators.required],
      default: [false],
    });
  }

  ngOnInit(): void {}

  addPage() {
    let form = this.form.value;
    let page: Page = { ...form.template };
    page.title = form.title;
    page.default = form.default;
    page.pageId = uuidv4();
    page.published = false;
    this.pageService.togglePageDefault(page, true);
    this.pageService.addPage(page as Page);
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
