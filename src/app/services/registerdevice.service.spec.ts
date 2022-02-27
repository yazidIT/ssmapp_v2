import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { inject, TestBed } from '@angular/core/testing';

import { RegisterDeviceService } from './registerdevice.service';
import { Device } from '@ionic-native/device/ngx';
import { HTTP } from '@ionic-native/http/ngx';

describe('RegisterdeviceService',() => {

  beforeEach(async() => {
    const deviceProvider = {
      provide: Device,
      useFactory: () => ({
        cordova: "1.0",
        model: "Linux",
        platform: "Android",
        uuid: "fjwofjw0-923jf",
        version: "1.0",
        manufacturer: "Asus",
        isVirtual: true,
        serial: "12323-434342"
      })
    }

    const nativeStorageProvider = {
      provide: NativeStorage,
      useFactory: () => ({
        setItem: () => Promise.resolve(),
        getItem: () => Promise.resolve("GetItem mock return value") 
      })
    }

    TestBed.configureTestingModule({
      providers: [RegisterDeviceService, HTTP, deviceProvider, nativeStorageProvider]
    }).compileComponents()
  });

  it('should be created', inject([RegisterDeviceService],async(service: RegisterDeviceService) => {
    expect(service).toBeTruthy();
  }));

  it('should receive token', inject([RegisterDeviceService],async(service: RegisterDeviceService) => {
    const result = await service.getDevToken()
    expect(result).toBeDefined()
    console.log(result)
  }));

  it('should receive response', inject([RegisterDeviceService],
    async(service: RegisterDeviceService) => {
    await expectAsync(service.registerDevice())
      .toBeResolved()
  }));
});
