import { TestBed, inject } from '@angular/core/testing';

import { ValuationService } from './valuation.service';

describe('ValuationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValuationService]
    });
  });

  it('should be created', inject([ValuationService], (service: ValuationService) => {
    expect(service).toBeTruthy();
  }));
});
