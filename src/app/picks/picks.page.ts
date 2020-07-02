import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { IPick } from './models/pick.model';
import { Subscription } from 'rxjs';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DetailPickPage } from './detail-pick/detail-pick.page';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.page.html',
  styleUrls: ['./picks.page.scss'],
})
export class PicksPage implements OnInit, OnDestroy {
  data: IPick[];
  sub: Subscription;
  loading;
  constructor(
    private fbSV: FirebaseService,
    public modalController: ModalController,
    private helper: HelperService,
    private loadingCTRL: LoadingController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingCTRL.create({
      message: 'Loading...',
      translucent: true
    });
    this.loading.present();
    this.sub = this.fbSV.getPicks().subscribe(async res => {
      this.data = this.helper.sortArrObj(res, 'gomdon_ctime', 'desc');
      this.loading.dismiss();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  selected(item: IPick) {
    this.presentModal(item);
  }
  async presentModal(data) {
    let picked: any = await this.helper.getStorage('picked');
    if (picked && picked.gomdon_id === data.gomdon_id) {
      picked = picked.data;
    } else {
      picked = [];
    }
    data.models_need_pick = data.models_need_pick.map(x => {
      const saved = picked.find( y => y.item_id === x.item_id);
      x.status = x.status || (saved ? saved.status : false);
      x.pickedAmount = x.pickedAmount || (saved ? saved.pickedAmount : 0);
      return x;
    });
    const modal = await this.modalController.create({
      component: DetailPickPage,
      componentProps: {
        data
      }
    });
    return await modal.present();
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'XÓA',
      message: 'Bạn có chắn chắn sẽ xóa toàn bộ các lần nhặt hàng',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: async () => {
            await this.fbSV.deleteAllPicks();
          }
        }
      ]
    });
    await alert.present();
  }
}
