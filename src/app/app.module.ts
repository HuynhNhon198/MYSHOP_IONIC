import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from '../environments/environment.prod';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { DetailPickPage } from './picks/detail-pick/detail-pick.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, Configuration, ConfigurationParameters } from 'src/openapi';
import { DetailOrderPage } from './orders/detail-order/detail-order.page';
import { StatusPipe } from './pipes/app.status';

export function apiConfigFactory(): Configuration {
  // tslint:disable-next-line: prefer-const
  // AuthService.getToken().then(token => {
  //   console.log(token);
  // });
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    basePath: 'https://us-central1-gomdon-74d1a.cloudfunctions.net/api',
  };
  return new Configuration(params);
}

@NgModule({ 
  declarations: [AppComponent, DetailPickPage, DetailOrderPage, StatusPipe],
  entryComponents: [
    DetailPickPage,
    DetailOrderPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
  ],
  providers: [
    Clipboard,
    StatusBar,
    SplashScreen,
    GooglePlus,
    AngularFireAuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
