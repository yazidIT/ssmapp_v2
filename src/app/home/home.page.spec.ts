import { INewsItem, INewsResultData } from './../models/inewsresult';
import { RouterTestingModule } from '@angular/router/testing';
import { waitForAsync, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { NewsService } from '../services/news.service';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { RegisterDeviceService } from '../services/registerdevice.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

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

describe('HomePage', () => {
  jasmine.getEnv().allowRespy(true);

  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let newssvcmock, navctrlspy, regdevsvcspy, nativestoragemock, ionroutemock;

  let newsitem : INewsItem = {
    title: "INews Item Title",
    link: "https://www.google.com",
    description: "INewsItem item",
    author: "Norani Idris",
    pubDate: "2022-01-01",
    guid:"fiwehwer0r0werwe",
    id:"1234",
    link_id: "12121313"
  }
  let newsdata : INewsResultData = {
    channel : {
      title: "This is a test",
      link: "https://news.item/number/1",
      description: "Test news for unit test",
      lastBuildDate: "2021-01-01",
      generator: "aaa",
      ttl: "aaaaaa",
      language: "en",
      item: [newsitem]
    }
  }

  beforeEach(waitForAsync(() => {

    newssvcmock = jasmine.createSpyObj('NewsService',
                  {getNews: Promise.resolve({data:JSON.stringify(newsdata)}), getDetailNews: Promise.resolve()});
    // newssvcmock = jasmine.createSpy('NewsService')
    navctrlspy = jasmine.createSpyObj('NavController', ['navigateBack'])
    regdevsvcspy = jasmine.createSpyObj('RegisterDeviceService', ['registerDevice', 'getDevToken'])
    nativestoragemock = jasmine.createSpyObj('NativeStorage', {getItem: Promise.resolve("lakfjsdif")})
    ionroutemock = jasmine.createSpyObj('IonRouterOutlet', ['canGoBack'])

    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: NewsService, useValue: newssvcmock },
        { provide: NavController, useValue: navctrlspy },
        { provide: RegisterDeviceService, useValue: regdevsvcspy },
        { provide: NativeStorage, useValue: nativestoragemock },
        { provide: IonRouterOutlet, useValue: ionroutemock },
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        }),
      ]
    }).compileComponents();

  }));

  it('should create', async() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should work with failed getNews', async () => {
    spyOn(newssvcmock, 'getNews').and.returnValue(Promise.reject(new Error("GetNews failed to read")))
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });
});
