import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiztrustErrorPage } from './biztrust-error.page';

describe('BiztrustErrorPage', () => {
  let component: BiztrustErrorPage;
  let fixture: ComponentFixture<BiztrustErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiztrustErrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiztrustErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
