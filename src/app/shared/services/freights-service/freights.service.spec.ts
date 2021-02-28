import { TestBed, inject } from '@angular/core/testing';

import { FreightsService } from './freights.service';

describe('FreightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreightsService]
    });
  });

  it('should be created', inject([FreightsService], (service: FreightsService) => {
    expect(service).toBeTruthy();
  }));
});
