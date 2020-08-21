import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EsearchPage } from './esearch.page';

describe('EsearchPage', () => {
  let component: EsearchPage;
  let fixture: ComponentFixture<EsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
