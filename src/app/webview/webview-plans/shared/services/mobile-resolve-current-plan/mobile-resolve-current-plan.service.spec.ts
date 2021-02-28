import { TestBed, inject } from '@angular/core/testing';

import { MobileResolveCurrentPlanService } from './mobile-resolve-current-plan.service';

describe('MobileResolveCurrentPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobileResolveCurrentPlanService]
    });
  });

  it('should be created', inject([MobileResolveCurrentPlanService], (service: MobileResolveCurrentPlanService) => {
    expect(service).toBeTruthy();
  }));
});
