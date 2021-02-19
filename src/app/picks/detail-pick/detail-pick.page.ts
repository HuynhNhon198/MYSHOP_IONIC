import { Component, OnInit, ViewChild } from "@angular/core";
import { IPick } from "../models/pick.model";
import { HelperService } from "src/app/services/helper.service";
import {
  AlertController,
  ModalController,
  IonContent,
  MenuController,
} from "@ionic/angular";
import { PhotosViewerPage } from "src/app/photos-viewer/photos-viewer.page";
import { SellService } from "src/openapi";
import { FirebaseService } from "src/app/services/firebase.service";
import { DetailOrderPage } from "src/app/orders/detail-order/detail-order.page";

@Component({
  selector: "app-detail-pick",
  templateUrl: "./detail-pick.page.html",
  styleUrls: ["./detail-pick.page.scss"],
})
export class DetailPickPage implements OnInit {
  @ViewChild("content", { static: true }) content: IonContent;
  data: IPick;
  change = false;
  orderSns: string[];
  historyList = [];
  constructor(
    private helper: HelperService,
    private alertController: AlertController,
    private modalController: ModalController,
    private menu: MenuController,
    private sellSV: SellService,
    private fbSV: FirebaseService
  ) {}

  async ngOnInit() {
    this.historyList = (await this.helper.getStorage("picked_history")) || [];
    console.log(this.data);
  }

  async back() {
    await this.modalController.dismiss();
  }

  changeStatusPick(index) {
    const item = this.data.models_need_pick[index];
    const checked = !item.status;
    this.data.models_need_pick[index].pickedAmount = checked ? item.amount : 0;
    if (this.change) {
      this.saveStorage();
    }
  }
  async openPhotos(photos = [], title, name) {
    photos = photos.map((x) => `https://cf.shopee.vn/file/${x}`);
    const modal = await this.modalController.create({
      component: PhotosViewerPage,
      componentProps: {
        photos,
        title,
        name,
      },
    });
    await modal.present();
  }
  async editPicked(pickedAmount: number, ind: number) {
    const item = this.data.models_need_pick[ind];
    const alert = await this.alertController.create({
      message: "Đã nhặt " + item.name,
      inputs: [
        {
          name: "picked",
          value: pickedAmount || "",
          type: "number",
        },
      ],
      buttons: [
        {
          text: "OK",
          role: "ok",
          handler: (data) => {
            if (Number(data.picked) >= 0 && Number(data.picked) < item.amount) {
              this.data.models_need_pick[ind].pickedAmount = Number(
                data.picked
              );
              this.saveStorage();
            }
          },
        },
        {
          text: "HỦY",
          role: "cancel",
        },
      ],
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector("ion-alert input");
      firstInput.focus();
      return;
    });
  }

  filterData() {
    this.data.models_need_pick = this.helper.sortArrObj(
      this.data.models_need_pick,
      "status",
      "asc"
    );
    this.content.scrollToTop(500);
  }

  async saveStorage() {
    const obj = {
      gomdon_id: this.data.gomdon_id,
      data: this.data.models_need_pick,
    };
    const ind = this.historyList.findIndex(
      (x) => x.gomdon_id === this.data.gomdon_id
    );
    if (ind >= 0) {
      this.historyList[ind] = obj;
    } else {
      this.historyList.push(obj);
    }
    await this.helper.setStorage("picked_history", this.historyList);
  }

  refer(ordersn: string[]) {
    this.orderSns = ordersn;
    this.menu.open();
  }

  async selectOrder(ordersn: string) {
    const data = await this.fbSV.getOneDoc("sells", ordersn);
    const modal = await this.modalController.create({
      component: DetailOrderPage,
      componentProps: {
        data,
      },
    });
    await modal.present();
  }
}
