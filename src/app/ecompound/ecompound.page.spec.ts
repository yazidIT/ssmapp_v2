import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcompoundPage } from './ecompound.page';

describe('EcompoundPage', () => {
  let component: EcompoundPage;
  let fixture: ComponentFixture<EcompoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcompoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcompoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
