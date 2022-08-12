import { TestBed } from '@angular/core/testing';

import { SapiolabService } from './sapiolab.service';

describe('SapiolabService', () => {
  let service: SapiolabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SapiolabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
