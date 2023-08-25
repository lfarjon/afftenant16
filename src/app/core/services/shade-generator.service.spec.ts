import { TestBed } from '@angular/core/testing';

import { ShadeGeneratorService } from './shade-generator.service';

describe('ShadeGeneratorService', () => {
  let service: ShadeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
