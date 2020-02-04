import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosViewerPageRoutingModule } from './photos-viewer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosViewerPageRoutingModule
  ],
  declarations: []
})
export class PhotosViewerPageModule {}
