import { TestBed } from '@angular/core/testing';

import { BelongingsService } from './belongings.service';

describe('BelongingsService', () => {
  let service: BelongingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BelongingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
