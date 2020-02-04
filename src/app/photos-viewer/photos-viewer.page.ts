import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-photos-viewer',
  templateUrl: './photos-viewer.page.html',
  styleUrls: ['./photos-viewer.page.scss'],
})
export class PhotosViewerPage implements OnInit {
  photos;
  title;
  name;
  constructor(
    private modalController: ModalController,
    private photoViewer: PhotoViewer
  ) { }

  ngOnInit() {
  }
  back() {
    this.modalController.dismiss();
  }
  show(url) {
    const options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: true, // default is false
      headers: '',  // If this is not provided, an exception will be triggered
      piccasoOptions: {} // If this is not provided, an exception will be triggered
    };

    this.photoViewer.show(url, this.title, options);
  }
}
