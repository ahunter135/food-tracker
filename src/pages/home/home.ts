import firebase from 'firebase';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController, Events } from 'ionic-angular';

import { UserProvider } from '../../providers/stores/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = null;
  eventsList = [{
    year: 2018,
    month: 8,
    date: 26
  }];

  ref = firebase.database().ref('user-accounts/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public modalCtrl: ModalController, private userData: UserProvider) {
  }

  ionViewWillLoad() {
    this.user = this.userData.user;
    this.events.publish('user:created', this.user.user.email);
  }

  onDaySelect(event) {

  }

}
