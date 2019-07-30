import { TestBed, inject } from '@angular/core/testing';

import { GetAvabilityService } from './get-avability.service';

describe('GetAvabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAvabilityService]
    });
  });

  it('should be created', inject([GetAvabilityService], (service: GetAvabilityService) => {
    expect(service).toBeTruthy();
  }));
});
