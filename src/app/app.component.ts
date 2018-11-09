import firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoadPage } from '../pages/load/load';
import { ItemsPage } from '../pages/items/items';
import { SocialPage } from '../pages/social/social';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Crashlytics, Answers } from '@ionic-native/fabric';
import { UserProvider } from '../providers/stores/user';

import { FCM } from '@ionic-native/fcm';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../providers/http/http';
import { LoadProvider } from '../providers/load/load';
import { NativeAudio } from '@ionic-native/native-audio';
import { FirebaseConfig } from '@ionic-native/firebase-config';

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
  freeSub = false;
  chosenPicture = null;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM, public events: Events, private storage: Storage, private userData: UserProvider, public iap: InAppPurchase, private http: HttpProvider, public loader: LoadProvider, public alertCtrl: AlertController, private crashlytics: Crashlytics, private answers: Answers, private nativeAudio: NativeAudio, private firebaseConfig: FirebaseConfig) {
    firebase.initializeApp({
        apiKey: "AIzaSyCLOlz7uQrEC-HutG9MILNsgMtFE5CyOyU",
        authDomain: "foodtracker-8cd65.firebaseapp.com",
        databaseURL: "https://foodtracker-8cd65.firebaseio.com/",
        projectId: "foodtracker-8cd65",
        storageBucket: "gs://foodtracker-8cd65.appspot.com",
        messagingSenderId: "1074520532115"
    });
    

    http.databaseRef = firebase.database(); 
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        crashlytics.setUserIdentifier(user.uid);
        events.publish('user:set', user);
      } else {
        // No user is signed in.
        events.publish('user:not-set', null);
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
        this.userData.token = token;
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          this.userData.notifications.clicked = true;
          this.userData.notifications.content = JSON.parse(data.content);
        } else {
          console.log("Received in foreground");
        };
      });
      this.nativeAudio.preloadSimple('message', 'assets/sounds/message.mp3').catch(err => console.log());
      this.nativeAudio.preloadSimple('post', 'assets/sounds/message.mp3').catch(err => console.log);


      this.events.subscribe('user:created', (email) => {
        this.user.email = email;
      });
      this.events.subscribe('user:purchased', (flag) => {
        this.user.purchased = flag
      });
      this.events.subscribe('user:avatar', (avatar) => {
        this.chosenPicture = avatar;
      });

      /*
      this.firebaseConfig.getBoolean('free_subscription')
      .then((res: any) => {
        if (res) this.freeSub = true;
      })
      .catch((error: any) => console.error(error));
*/
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  async goToSocial() {
    this.answers.sendCustomEvent("Subscription Clicked");
    this.loader.createLoader();
    this.loader.presentLoader();
    let alert = this.alertCtrl.create({
      title: 'Social Subscription',
      subTitle: 'The social side of Chronic Badass allows you to make a profile and post to the message board. You can like and comment on other people\'s posts and will be the main focus of Chronic Badass! There is a 7 day free trial to get your feet wet, but we know you\'ll love it!',
      buttons: [{
        text: 'Got It',
        handler: () => {
          this.offerPurchase(iap, purchased, this.loader);
        }
      }]
    });
    let iap = new InAppPurchase;
    let purchased = false;
    let subscribed = false;
    if (this.userData.user.role === 1) {
      await iap.restorePurchases()
      .then(function(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].productId === 'com.ionicframework.tracker210235.upgrade') {
            purchased = true;
            break;
          }
          if (data[i].productId === 'com.ionicframework.tracker210235.social_subscription' || data[i].productId === 'com.ionicframework.tracker210235.social_subscription_2') {
            let receipt = JSON.parse(data[i].receipt);
            if (receipt.purchaseState === 0) {
              subscribed = true;
            }
          }
        }
      }).catch(function (err) {
        console.log(err);
        this.loader.dismissLoader();
      });
      if (!subscribed) alert.present();
      else this.nav.setRoot(SocialPage);
    } else {
      this.nav.setRoot(SocialPage);
    }
  }

  async offerPurchase(iap, purchased, loader) {
      let failed = false;
      await iap.getProducts(['com.ionicframework.tracker210235.social_subscription', 'com.ionicframework.tracker210235.social_subscription_2'])
      .then(async function (products) {
        if (purchased) {
          await iap.subscribe('com.ionicframework.tracker210235.social_subscription')
          .then(function() {
            this.answers.sendPurchase({
              itemPrice: products[0].price,
              currency: products[0].currency, 
              itemName: products[0].title,
              itemId: products[0].productId
            })
          })
          .catch(function (err) {
            console.log(err);
            failed = true;
            loader.dismissLoader();
          })
        } else {
          await iap.subscribe('com.ionicframework.tracker210235.social_subscription_2')
          .then(function() {
            this.answers.sendPurchase({
              itemPrice: products[1].price,
              currency: products[1].currency, 
              itemName: products[1].title,
              itemId: products[1].productId
            })
          })
          .catch(function (err) {
            console.log(err);
            failed = true;
            loader.dismissLoader();
          })
        }
      })
      .catch(function (err) {
        console.log(err);
        failed = true;
        loader.dismissLoader();
      });

      if (!failed) {
        this.nav.setRoot(SocialPage);
      }
  }

  logout() {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    });
  }
}
