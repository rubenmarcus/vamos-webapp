import { TestBed, inject } from '@angular/core/testing';

import { TemServiceService } from './tem-service.service';

describe('TemServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemServiceService]
    });
  });

  it('should be created', inject([TemServiceService], (service: TemServiceService) => {
    expect(service).toBeTruthy();
  }));
});
