import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { IonicModule } from "@ionic/angular";

import { ScannerPageRoutingModule } from "./scanner-routing.module";

import { ScannerPage } from "./scanner.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    ScannerPageRoutingModule,
  ],
  declarations: [ScannerPage],
})
export class ScannerPageModule {}
