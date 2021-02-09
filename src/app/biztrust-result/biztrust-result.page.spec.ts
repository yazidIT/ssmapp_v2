import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustResultPage } from './biztrust-result.page';

describe('BiztrustResultPage', () => {
  let component: BiztrustResultPage;
  let fixture: ComponentFixture<BiztrustResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
