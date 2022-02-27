import { TestBed } from '@angular/core/testing';

import { SsmQueryService } from './ssmquery.service';

describe('SsmqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SsmQueryService = TestBed.get(SsmQueryService);
    expect(service).toBeTruthy();
  });
});
