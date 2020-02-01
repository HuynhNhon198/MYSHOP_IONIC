import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Sell } from 'src/openapi';
import { Subscription } from 'rxjs';
import { IonSearchbar, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  @ViewChild('mySearchbar', { static: true }) searchbar: IonSearchbar;
  data: Sell[];
  temp: Sell[];
  sub: Subscription;
  loading;
  constructor(
    private loadingCTRL: LoadingController,
    private fbSV: FirebaseService
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingCTRL.create({
      message: 'Loading...',
      translucent: true
    });
    this.loading.present();
    this.sub = this.fbSV.getOrders().subscribe(async res => {
      this.data = res;
      this.temp = res;
      await this.loading.dismiss();
      setTimeout(() => this.searchbar.setFocus(), 500);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  searchItem(e) {
    const text = e.target.value;
    this.data = text === '' ? this.temp : [...this.temp.filter(x => x.shipping_traceno.toLowerCase().includes(e.target.value))];
  }
}
