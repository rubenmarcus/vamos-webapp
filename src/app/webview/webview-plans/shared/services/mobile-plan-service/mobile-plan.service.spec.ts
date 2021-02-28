import { TestBed, inject } from '@angular/core/testing';

import { MobilePlanService } from './mobile-plan.service';

describe('MobilePlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobilePlanService]
    });
  });

  it('should be created', inject([MobilePlanService], (service: MobilePlanService) => {
    expect(service).toBeTruthy();
  }));
});
