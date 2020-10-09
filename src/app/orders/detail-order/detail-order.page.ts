import { Component, OnInit, OnDestroy } from "@angular/core";
import { Sell, OrderItem, GomdonLogs } from "src/openapi";
import { HelperService } from "src/app/services/helper.service";
import { FirebaseService } from "src/app/services/firebase.service";
import {
  LoadingController,
  ModalController,
  AlertController,
  ToastController,
  ActionSheetController,
} from "@ionic/angular";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { PhotosViewerPage } from "src/app/photos-viewer/photos-viewer.page";
import { CallNumber } from "@ionic-native/call-number/ngx";
interface IItem extends OrderItem {
  gomdon_status?: boolean;
  picked?: number;
}

@Component({
  selector: "app-detail-order",
  templateUrl: "./detail-order.page.html",
  styleUrls: ["./detail-order.page.scss"],
})
export class DetailOrderPage implements OnInit, OnDestroy {
  data: Sell;
  checkFrom: boolean;
  items: IItem[] = [];
  checkAll = false;
  loading;
  change = false;
  checkCheckAll = true;
  // tslint:disable-next-line: variable-name
  own_logs_note: GomdonLogs[] = [];
  constructor(
    public helper: HelperService,
    private fbSV: FirebaseService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private clipboard: Clipboard,
    public actionSheetController: ActionSheetController,
    private callNumber: CallNumber
  ) {}

  async ngOnInit() {
    this.items = this.data.order_items;
    this.own_logs_note = this.data.gomdon_logs.filter((x) => x.type === 1);
  }

  async ngOnDestroy() {
    // await this.loading.dismiss();
  }

  async bulkChange(checked: boolean) {
    if (checked) {
      this.checkCheckAll = false;
      await this.updateItemFromCheckBox();
    }
    this.change = checked ? this.change : true;
    this.items.forEach((item) => {
      item.gomdon_status = checked;
      item.picked = checked ? item.amount : 0;
    });
  }

  async changePicked(pickedAmount: number, ind: number) {
    const item = this.items[ind];
    const alert = await this.alertController.create({
      message: "Đã nhặt " + item.item_model.name,
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
            this.change = true;
            if (Number(data.picked) >= 0 && Number(data.picked) < item.amount) {
              this.items[ind].picked = Number(data.picked);
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
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "Đang Lưu...",
      backdropDismiss: true,
    });
    await this.loading.present();
  }
  async back() {
    if (this.change) {
      await this.showLoading();
      await this.fbSV.updateSell(this.data.order_sn, {
        order_items: this.items,
      });
      await this.loading.dismiss();
      await this.modalController.dismiss();
    } else {
      await this.modalController.dismiss();
    }
  }

  async changeStatus(currentStatus: number) {
    let newStatus = 0;
    switch (currentStatus) {
      case 1:
        newStatus = 4;
        break;
      case 4:
        newStatus = 1;
        break;
    }
    if (newStatus !== 0) {
      await this.showLoading();
      const newLogs: GomdonLogs[] = this.helper.saveLogOrder(
        this.data.gomdon_logs,
        newStatus.toString(),
        0
      );
      await this.fbSV.updateSell(this.data.order_sn, {
        gomdon_status: newStatus,
        gomdon_logs: newLogs,
      });
      this.data.gomdon_status = newStatus;
      this.data.gomdon_logs = newLogs;
      await this.loading.dismiss();
    }
  }

  async takeNote() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      inputs: [
        {
          name: "note",
          value: "",
          type: "text",
          placeholder: "Nhập NOTE của bạn tại đây...",
        },
      ],
      buttons: [
        {
          text: "LƯU",
          role: "ok",
          handler: async (data) => {
            const newLogs: GomdonLogs[] = this.helper.saveLogOrder(
              this.data.gomdon_logs,
              data.note,
              1
            );
            await this.showLoading();
            await this.fbSV.updateSell(this.data.order_sn, {
              gomdon_note: data.note,
              gomdon_logs: newLogs,
            });
            this.data.gomdon_logs = newLogs;
            this.data.gomdon_note = data.note;
            this.own_logs_note = this.data.gomdon_logs.filter(
              (x) => x.type === 1
            );
            await this.loading.dismiss();
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
  async copyText(text: string) {
    text = text.replace("+84", "0");
    await this.clipboard.copy(text).then(async () => {
      const toast = await this.toastController.create({
        message: `Đã Copy: ${text}`,
        duration: 2000,
      });
      toast.present();
    });
  }
  async changeStatusItem(index: number) {
    const item = this.items[index];
    this.items[index].picked = item.gomdon_status ? item.amount : 0;
    const checkedLength = this.items.filter((x) => x.gomdon_status).length;
    if (checkedLength === this.items.length) {
      this.checkAll = true;
      if (this.checkCheckAll) {
        if (this.change) {
          await this.updateItemFromCheckBox();
        }
      }
    } else {
      this.checkAll = false;
    }
  }

  async updateItemFromCheckBox() {
    const newLogs: GomdonLogs[] = this.helper.saveLogOrder(
      this.data.gomdon_logs,
      "4",
      0
    );
    await this.showLoading();
    await this.fbSV.updateSell(this.data.order_sn, {
      order_items: this.items,
      gomdon_logs: newLogs,
      gomdon_status: 4,
    });
    this.data.gomdon_status = 4;
    this.data.gomdon_logs = newLogs;
    this.change = false;
    await this.loading.dismiss();
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

  async presentActionSheet(phone) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Sao chép",
          icon: "copy",
          handler: () => {
            this.copyText(phone);
          },
        },
        {
          text: "Gọi ngay",
          icon: "call",
          handler: () => {
            this.callNumber.callNumber(phone.toString(), true);
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
