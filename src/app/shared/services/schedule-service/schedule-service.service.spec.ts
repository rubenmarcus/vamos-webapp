import { TestBed, inject } from '@angular/core/testing';

import { ScheduleServiceService } from './schedule-service.service';

describe('ScheduleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleServiceService]
    });
  });

  it('should be created', inject([ScheduleServiceService], (service: ScheduleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
