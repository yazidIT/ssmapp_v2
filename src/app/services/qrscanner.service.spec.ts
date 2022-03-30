import { Network } from '@ionic-native/network/ngx';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { ConnectionStatus, NetworkService } from './network.service';

import { QRScannerService } from './qrscanner.service';
import { SsmQueryService } from './ssmquery.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

let translations: any = {"TEST": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('QRScannerService', () => {
  jasmine.getEnv().allowRespy(true);

  let nwksvc = jasmine.createSpyObj('NetworkService',['getCurrentNetworkStatus'])
  let ssmquerysvc = jasmine.createSpyObj('SsmQueryService',['eSearchQuery'])
  let barcodescnsvc = jasmine.createSpyObj('BarcodeScanner',['scan', 'encode'])

  beforeEach(waitForAsync(() => { 
    TestBed.configureTestingModule({
      providers: [
        { provide: NetworkService, useValue: nwksvc },
        { provide: SsmQueryService, useValue: ssmquerysvc },
        { provide: BarcodeScanner, useValue: barcodescnsvc },
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ]
    })
  }));

  it('should be created', () => {
    const service: QRScannerService = TestBed.inject(QRScannerService);
    expect(service).toBeTruthy();
  });

  it('scanQrCode should result in correct data', async() => {
    const service: QRScannerService = TestBed.inject(QRScannerService);
    let teststring = "This is test string"
    spyOn(barcodescnsvc, 'scan').and.returnValue(Promise.resolve({text: teststring}))
    let result = await service.scanQRCode()
    expect(result).toEqual(teststring)
  });

  it('scanQrCode with network error', async() => {
    const service: QRScannerService = TestBed.inject(QRScannerService);
    let networkerror = "NetworkError"
    spyOn(nwksvc, 'getCurrentNetworkStatus').and.returnValue(ConnectionStatus.Offline)
    let result = await service.scanQRCode()
    expect(result).toEqual(networkerror)
  });

  it('scanQrCode barcodescanner return error', async() => {
    const service: QRScannerService = TestBed.inject(QRScannerService);

    spyOn(barcodescnsvc, 'scan').and.returnValue(Promise.reject(new Error("Invalid barcode")))
    let result = await service.scanQRCode()
    expect(result).toBeTruthy()
  });
});
