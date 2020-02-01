import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicksPage } from './picks.page';

const routes: Routes = [
  {
    path: '',
    component: PicksPage
  },
  {
    path: 'detail-pick',
    loadChildren: () => import('./detail-pick/detail-pick.module').then( m => m.DetailPickPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicksPageRoutingModule {}
