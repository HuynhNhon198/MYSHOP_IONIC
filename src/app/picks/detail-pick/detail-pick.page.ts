import { Component, OnInit } from '@angular/core';
import { IPick } from '../models/pick.model';
import { HelperService } from 'src/app/services/helper.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-pick',
  templateUrl: './detail-pick.page.html',
  styleUrls: ['./detail-pick.page.scss'],
})
export class DetailPickPage implements OnInit {
  data: IPick;
  constructor(
    private helper: HelperService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.data);
  }
  changeStatusPick(index) {
    const item = this.data.models_need_pick[index];
    const checked = !item.status;

    this.data.models_need_pick[index].pickedAmount = checked ? item.amount : 0;

  }
  async editPicked(pickedAmount: number, ind: number) {
    const item = this.data.models_need_pick[ind];
    const alert = await this.alertController.create({
      message: 'Đã nhặt ' + item.name,
      inputs: [
        {
          name: 'picked',
          value: pickedAmount.toString(),
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: (data) => {

            if (Number(data.picked) >= 0 && Number(data.picked) < item.amount) {
              this.data.models_need_pick[ind].pickedAmount = Number(data.picked);
            }
          }
        }, {
          text: 'HỦY',
          role: 'cancel'
        }]
    });

    await alert.present();

  }

  filterData() {
    this.data.models_need_pick = this.helper.sortArrObj(this.data.models_need_pick, 'status', 'asc');
  }
}