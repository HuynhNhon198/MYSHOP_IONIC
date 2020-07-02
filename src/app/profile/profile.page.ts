import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  email: string;
  password: string;
  sub: Subscription;
  role: string;
  resetPass = false;
  user: any;
  constructor(
    public fbSV: FirebaseService,
    private platform: Platform,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.fbSV.user.subscribe(res => {
      this.user = res;
    });
    this.sub = this.route
      .queryParams
      .subscribe(async params => {
        // Defaults to 0 if no query param provided.
        if (params.role) {
          const obj = this.helper.roleSchema.find(x => x.code === params.role);
          this.role = obj ? obj.name : 'KHÔNG XÁC ĐỊNH';
          this.resetPass = true;
        }
        this.getUser();

      });
  }

  async getUser() {
    this.user = (await firebase.auth().currentUser.getIdTokenResult()).claims;
    const obj = this.helper.roleSchema.find(x => x.code === this.user.role);
    this.role = obj ? obj.name : 'KHÔNG XÁC ĐỊNH';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  signIn() {
    console.log(this.email, this.password);
    this.fireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('loged');
    }).catch(err => {
      alert(err.message);
    });
  }

  async googleSignIn() {
    let params;
    if (this.platform.is('cordova')) {
      params = {
        webClientId: '190650726823-d11ecvm1tcp65tsnup6f8nod1lbnafk6.apps.googleusercontent.com',
        offline: true
      };
      this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log(error);
          alert('error:' + JSON.stringify(error));
        });
    } else {
      params = {};
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.fireAuth.auth.signInWithPopup(provider);
    }

  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then(async (response) => {
      });

  }
  onLoginError(err) {
    console.log(err);
  }

  logOut() {
    this.google.logout();
    this.fireAuth.auth.signOut();
    this.fbSV.once = true;
  }
}
