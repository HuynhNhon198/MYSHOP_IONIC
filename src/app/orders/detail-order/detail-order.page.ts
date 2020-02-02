import { Component, OnInit } from '@angular/core';
import { Sell, OrderItem, GomdonLogs } from 'src/openapi';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

interface IItem extends OrderItem {
  gomdon_status?: boolean;
  picked?: number;
}

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
  data: Sell;
  items: IItem[] = [];
  checkAll = false;
  loading;
  change = false;
  // tslint:disable-next-line: variable-name
  own_logs_note: GomdonLogs[] = [];
  constructor(
    public helper: HelperService,
    private fbSV: FirebaseService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private clipboard: Clipboard
  ) { }

  async ngOnInit() {

    this.items = this.data.order_items;
    this.own_logs_note = this.data.gomdon_logs.filter(x => x.type === 1);
  }

  bulkChange(checked: boolean) {
    this.change = checked ? this.change : true;
    this.items.forEach(item => {
      item.gomdon_status = checked;
      item.picked = checked ? item.amount : 0;
    });
  }

  async changePicked(pickedAmount: number, ind: number) {
    const item = this.items[ind];
    const alert = await this.alertController.create({
      message: 'Đã nhặt ' + item.item_model.name,
      inputs: [
        {
          name: 'picked',
          value: pickedAmount || '',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: (data) => {
            this.change = true;
            if (Number(data.picked) >= 0 && Number(data.picked) < item.amount) {
              this.items[ind].picked = Number(data.picked);
            }
          }
        }, {
          text: 'HỦY',
          role: 'cancel'
        }]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });

  }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Đang Lưu...'
    });
    await this.loading.present();
  }
  async back() {
    if (this.change) {
      await this.loading.present();
      await this.fbSV.updateSell(this.data.order_sn, {
        order_items: this.items,
      });
      await this.loading.dismiss();
      await this.modalController.dismiss();
    } else {
      await this.modalController.dismiss();
    }

  }

  async changeStatus(currentStatus) {
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
      const newLogs: GomdonLogs[] = await this.helper.saveLogOrder(this.data.gomdon_logs, newStatus.toString(), 0);
      await this.fbSV.updateSell(this.data.order_sn, {
        gomdon_status: newStatus,
        gomdon_logs: newLogs
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
          name: 'note',
          value: '',
          type: 'text',
          placeholder: 'Nhập NOTE của bạn tại đây...'
        }
      ],
      buttons: [
        {
          text: 'LƯU',
          role: 'ok',
          handler: async (data) => {
            console.log(data.note);
            const newLogs: GomdonLogs[] = await this.helper.saveLogOrder(this.data.gomdon_logs, data.note, 1);
            await this.showLoading();
            await this.fbSV.updateSell(this.data.order_sn, {
              gomdon_note: data.note,
              gomdon_logs: newLogs,
            });
            this.data.gomdon_logs = newLogs;
            this.data.gomdon_note = data.note;
            this.own_logs_note = this.data.gomdon_logs.filter(x => x.type === 1);
            await this.loading.dismiss()
          }
        }, {
          text: 'HỦY',
          role: 'cancel'
        }]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }
  async copyPhone() {
    const phone = ('+' + this.data.buyer_address_phone).replace('+84', '0');
    await this.clipboard.copy(phone).then(async () => {
      const toast = await this.toastController.create({
        message: 'Đã Copy',
        duration: 2000
      });
      toast.present();
    })
  }
  async changeStatusItem(index: number) {
    const item = this.items[index];
    this.items[index].picked = item.gomdon_status ? item.amount : 0;
    const checkedLength = this.items.filter(x => x.gomdon_status).length;
    if (checkedLength === this.items.length) {
      this.checkAll = true;
      const newLogs: GomdonLogs[] = await this.helper.saveLogOrder(this.data.gomdon_logs, '4', 0);
      await this.showLoading();
      await this.fbSV.updateSell(this.data.order_sn, {
        order_items: this.items,
        gomdon_logs: newLogs,
        gomdon_status: 4
      });
      this.data.gomdon_status = 4;
      this.data.gomdon_logs = newLogs;
      this.change = false;
      await this.loading.dismiss();
    } else {
      this.checkAll = false;
    }
  }

}
