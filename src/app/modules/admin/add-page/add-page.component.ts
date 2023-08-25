import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Page, defaultPages } from 'src/app/core/models/page';
import { WebsiteService } from 'src/app/core/services/website.service';
import { uuidv4 } from '@firebase/util';

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
    private websiteService: WebsiteService,
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
    this.websiteService.togglePageDefault(page, true);
    this.websiteService.addPage(page as Page);
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
