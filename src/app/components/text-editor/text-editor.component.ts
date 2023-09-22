import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent {
  @ViewChild(QuillEditorComponent, { static: false })
  quillEditorInstance!: QuillEditorComponent;

  @Input() public form!: FormGroup;
  @Input() control!: string;
  @Input() height!: string;
  editorModules = {
    toolbar: '#toolbar',
    blotFormatter: {},
  };
}
