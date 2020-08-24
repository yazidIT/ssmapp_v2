import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Status308Page } from './status308.page';

describe('Status308Page', () => {
  let component: Status308Page;
  let fixture: ComponentFixture<Status308Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Status308Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Status308Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
