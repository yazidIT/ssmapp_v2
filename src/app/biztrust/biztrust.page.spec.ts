import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustPage } from './biztrust.page';

describe('BiztrustPage', () => {
  let component: BiztrustPage;
  let fixture: ComponentFixture<BiztrustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
