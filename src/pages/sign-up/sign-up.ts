import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { LoadProvider } from '../../providers/load/load';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  animations: [

    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('800ms 50ms ease-in', keyframes([
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
        animate('500ms 800ms ease-in')
      ])
    ])
  ]
})
export class SignUpPage {

  public user = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    passwordConf: ''
  }
  public disabled = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private http: HttpProvider, public loader: LoadProvider) {
  }

  ionViewDidLoad() {
  }

  submit() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.http.createAccount(this.user).then((data) => {
      if (data == 200) {
        this.loader.dismissLoader();
      } else {
        alert("Username already exists");
      }
    });
  }

  cancelModal() {
    this.viewCtrl.dismiss();
  }

  onKey(event: any, state) { // without type info
    if (state == 'user') {
      this.user.username = event.target.value;
    } else if (state == 'pass') {
      this.user.password = event.target.value;
    } else if (state == 'fullName') {
      this.user.fullName = event.target.value;
    } else if (state == 'email') {
      this.user.email = event.target.value;
    } else {
      this.user.passwordConf = event.target.value;
    }
    if ((this.user.username.length >= 5) && (this.user.fullName.length > 0) && (this.user.email.length > 0) && (this.user.password.length >= 6) && (this.user.passwordConf === this.user.password)) {
      this.disabled = false;
    }
  }

}
