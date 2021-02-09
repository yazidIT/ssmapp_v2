import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustScanPage } from './biztrust-scan.page';

describe('BiztrustScanPage', () => {
  let component: BiztrustScanPage;
  let fixture: ComponentFixture<BiztrustScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
