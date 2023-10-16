import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import hljs from 'highlight.js';
import { QuillViewComponent } from 'ngx-quill';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});
@Component({
  selector: 'text-viewer',
  templateUrl: './text-viewer.component.html',
  styleUrls: ['./text-viewer.component.scss'],
})
export class TextViewerComponent implements OnInit {
  @ViewChild(QuillViewComponent, { static: false }) quillView: any;
  @Input() content: string = '';

  viewerModules: any = {
    blotFormatter: {},
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
