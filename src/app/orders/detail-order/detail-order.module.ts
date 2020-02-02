import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailOrderPageRoutingModule } from './detail-order-routing.module';

import { DetailOrderPage } from './detail-order.page';
// import { StatusPipe } from 'src/app/pipes/app.status';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailOrderPageRoutingModule
  ],
  declarations: [],
})
export class DetailOrderPageModule {}
