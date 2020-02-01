import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPickPageRoutingModule } from './detail-pick-routing.module';

import { DetailPickPage } from './detail-pick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPickPageRoutingModule
  ],
  declarations: [DetailPickPage]
})
export class DetailPickPageModule {}
