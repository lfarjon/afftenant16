import { TestBed } from '@angular/core/testing';

import { AffiliateToolsService } from './affiliate-tools.service';

describe('AffiliateToolsService', () => {
  let service: AffiliateToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliateToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
