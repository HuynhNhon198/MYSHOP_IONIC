import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosViewerPage } from './photos-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosViewerPageRoutingModule {}
