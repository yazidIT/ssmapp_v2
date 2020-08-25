import { TestBed } from '@angular/core/testing';

import { TranslateConfigService } from './translate-config.service';

describe('TranslateConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateConfigService = TestBed.get(TranslateConfigService);
    expect(service).toBeTruthy();
  });
});
