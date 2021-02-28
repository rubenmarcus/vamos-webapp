import { TestBed, inject } from '@angular/core/testing';

import { OfferPlansService } from './offer-plans.service';

describe('OfferPlansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferPlansService]
    });
  });

  it('should be created', inject([OfferPlansService], (service: OfferPlansService) => {
    expect(service).toBeTruthy();
  }));
});
