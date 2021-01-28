import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import { Sell } from "src/openapi";
import { Subscription } from "rxjs";
import {
  IonSearchbar,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { DetailOrderPage } from "./detail-order/detail-order.page";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.page.html",
  styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit, OnDestroy {
  @ViewChild("mySearchbar", { static: true }) searchbar: IonSearchbar;
  data: Sell[];
  temp: Sell[];
  sub: Subscription;
  loading;
  search: string = "";
  focus = true;
  constructor(
    private loadingCTRL: LoadingController,
    private fbSV: FirebaseService,
    private modalController: ModalController
  ) {}

  // ionViewDidEnter() {
  // }

  async ngOnInit() {
    this.loading = await this.loadingCTRL.create({
      message: "Loading...",
      translucent: true,
    });
    this.loading.present();
    this.sub = (await this.fbSV.getOrders()).subscribe(async (res) => {
      res = res.map((x) => {
        x["picked"] =
          x.order_items.filter((y) => y["picked"] > 0).length > 0
            ? true
            : false;
        return x;
      });
      this.data = res;
      this.temp = res;
      if (this.focus) {
        setTimeout(() => this.searchbar.setFocus(), 500);
        await this.loading.dismiss();
        this.focus = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  searchItem(e) {
    if (this.search && this.search.length) {
      this.data = [
        ...this.temp.filter((x) =>
          x.shipping_traceno.toLowerCase().includes(this.search.toLowerCase())
        ),
      ];
    } else {
      this.data = this.temp;
    }
  }

  async selectItem(data) {
    const modal = await this.modalController.create({
      component: DetailOrderPage,
      componentProps: {
        data,
        checkFrom: true,
      },
    });
    modal.onDidDismiss().then(() => {
      this.searchbar.value = "";
      this.data = this.temp;
      this.searchbar.setFocus();
      // setTimeout(() => this.searchbar.setFocus(), 500);
    });
    return await modal.present();
  }
}
