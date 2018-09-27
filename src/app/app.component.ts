import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoadPage } from '../pages/load/load';

import { UserProvider } from '../providers/stores/user';

import { FCM } from '@ionic-native/fcm';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadPage;

  pages: Array<{title: string, component: any, icon: string}>;

  user = {
    email: null
  };

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM, public events: Events, private storage: Storage, private userData: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();

      firebase.initializeApp({
          apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
          authDomain: "foodtracker-8cd65.firebaseapp.com",
          databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
          projectId: "foodtracker-8cd65",
          storageBucket: "gs://foodtracker-8cd65.appspot.com",
          messagingSenderId: "1074520532115"
      });

      this.fcm.getToken().then(token => {
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      this.events.subscribe('user:created', (email) => {
        this.user.email = email;
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
