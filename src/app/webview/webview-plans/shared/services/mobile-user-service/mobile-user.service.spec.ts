import { TestBed, inject } from '@angular/core/testing';

import { MobileUserService } from './mobile-user.service';

describe('MobileUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobileUserService]
    });
  });

  it('should be created', inject([MobileUserService], (service: MobileUserService) => {
    expect(service).toBeTruthy();
  }));
});
