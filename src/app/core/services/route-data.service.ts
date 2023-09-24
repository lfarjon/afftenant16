import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteDataService {
  private routeDataSubject = new BehaviorSubject<any>({});

  constructor() {}

  setRouteData(data: any) {
    this.routeDataSubject.next(data);
  }

  getRouteData() {
    return this.routeDataSubject;
  }
}
