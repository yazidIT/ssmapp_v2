import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustUserGuidePage } from './biztrust-user-guide.page';

describe('BiztrustUserGuidePage', () => {
  let component: BiztrustUserGuidePage;
  let fixture: ComponentFixture<BiztrustUserGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustUserGuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustUserGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
