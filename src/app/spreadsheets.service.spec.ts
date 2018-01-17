import { TestBed, inject } from '@angular/core/testing';

import { SpreadsheetsService } from './spreadsheets.service';

describe('SpreadsheetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadsheetsService]
    });
  });

  it('should be created', inject([SpreadsheetsService], (service: SpreadsheetsService) => {
    expect(service).toBeTruthy();
  }));
});
