import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UserProvider } from '../../providers/stores/user';


import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public userData = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider, private user: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.loader.dismissLoader();
  }

  showSignUpModal() {
    const modal = this.modalCtrl.create(SignUpPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) alert("Email verification sent");
    });
  }

  login() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.http.login(this.userData).then((data: any) => {
      if (data.user.emailVerified) {
        this.user.set();
        this.navCtrl.setRoot(HomePage);
      } else {
        this.loader.dismissLoader();
        alert("Please verify email before logging in");
      }
    })
    .catch(e => {
      this.loader.dismissLoader();
      alert(e.message);
    });
  }

  onKey(event: any, state) { 
    if (state == 'user') {
      this.userData.email = event.target.value;
    } else if (state == 'pass') {
      this.userData.password = event.target.value;
    }
  }

}
