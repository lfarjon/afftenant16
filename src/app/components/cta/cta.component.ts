import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CtaService } from 'src/app/core/services/cta.service';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
})
export class CtaComponent {
  @Input() color: string = 'primary';
  @Input() buttonText: string = '';
  @Input() action: string = '';
  @Input() params: any;
  @Input() type!: string;
  @Input() icon!: string;

  isHandset$: Observable<boolean>;
  constructor(
    private ctaService: CtaService,
    private layoutService: LayoutService
  ) {
    this.isHandset$ = this.layoutService.isHandset$;
  }

  doAction() {
    switch (this.action) {
      case 'NEW_ARTICLE':
        this.ctaService.changeAction('NEW_ARTICLE');
        break;
      case 'ADD_WEBSITE':
        this.ctaService.changeAction('ADD_WEBSITE');
        break;
      case 'EDIT_WEBSITE':
        this.ctaService.changeAction('EDIT_WEBSITE');
        break;
      case 'PUBLISH_WEBSITE':
        this.ctaService.changeAction('PUBLISH_WEBSITE');
        break;
      case 'SAVE_WEBSITE':
        this.ctaService.changeAction('SAVE_WEBSITE');
        break;
      case 'SWITCH_WEBSITE':
        this.ctaService.changeAction('SWITCH_WEBSITE');
        break;
      case 'ADD_LINK':
        this.ctaService.changeAction('ADD_LINK');
        break;
      case 'SAVE_LINK':
        this.ctaService.changeAction('SAVE_LINK');
        break;
      case 'NEW_TOOL':
        this.ctaService.changeAction('NEW_TOOL');
        break;
      case 'SAVE_TOOL':
        this.ctaService.changeAction('SAVE_TOOL');
        break;
      case 'ADD_TOOL':
        this.ctaService.changeAction('ADD_TOOL');
        break;
      default:
        break;
    }
  }
}
