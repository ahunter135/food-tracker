import firebase from 'firebase';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = null;
  showEdit = false;
  profile = {
    fullName: '',
    myStory: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public userData: UserProvider, private http: HttpProvider) {
  }

  ionViewWillLoad() {
   this.user = this.userData.user;
   console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  submitEdit() {
    this.userData.user.fullName = (this.profile.fullName === '' ? this.userData.user.fullName : this.profile.fullName);
    this.userData.user.myStory = (this.profile.myStory === '' ? this.userData.user.myStory : this.profile.myStory);
    this.http.updateUser();
    this.showEdit = false;
  }

  selectAvatar() {
    
  }

}
