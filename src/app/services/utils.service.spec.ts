import { AppVersion } from '@ionic-native/app-version/ngx';
import { inject, TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [UtilsService, AppVersion]
    }).compileComponents()
  });

  it('should be created', inject([UtilsService],
    async(service: UtilsService) => {
    expect(service).toBeTruthy();
  }))

  it('should return date Malaysia format', inject([UtilsService],
    (service: UtilsService) => {
    const today = new Date()
    const result = service.getDateMsFormat(today)
    expect(result).toBeDefined()
    console.log(result)
  }))

  it('should return date Malaysia format from non-standard', inject([UtilsService],
    (service: UtilsService) => {
    const nonstdstring = "2015-12-25 00:00:00"
    const result = service.getDateNonStandard(nonstdstring)
    expect(result).toBe("25/12/2015")
    console.log(result)
  }))
});
