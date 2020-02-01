import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { IPick } from './models/pick.model';
import { Subscription } from 'rxjs';
import { ModalController, LoadingController } from '@ionic/angular';
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
    private loadingCTRL: LoadingController
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingCTRL.create({
      message: 'Loading...',
      translucent: true
    });
    this.loading.present();
    const ob$ = await this.fbSV.getPicks();
    this.sub = ob$.subscribe(async res => {
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
    data.models_need_pick = data.models_need_pick.map(x => {
      x.status = x.status || false;
      x.pickedAmount = x.pickedAmount || 0;
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
}
