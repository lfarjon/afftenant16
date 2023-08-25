import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Viewport, viewports } from '../models/viewport';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  viewports = viewports;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        if (result.matches) {
          this.viewPort$.next(viewports[1]);
        } else {
          this.viewPort$.next(viewports[0]);
        }
        return result.matches;
      })
    );

  viewPort$ = new BehaviorSubject<Viewport>(viewports[0]);

  constructor(private breakpointObserver: BreakpointObserver) {}
}
