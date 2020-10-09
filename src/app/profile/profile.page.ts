import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Platform } from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Subscription } from "rxjs";
import { HelperService } from "../services/helper.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
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
  ) {}

  ngOnInit() {
    this.fbSV.user.subscribe((res) => {
      this.user = this.fbSV.info;
    });
    this.sub = this.route.queryParams.subscribe(async (params) => {
      // Defaults to 0 if no query param provided.
      if (params.role) {
        const obj = this.helper.roleSchema.find((x) => x.code === params.role);
        this.role = obj ? obj.name : "KHÔNG XÁC ĐỊNH";
        this.resetPass = true;
      }
      this.getUser();
    });
  }

  async getUser() {
    this.user = this.fbSV.info;
    const user = (await firebase.auth().currentUser.getIdTokenResult()).claims;
    const obj = this.helper.roleSchema.find((x) => x.code === user.role);
    this.role = obj ? obj.name : "KHÔNG XÁC ĐỊNH";
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  signIn() {
    this.fireAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.user = this.fbSV.info;
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async googleSignIn() {
    let params;
    if (this.platform.is("cordova")) {
      params = {
        webClientId:
          "527068162213-b6m21ahmuiu88c7fahd6bibrh7c8l8p8.apps.googleusercontent.com",
        offline: true,
      };
      this.google
        .login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        })
        .catch((error) => {
          alert("error:" + JSON.stringify(error));
        });
    } else {
      params = {};
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.fireAuth.auth.signInWithPopup(provider);
      this.user = this.fbSV.info;
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret
      ? firebase.auth.GoogleAuthProvider.credential(accessToken, accessSecret)
      : firebase.auth.GoogleAuthProvider.credential(accessToken);
    this.fireAuth.auth
      .signInWithCredential(credential)
      .then(async (response) => {
        this.user = this.fbSV.info;
      });
  }
  onLoginError(err) {}

  logOut() {
    this.google.logout();
    this.fireAuth.auth.signOut();
    this.fbSV.once = true;
  }
}
