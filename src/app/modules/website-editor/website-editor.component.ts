import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ThemeComponent } from '../theme/theme.component';
import { TemplateComponent } from '../theme/sections/template/template.component';

@Component({
  selector: 'app-website-editor',
  templateUrl: './website-editor.component.html',
  styleUrls: ['./website-editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteEditorComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;

  constructor(public vcRef: ViewContainerRef, private cd: ChangeDetectorRef) {
    setTimeout(() => this.createAndEmbedComponent(), 0);
  }

  ngAfterViewInit(): void {}

  private createAndEmbedComponent(): void {
    const component: Type<any> = ThemeComponent;
    if (component) {
      const componentInstance: ComponentRef<ThemeComponent> =
        this.vcRef.createComponent(component);
      const frame =
        this.iframe.nativeElement.contentDocument ||
        this.iframe.nativeElement.contentWindow;

      const iframeStyles = document.createElement('link');

      iframeStyles.rel = 'stylesheet';
      iframeStyles.type = 'text/css';
      iframeStyles.href = 'styles.css';
      frame.head.appendChild(iframeStyles);
      frame.body.appendChild(componentInstance.location.nativeElement);
      this.cd.detectChanges();
    }
  }
}
