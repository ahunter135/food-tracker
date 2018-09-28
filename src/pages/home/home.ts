import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController, Events } from 'ionic-angular';

import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = null;
  data = null;
  isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public modalCtrl: ModalController, private userData: UserProvider, private http: HttpProvider, public loader: LoadProvider) {
  }

  ionViewWillLoad() {
    this.user = this.userData.user;
    this.events.publish('user:created', this.user.email);
  }

  async ionViewDidLoad() {
    let temp = await this.http.getUserData();
    this.data = temp.val();
    this.loader.dismissLoader();
    this.isLoading = false;
    console.log(this.data.entries.length);
  }

  onDaySelect(event) {

  }

}
