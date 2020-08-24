import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcompoundResultPage } from './ecompound-result.page';

describe('EcompoundResultPage', () => {
  let component: EcompoundResultPage;
  let fixture: ComponentFixture<EcompoundResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcompoundResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcompoundResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
