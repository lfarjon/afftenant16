import { Component, Input } from '@angular/core';
import { Confirmation } from 'src/app/core/models/confirmation';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Input() message!: string;

  constructor(private confirmationService: ConfirmationService) {}

  handleSuccess() {
    const message = this.message;
    const confirmation: Confirmation = {
      message: message,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirmationService.confirm(confirmation);
  }

  handleError = (err: any) => {
    const confirmation: Confirmation = {
      message: err,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirmationService.confirm(confirmation);
  };
}
