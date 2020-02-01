import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;
  password: string;
  constructor(
    public fbSV: FirebaseService,
    private platform: Platform,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  signIn() {
    console.log(this.email, this.password);
    this.fireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('loged');
    })
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
      .then((response) => {
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
