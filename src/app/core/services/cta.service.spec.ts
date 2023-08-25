import { TestBed } from '@angular/core/testing';

import { CtaService } from './cta.service';

describe('CtaService', () => {
  let service: CtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
