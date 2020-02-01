import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PicksPage } from './picks.page';

describe('PicksPage', () => {
  let component: PicksPage;
  let fixture: ComponentFixture<PicksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PicksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
