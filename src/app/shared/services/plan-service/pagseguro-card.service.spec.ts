import { TestBed, inject } from '@angular/core/testing';

import { PagseguroCardService } from './pagseguro-card.service';

describe('PagseguroCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagseguroCardService]
    });
  });

  it('should be created', inject([PagseguroCardService], (service: PagseguroCardService) => {
    expect(service).toBeTruthy();
  }));
});
