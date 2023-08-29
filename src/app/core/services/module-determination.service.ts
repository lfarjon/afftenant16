import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModuleDeterminationService {
  constructor() {}

  getModuleForDomain(domain: string) {
    if (domain !== 'main') {
      return import('src/app/modules/tenant/tenant.module').then(
        (m) => m.TenantModule
      );
    } else {
      return import('src/app/modules/public/home/home.module').then(
        (m) => m.HomeModule
      );
    }
  }
}
