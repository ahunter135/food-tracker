import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

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

  animations: [

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('1500ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,1000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 1500ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {

  public userData = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider, private user: UserProvider) {
  }

  ionViewWillLeave() {
    this.user.store();
  }

  ionViewDidLeave() {
    console.log(this.user.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showSignUpModal() {
    const modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  }

  login() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.http.login(this.userData).then((data: any) => {
      this.loader.dismissLoader();
      this.user.setLoginFlag(true);
      this.user.set(data);
      this.navCtrl.setRoot(HomePage);
    })
    .catch(e => {
      this.loader.dismissLoader();
      alert(e.message);
    });
  }

  onKey(event: any, state) { // without type info
    if (state == 'user') {
      this.userData.email = event.target.value;
    } else if (state == 'pass') {
      this.userData.password = event.target.value;
    }
  }

}
