import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';

import { LoadProvider } from '../../providers/load/load';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.iap.restorePurchases()
      .then((result) => {
        //set purchased flag here
        this.purchases = result;
        this.doInitialSetup().then((result) => {
          this.navCtrl.setRoot(result.toString());
        });
      })
      .catch((err) => {
        this.loader.dismissLoader();
      });
  }

  ionViewDidLeave() {
    this.loader.dismissLoader();
  }

  doInitialSetup() {
    let page = null;

    let promise = new Promise((resolve, reject) => {
      this.storage.get('LoggedIn').then((val) => {
        if (val == true) {
          page = 'HomePage';
        } else {
          page = 'LoginPage';
        }

        resolve(page);
      });
    })

    return promise;
  }
}
