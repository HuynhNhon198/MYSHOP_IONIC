import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IPick } from '../picks/models/pick.model';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Sell } from 'src/openapi';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: Observable<firebase.User>;
  once = true;
  picks: AngularFirestoreCollection<IPick>;
  orders: AngularFirestoreCollection<Sell>;
  constructor(
    private afu: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = afu.authState.pipe(
      switchMap(user => {
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

  getOrders() {
    this.orders = this.afs.collection('sells', ref => ref.where('gomdon_status', '<=', 4));
    return this.orders.valueChanges();
  }

  async getUID() {
    let uid = '';
    await this.user.subscribe(res => {
      uid = res.uid;
    });
    console.log(uid);
    return uid;
  }

}
