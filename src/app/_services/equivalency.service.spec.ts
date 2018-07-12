import { TestBed, inject } from '@angular/core/testing';

import { EquivalencyService } from './equivalency.service';

describe('EquivalencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquivalencyService]
    });
  });

  it('should be created', inject([EquivalencyService], (service: EquivalencyService) => {
    expect(service).toBeTruthy();
  }));
});
