import { TestBed, inject } from '@angular/core/testing';

import { PreviewModelService } from './preview-model.service';

describe('PreviewModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviewModelService]
    });
  });

  it('should be created', inject([PreviewModelService], (service: PreviewModelService) => {
    expect(service).toBeTruthy();
  }));
});
