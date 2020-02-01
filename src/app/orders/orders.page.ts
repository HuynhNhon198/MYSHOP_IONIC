import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Sell } from 'src/openapi';
import { Subscription } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  @ViewChild('mySearchbar', { static: true }) searchbar: IonSearchbar;
  data: Sell[];
  sub: Subscription;
  constructor(
    private fbSV: FirebaseService
  ) { }

  ngOnInit() {
    setTimeout(() => this.searchbar.setFocus(), 500);
    this.sub = this.fbSV.getOrders().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  searchItem(e) {
    console.log(e.target.value);
  }
}
