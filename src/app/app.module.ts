import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdMob } from '@admob-plus/ionic/ngx';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
  authDomain: "foodtracker-8cd65.firebaseapp.com",
  databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
  projectId: "foodtracker-8cd65",
  storageBucket: "gs://foodtracker-8cd65.appspot.com",
  messagingSenderId: "1074520532115"
});
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMob,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
