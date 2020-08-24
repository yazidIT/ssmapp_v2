import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EqueryPage } from './equery.page';

describe('EqueryPage', () => {
  let component: EqueryPage;
  let fixture: ComponentFixture<EqueryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqueryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EqueryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
