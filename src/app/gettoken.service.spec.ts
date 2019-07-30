import { TestBed, inject } from '@angular/core/testing';

import { GettokenService } from './gettoken.service';

describe('GettokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GettokenService]
    });
  });

  it('should be created', inject([GettokenService], (service: GettokenService) => {
    expect(service).toBeTruthy();
  }));
});
