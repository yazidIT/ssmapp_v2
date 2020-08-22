import { TestBed } from '@angular/core/testing';

import { SsmqueryService } from './ssmquery.service';

describe('SsmqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SsmqueryService = TestBed.get(SsmqueryService);
    expect(service).toBeTruthy();
  });
});
