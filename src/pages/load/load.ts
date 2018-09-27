import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private storage: Storage, private user: UserProvider) {
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

  ionViewDidLeave() {
    this.loader.dismissLoader();
  }

  async doInitialSetup() {
    let value = await this.storage.get('LoggedIn');
    if (value == true) {
      await this.user.load();
      this.navCtrl.setRoot(HomePage);
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
