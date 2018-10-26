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

    this.doInitialSetup();
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
