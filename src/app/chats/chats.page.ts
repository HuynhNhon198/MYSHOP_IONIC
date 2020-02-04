import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';
import { IChat } from './chat.model';
import { HelperService } from '../services/helper.service';
import { IonContent, LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, OnDestroy {
  @ViewChild('chatsView', { static: false }) myChat: IonContent;
  sub: Subscription;
  sub1: Subscription;
  sub2: Subscription;
  chats: (IChat & {
    gomdon_id: string
  })[] = [];
  autoScroll = true;
  loading;
  text: string;
  constructor(
    public fbSV: FirebaseService,
    private helper: HelperService,
    private loadingController: LoadingController,
    private keyboard: Keyboard
  ) {
  }

  async ngOnInit() {
    const el: HTMLElement = document.getElementById('input-chat');
    this.sub1 = this.keyboard.onKeyboardDidShow().subscribe(e => {
      el.style.marginBottom = `${e.keyboardHeight + 85}px`;
      // alert(e.keyboardHeight)
      this.myChat.scrollToBottom(300);
    });

    this.sub2 = this.keyboard.onKeyboardDidHide().subscribe(e => {
      el.style.marginBottom = '0px';
    });
    const ob$ = await this.fbSV.getChats();
    this.sub = ob$.subscribe(res => {
      this.chats = this.helper.uniqueArrObj([...this.chats, ...this.helper.sortArrObj(res, 'gomdon_ctime', 'asc')], 'gomdon_ctime');

      if (this.chats[this.chats.length - 1].from.uid !== this.fbSV.info.uid) {
        setTimeout(() => { this.myChat.scrollToBottom(300)}, 500);
        const audio = new Audio('../../assets/sound.mp3');
        audio.play();
      }

      if (this.autoScroll) {
        setTimeout(() => { this.myChat.scrollToBottom(300) }, 500);
        this.autoScroll = false;
      }
    });
  }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Đang Lưu...',
      backdropDismiss: true
    });
    await this.loading.present();
  }
  scrollView(e) {
    if (e.detail.scrollTop === 0) {
      const ctime = this.chats[0].gomdon_ctime;
      this.showLoading();
      this.fbSV.loadMoreChat(ctime).then((data: any[]) => {
        if (data.length > 0) {
          this.chats = [...this.helper.sortArrObj(data.slice(1, data.length), 'gomdon_ctime', 'asc'), ...this.chats];
        }
        setTimeout(() => {
          this.loading.dismiss();
          const el: HTMLElement = document.getElementById(ctime.toString());
          el.scrollIntoView();
        }, 1000);
      });
    }
  }

  async send() {
    if (this.text !== '') {
      this.showLoading();
      await this.fbSV.setChat(this.text);
      this.text = '';
      this.loading.dismiss();
      this.myChat.scrollToBottom(300);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
