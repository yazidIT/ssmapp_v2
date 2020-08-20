import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailnewsPage } from './detailnews.page';

describe('DetailnewsPage', () => {
  let component: DetailnewsPage;
  let fixture: ComponentFixture<DetailnewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailnewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailnewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
