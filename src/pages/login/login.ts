import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UserProvider } from '../../providers/stores/user';
import firebase from 'firebase';

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

  emailVerified = true;

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider, private user: UserProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    if (this.user.user) {
      if (this.user.user.emailVerified) {
        this.loader.dismissLoader();
        this.navCtrl.setRoot(HomePage)
      } else {
        this.emailVerified = false;
        this.loader.dismissLoader();
      }
    } else {
      this.loader.dismissLoader();
    }
  }

  showSignUpModal() {
    const modal = this.modalCtrl.create(SignUpPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) alert("Email verification sent");
    });
  }

  showForgotPasswordModal() {
    const resetModal = this.modalCtrl.create(ResetPassword);
    resetModal.present();
    resetModal.onDidDismiss(data => {
      
    });
  }

  login() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    loading.present();
    this.http.login(this.userData).then((data: any) => {
      if (data.emailVerified) {
        this.user.set();
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      } else {
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

@Component({
  selector: 'reset-password',
  templateUrl: 'resetPassword.html'
})
export class ResetPassword {
 userData = {
   email: ''
 }
 constructor(public viewCtrl: ViewController, params: NavParams) {

 }

 async submit() {
   await firebase.auth().sendPasswordResetEmail(this.userData.email);
   alert("Please check email to reset password");
   this.dismiss();
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

 onKey(event: any, state) { 
  if (state == 'user') {
    this.userData.email = event.target.value;
  }
}

}
