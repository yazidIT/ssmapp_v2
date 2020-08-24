import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Status308ResultPage } from './status308-result.page';

describe('Status308ResultPage', () => {
  let component: Status308ResultPage;
  let fixture: ComponentFixture<Status308ResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Status308ResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Status308ResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
