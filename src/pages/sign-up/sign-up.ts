import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { LoadProvider } from '../../providers/load/load';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';


import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  public user = {
    email: '',
    password: '',
    passwordConf: ''
  }
  public disabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private http: HttpProvider, public loader: LoadProvider, private storage: Storage) {
  }

  async submit() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.http.createAccount(this.user).then((data) => {
      this.http.createUser(this.user.email, data.user.uid);
      this.http.sendEmailValidation();
      this.viewCtrl.dismiss(data);
    })
    .catch(e => {
      this.loader.dismissLoader();
      alert(e.message);
    })
  }

  cancelModal() {
    this.viewCtrl.dismiss();
  }

  onKey(event: any, state) { 
    if (state == 'pass') {
      this.user.password = event.target.value;
    } else if (state == 'email') {
      this.user.email = event.target.value;
    } else {
      this.user.passwordConf = event.target.value;
    }
    if ((this.user.email.length > 0) && (this.user.password.length >= 6) && (this.user.passwordConf === this.user.password)) {
      this.disabled = false;
    }
  }

}
