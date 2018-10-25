import firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoadPage } from '../pages/load/load';
import { ItemsPage } from '../pages/items/items';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';

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
    email: null,
    purchased: null
  };

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM, public events: Events, private storage: Storage, private userData: UserProvider) {
    firebase.initializeApp({
        apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
        authDomain: "foodtracker-8cd65.firebaseapp.com",
        databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
        projectId: "foodtracker-8cd65",
        storageBucket: "gs://foodtracker-8cd65.appspot.com",
        messagingSenderId: "1074520532115"
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        userData.set();
        events.publish('user:set', user);
      } else {
        // No user is signed in.
        userData.clear();
        events.publish('user:not-set', false);
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'Food Items', component: ItemsPage, icon: 'ios-pizza'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need

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
      this.events.subscribe('user:purchased', (flag) => {
        this.user.purchased = flag
      });

      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }

  goToSocial() {
    
  }

  logout() {
    firebase.auth().signOut().then(function() {
      this.navCtrl.setRoot(LoginPage);
    }).catch(function(error) {
    });
  }
}
