import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EqueryResultPage } from './equery-result.page';

describe('EqueryResultPage', () => {
  let component: EqueryResultPage;
  let fixture: ComponentFixture<EqueryResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqueryResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EqueryResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
