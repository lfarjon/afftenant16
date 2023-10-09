import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentsModule } from 'src/app/components/components.module';
import { Confirmation } from '../models/confirmation';

@Injectable({
  providedIn: ComponentsModule,
})
export class ConfirmationService {
  message$ = new BehaviorSubject<string | null>(null);

  constructor(private _snackBar: MatSnackBar) {}

  handleSuccess(message: string) {
    const confirmation: Confirmation = {
      message: message,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirm(confirmation);
  }

  handleError = (err: any) => {
    const confirmation: Confirmation = {
      message: err,
      action: 'DISMISS',
      type: 'SNACKBAR',
    };
    this.confirm(confirmation);
  };

  confirm({ message, action, type }: Confirmation) {
    switch (type) {
      case 'SNACKBAR':
        this._snackBar.open(message, action, {
          duration: 1000,
        });
        break;

      default:
        break;
    }
  }
}
