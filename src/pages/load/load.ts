import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { LoadProvider } from '../../providers/load/load';
import { UserProvider } from '../../providers/stores/user';

/**
 * Generated class for the LoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  purchases = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private storage: Storage, private user: UserProvider, private events: Events) {
  }

  ionViewDidLoad() {
    this.loader.createLoader();
    this.loader.presentLoader();

    this.iap.restorePurchases()
      .then((result) => {
        //set purchased flag here
        this.purchases = result;
        this.doInitialSetup();
      })
      .catch((err) => {
        this.doInitialSetup();
      });
  }

  async doInitialSetup() {
    this.events.subscribe('user:set', (user) => {
      this.navCtrl.setRoot(HomePage);
    });
    this.events.subscribe('user:not-set', (user) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
