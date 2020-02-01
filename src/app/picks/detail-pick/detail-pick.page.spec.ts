import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPickPage } from './detail-pick.page';

describe('DetailPickPage', () => {
  let component: DetailPickPage;
  let fixture: ComponentFixture<DetailPickPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPickPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPickPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
