import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPickPage } from './detail-pick.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPickPageRoutingModule {}
