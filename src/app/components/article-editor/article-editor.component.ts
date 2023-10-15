import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import hljs from 'highlight.js';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent {
  @ViewChild(QuillEditorComponent, { static: false })
  quillEditorInstance!: QuillEditorComponent;
  @ViewChild('imageInput') imageInput: ElementRef | undefined;

  @Input() public form!: FormGroup;
  @Input() contentArray!: FormArray;
  @Input() control!: string;
  @Input() height!: string;
  fullscreen$: Observable<boolean>;

  editorModules: any = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: '#toolbar',
    blotFormatter: {},
  };

  editors: Quill[] = [];
  activeEditorIndex: number = 0;
  activeEditorId: string = '';
  editorCounter: number = 0; // New counter

  constructor(private blogService: BlogService, private cd: ChangeDetectorRef) {
    this.switchModules('editor-0');
    this.fullscreen$ = this.blogService.fullscreen$;
  }

  toggleFullscreen() {
    this.blogService.fullscreen$.next(!this.blogService.fullscreen$.value);
  }

  activateEditor(editorId: string): void {
    this.activeEditorId = editorId;
    console.log(this.editors[this.activeEditorId]);
  }

  switchModules(editorId: string) {
    const editorModules: any = {
      blotFormatter: {},
    };

    if (this.activeEditorId === editorId) {
      return editorModules;
    }
    return {};
  }

  editorCreated(editor: Quill): void {
    const editorId = 'editor-' + this.editorCounter++;
    this.editors[editorId] = editor;
  }

  updateContent(index: number, event: any): void {
    // Your logic to handle content changes if needed.
    this.cd.detectChanges();
  }

  applyFormat(formatName: string, value: any): void {
    const activeEditor: Quill = this.editors[this.activeEditorId];
    if (activeEditor) {
      activeEditor.format(formatName, value);
    }
  }

  triggerImageUpload(): void {
    this.imageInput?.nativeElement.click();
  }

  imageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target?.result as string;
        this.insertImage(imageBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  insertImage(imageBase64: string): void {
    // Assuming activeEditorId and editors are defined in your component.
    const activeEditor = this.editors[this.activeEditorId];
    if (activeEditor) {
      const index = activeEditor.getSelection()?.index || 0;
      activeEditor.insertEmbed(index, 'image', imageBase64);
    }
  }
}
