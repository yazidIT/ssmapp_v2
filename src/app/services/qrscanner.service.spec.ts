import { TestBed } from '@angular/core/testing';

import { QRScannerService } from './qrscanner.service';

describe('QRScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QRScannerService = TestBed.get(QRScannerService);
    expect(service).toBeTruthy();
  });
});
