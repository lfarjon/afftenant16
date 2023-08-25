import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CtaService {
  action$ = new BehaviorSubject<string | null>('');

  changeAction(action: string) {
    this.action$.next(action);
  }

  clearAction() {
    this.action$.next(null);
  }
}
