import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotosViewerPage } from './photos-viewer.page';

describe('PhotosViewerPage', () => {
  let component: PhotosViewerPage;
  let fixture: ComponentFixture<PhotosViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
