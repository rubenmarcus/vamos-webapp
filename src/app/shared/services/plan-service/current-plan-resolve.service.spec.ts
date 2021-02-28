import { TestBed, inject } from '@angular/core/testing';

import { CurrentPlanResolveService } from './current-plan-resolve.service';

describe('CurrentPlanResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentPlanResolveService]
    });
  });

  it('should be created', inject([CurrentPlanResolveService], (service: CurrentPlanResolveService) => {
    expect(service).toBeTruthy();
  }));
});
