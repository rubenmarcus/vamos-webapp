import { TestBed, inject } from '@angular/core/testing';

import { MyOfferResolveService } from './my-offer-resolve.service';

describe('MyOfferResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyOfferResolveService]
    });
  });

  it('should be created', inject([MyOfferResolveService], (service: MyOfferResolveService) => {
    expect(service).toBeTruthy();
  }));
});
