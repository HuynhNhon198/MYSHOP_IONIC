import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(
    public loadingController: LoadingController
  ) {
  }

  async showLoading(hide?: boolean) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    hide ? loading.dismiss() : loading.present();
  }

  sortArrObj(arr: any[], prop: string, type: string) {
    if (type.toLowerCase() === 'asc') {
      return arr.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
    } else {
      return arr.sort((a, b) => (a[prop] < b[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0));
    }
  }
}
