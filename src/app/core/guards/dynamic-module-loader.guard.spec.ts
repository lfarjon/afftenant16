import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dynamicModuleLoaderGuard } from './dynamic-module-loader.guard';

describe('dynamicModuleLoaderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dynamicModuleLoaderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
