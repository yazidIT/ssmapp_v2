import { TestBed } from '@angular/core/testing';

import { RegisterDeviceService } from './registerdevice.service';

describe('RegisterdeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterDeviceService = TestBed.get(RegisterDeviceService);
    expect(service).toBeTruthy();
  });
});
