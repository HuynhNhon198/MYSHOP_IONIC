import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private network: Network,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const toast = await this.toastController.create({
      message: 'KHÔNG CÓ MẠNG, VUI LÒNG KIỂM TRA.',
      color: 'danger'
    });

    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      toast.present();
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    const connectSubscription = this.network.onConnect().subscribe(() => {
      toast.dismiss();
    });

    // stop connect watch
    connectSubscription.unsubscribe();
  }

}
