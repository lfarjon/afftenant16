import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import hljs from 'highlight.js';
import { QuillViewComponent } from 'ngx-quill';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});
@Component({
  selector: 'text-quill-view',
  templateUrl: './quill-view.component.html',
  styleUrls: ['./quill-view.component.scss'],
})
export class TextViewerComponent {
  @ViewChild(QuillViewComponent, { static: false }) quillView: any;
  @Input() content: string = '';

  viewerModules: any = {
    blotFormatter: {},
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
  };
  constructor(private cd: ChangeDetectorRef) {}
}
