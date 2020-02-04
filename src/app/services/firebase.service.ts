import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IPick } from '../picks/models/pick.model';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Sell } from 'src/openapi';
import { IChat } from '../chats/chat.model';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: Observable<firebase.User>;
  info: firebase.User;
  once = true;
  picks: AngularFirestoreCollection<IPick>;
  orders: AngularFirestoreCollection<Sell>;
  chatCol: AngularFirestoreCollection<IChat>;
  constructor(
    private afu: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user = afu.authState.pipe(
      switchMap(user => {
        this.info = user;
        if (user !== null) {
          if (this.once) {
            router.navigate(['/tabs/profile']);
            this.once = false;
          }
          return of(user);
        } else {
          router.navigate(['/profile']);
          return of(undefined);
        }
      }));
  }

  async getPicks() {
    const uid = await this.getUID();
    this.picks = this.afs.collection('pick_models', ref => ref.where('uid', '==', uid));
    return this.picks.valueChanges();
  }

  getChats(): Promise<Observable<(IChat & { gomdon_id: string })[]>> {
    return new Promise(r => {
      this.chatCol = this.afs.collection('chats', ref => ref.orderBy('gomdon_ctime', 'desc').limit(20));
      r(this.chatCol.valueChanges({ idField: 'gomdon_id' }));
    });
  }

  getOrders() {
    this.orders = this.afs.collection('sells', ref => ref.where('gomdon_status', '==', 1));
    return this.orders.valueChanges();
  }

  async updateSell(id: string, data: any) {
    await this.afs.collection('sells').doc(id).update(data);
  }

  getMiliSec(date?: Date) {
    const d = date ? (new Date(date)).getTime() : (new Date()).getTime();
    // tslint:disable-next-line: no-bitwise
    return (d / 1000) >> 0;
  }

  async setChat(content: string) {
    const user = this.info;
    await this.afs.collection('chats').doc(this.afs.createId()).set({
      content,
      from: {
        name: user.displayName,
        uid: user.uid
      },
      gomdon_ctime: this.getMiliSec()
    } as IChat);
  }

  loadMoreChat(startAtCtime: number) {
    return new Promise(r => {
      firebase.firestore().collection('chats').orderBy('gomdon_ctime', 'desc').startAt(startAtCtime).limit(10).get().then(docs => {
        const datas = [];
        docs.forEach(doc => {
          const obj = doc.data();
          obj.id = doc.id;
          datas.push(obj);
        });
        r(datas);
      });
    });
  }

  async getUID() {
    let uid = '';
    await this.user.subscribe(res => {
      uid = res.uid;
    });
    return uid;
  }

}
