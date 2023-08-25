import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subject } from 'rxjs';
import { Block } from 'src/app/core/models/block';

interface DataDialog {
  fields: FormlyFieldConfig[];
  model: any;
}

@Component({
  selector: 'app-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEditorComponent implements OnInit, OnDestroy {
  blockType: string = '';
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  block$!: Observable<Block>;
  private unsubscribeAll = new Subject();

  constructor(
    public dialogRef: MatDialogRef<BlockEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) {
    this.fields = this.data.fields;
    this.model = this.data.model;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission based on the block type
      if (this.blockType === 'text') {
        // const textBlock = this.model as TextBlock;
        //console.log('Text Block:', textBlock);
      } else if (this.blockType === 'image') {
        //const imageBlock = this.model as ImageBlock;
        //console.log('Image Block:', imageBlock);
      }
    }
  }
}
