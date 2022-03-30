import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterDeviceService } from './services/registerdevice.service';
import { TranslateConfigService } from './services/translate-config.service';

import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

let translations: any = {"TEST": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let regdevsvcspy, translateconfigsvcspy;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    regdevsvcspy = jasmine.createSpyObj('RegisterDeviceService', ['registerDevice', 'getDevToken'])
    translateconfigsvcspy = jasmine.createSpyObj('TranslateConfigService', ['getDefaultLanguage',
      'setLanguage', 'getLanguage'])

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: RegisterDeviceService, useValue: regdevsvcspy },
        { provide: TranslateConfigService, useValue: translateconfigsvcspy },
      ],
      imports: [ RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(9);
    expect(menuItems[0].textContent).toContain('MENU_04');
    expect(menuItems[1].textContent).toContain('MENU_01');
    expect(menuItems[2].textContent).toContain('MENU_07');
    expect(menuItems[3].textContent).toContain('MENU_05');
    expect(menuItems[4].textContent).toContain('MENU_06');
    expect(menuItems[5].textContent).toContain('MENU_08');
    expect(menuItems[6].textContent).toContain('SSMBIZTRUST');
    expect(menuItems[7].textContent).toContain('MENU_02');
    expect(menuItems[8].textContent).toContain('MENU_03');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(9);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/news_announcement');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/esearch');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/equery');
    expect(menuItems[4].getAttribute('ng-reflect-router-link')).toEqual('/ecompound');
    expect(menuItems[5].getAttribute('ng-reflect-router-link')).toEqual('/status308');
    expect(menuItems[6].getAttribute('ng-reflect-router-link')).toEqual('/biztrust');
    expect(menuItems[7].getAttribute('ng-reflect-router-link')).toEqual('/contact_us');
    expect(menuItems[8].getAttribute('ng-reflect-router-link')).toBeNull
  });

});
