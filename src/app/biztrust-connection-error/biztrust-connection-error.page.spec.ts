import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustConnectionErrorPage } from './biztrust-connection-error.page';

describe('BiztrustConnectionErrorPage', () => {
  let component: BiztrustConnectionErrorPage;
  let fixture: ComponentFixture<BiztrustConnectionErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustConnectionErrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustConnectionErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
