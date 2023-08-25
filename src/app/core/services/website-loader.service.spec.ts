import { TestBed } from '@angular/core/testing';

import { WebsiteLoaderService } from './website-loader.service';

describe('WebsiteLoaderService', () => {
  let service: WebsiteLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
