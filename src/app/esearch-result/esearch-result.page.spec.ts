import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EsearchResultPage } from './esearch-result.page';

describe('EsearchResultPage', () => {
  let component: EsearchResultPage;
  let fixture: ComponentFixture<EsearchResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsearchResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EsearchResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
