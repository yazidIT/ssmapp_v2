import { TestBed } from '@angular/core/testing';

import { SsmloadingService } from './ssmloading.service';

describe('SsmloadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SsmloadingService = TestBed.get(SsmloadingService);
    expect(service).toBeTruthy();
  });
});
