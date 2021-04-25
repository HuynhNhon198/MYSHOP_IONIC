import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DetailPickPageRoutingModule } from "./detail-pick-routing.module";
import { NgxPrinterModule } from "ngx-printer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPickPageRoutingModule,
    NgxPrinterModule.forRoot({ printOpenWindow: true }),
  ],
})
export class DetailPickPageModule {}
