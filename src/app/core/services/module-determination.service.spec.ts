import { TestBed } from '@angular/core/testing';

import { ModuleDeterminationService } from './module-determination.service';

describe('ModuleDeterminationService', () => {
  let service: ModuleDeterminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleDeterminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
