import { TestBed } from '@angular/core/testing';

import { SeoSchema } from './seo-schema';

describe('SeoSchema', () => {
  let service: SeoSchema;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoSchema);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
