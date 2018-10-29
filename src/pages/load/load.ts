import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController } from 'ionic-angular';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { LoginPage } from '../login/login';

import firebase from "firebase";

import { LoadProvider } from '../../providers/load/load';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/stores/user';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  purchases = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private events: Events, public viewCtrl: ViewController, private http: HttpProvider, public user: UserProvider) {
  }

  async ionViewWillLoad() {
    this.loader.createLoader();
    this.loader.presentLoader();
  }

  ionViewDidLoad() {
    this.doInitialSetup();
  }

  async doInitialSetup() {
    this.http.ref = await firebase.database().ref('user-accounts/');
    this.events.subscribe('user:set', (user) => {
      this.user.user = user;
      this.navCtrl.setRoot(LoginPage);
    });
    this.events.subscribe('user:not-set', (user) => {
      this.user.user = user;
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
