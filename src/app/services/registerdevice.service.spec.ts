import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';

import { RegisterDeviceService } from './registerdevice.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

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

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  /// Tests begin ///

  it('can test HttpClient.post', () => {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }

    // version 2
    let apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
    let postData = { "uuid" : "oiwjiowr-12332", "os" : "linux", "hash" : "dfdsfggwre" }
    let urlEndpoint = apiv2url + 'device/register'
    httpClient.post(urlEndpoint, postData, {headers})
      .subscribe(data => {
        expect(data).toBeDefined()
        console.log(data)
      }
      );
  
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(urlEndpoint);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('POST');
  
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    // req.flush(testData);
  
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
