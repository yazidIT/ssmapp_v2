import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SsmfabComponent } from './ssmfab.component';

describe('SsmfabComponent', () => {
  let component: SsmfabComponent;
  let fixture: ComponentFixture<SsmfabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsmfabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SsmfabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
