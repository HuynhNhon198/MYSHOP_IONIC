import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PicksPageRoutingModule } from './picks-routing.module';

import { PicksPage } from './picks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PicksPageRoutingModule
  ],
  declarations: [PicksPage]
})
export class PicksPageModule {}
