import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { LoadProvider } from '../../providers/load/load';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  purchases = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private events: Events) {
  }

  ionViewDidLoad() {
    this.loader.createLoader();
    this.loader.presentLoader();

    this.iap.restorePurchases()
      .then((result) => {
        //set purchased flag here
        if (result.length > 0) this.events.publish('user:purchased', true);
        else this.events.publish('user:purchased', false);
        this.doInitialSetup();
      })
      .catch((err) => {
        console.log(err);
        this.doInitialSetup();
      });
  }

  async doInitialSetup() {
    this.events.subscribe('user:set', (user) => {
      if (user.emailVerified) this.navCtrl.setRoot(HomePage);
      else this.navCtrl.setRoot(LoginPage);

    });
    this.events.subscribe('user:not-set', (user) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
