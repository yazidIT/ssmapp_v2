import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { ContactusPage } from './contactus.page';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SsmQueryService } from '../services/ssmquery.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { NavController } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

let translations: any = {"TEST": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

function spyPropertyGetter<T, K extends keyof T>(
  spyObj: jasmine.SpyObj<T>,
  propName: K
): jasmine.Spy<() => T[K]> {
  return Object.getOwnPropertyDescriptor(spyObj, propName)?.get as jasmine.Spy<() => T[K]>;
}

describe('ContactusPage', () => {
  let component: ContactusPage;
  let fixture: ComponentFixture<ContactusPage>;
  let inappbrowserspy, ssmquerysvcspy, ssmloadingsvcspy, navctrlspy, translatesvcspy;
  let googlemapsmock, googlemapmock;

  beforeEach(waitForAsync(() => {

    inappbrowserspy = jasmine.createSpyObj('InAppBrowser', ['create'])
    ssmquerysvcspy = jasmine.createSpyObj('SsmQueryService', ['contactUsQuery'])
    ssmloadingsvcspy = jasmine.createSpyObj('SsmloadingService', ['showLoader', 'hideLoader'])
    navctrlspy = jasmine.createSpyObj('NavController', ['navigateBack'])
    translatesvcspy = jasmine.createSpyObj('TranslateService', ['get'])
    googlemapsmock = jasmine.createSpyObj('GoogleMaps', { create: jasmine.createSpy('GoogleMap') })
    // googlemapmock = jasmine.createSpyObj('GoogleMap', { one: Promise.resolve() })

    TestBed.configureTestingModule({
      declarations: [ ContactusPage, TranslatePipeMock ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InAppBrowser, useValue: inappbrowserspy },
        { provide: SsmQueryService, useValue: ssmquerysvcspy },
        { provide: SsmloadingService, useValue: ssmloadingsvcspy },
        { provide: NavController, useValue: navctrlspy },
      ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {

    window['google'] = {
      maps: {
        LatLng: function(lat, lng) {
          return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
    
            lat: function() { return this.latitude; },
            lng: function() { return this.longitude; }
          };
        },
        LatLngBounds: function(ne, sw) {
          return {
            getSouthWest: function() { return sw; },
            getNorthEast: function() { return ne; }
          };
        },
        OverlayView: function() {
          return {};
        },
        InfoWindow: function() {
          return {};
        },
        Marker: function() {
          return {};
        },
        MarkerImage: function() {
          return {};
        },
        Map: function() {
          return {};
        },
        Point: function() {
          return {};
        },
        Size: function() {
          return {};
        }
      }
    };

    // const spy = spyOnProperty(translatesvcspy, 'currentLang', 'get').and.returnValue("en")
    // spyPropertyGetter(translatesvcspy, 'currentLang').and.returnValue("en")
    // const spy = spyOn(GoogleMaps, 'create').and.returnValue({} as any);
    expect(component).toBeTruthy();
  });
});
