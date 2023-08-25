import { Component, Input } from '@angular/core';
import { CtaService } from 'src/app/core/services/cta.service';

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

  constructor(private ctaService: CtaService) {}

  doAction() {
    switch (this.action) {
      case 'NEW_PAGE':
        this.ctaService.changeAction('NEW_PAGE');
        break;
      case 'SAVE_PAGE':
        this.ctaService.changeAction('SAVE_PAGE');
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
      case 'ADD_LINK':
        this.ctaService.changeAction('ADD_LINK');
        break;
      case 'SAVE_LINK':
        this.ctaService.changeAction('SAVE_LINK');
        break;

      default:
        break;
    }
  }
}
