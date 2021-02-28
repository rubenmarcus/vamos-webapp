import { TestBed, inject } from '@angular/core/testing';

import { ViewersService } from './viewers.service';

describe('ViewersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewersService]
    });
  });

  it('should be created', inject([ViewersService], (service: ViewersService) => {
    expect(service).toBeTruthy();
  }));
});
