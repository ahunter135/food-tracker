import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/stores/user';
import { UserProfilePage } from '../user-profile/user-profile';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  users = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private http: HttpProvider, public userData: UserProvider, public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.initializeUsers();
  }

  async initializeUsers() {
    this.users = [];
    let temp = await this.http.getUserAccounts();
    let keys = [];
    temp.forEach(function(item) {
      let itemVal = item.val();
      itemVal.uid = item.key;
      keys.push(itemVal);
    });
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].fullName !== 'Enter your name here' && keys[i].uid !== this.userData.user.uid) {
        let avatar = await this.http.getUserAvatar(keys[i].uid);
        keys[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
        this.users.push(keys[i]);
      }
    }
  }

  async getItems(ev) {
    await this.initializeUsers();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showUserProfile(user) {
    let userProfileModal = this.modalCtrl.create(UserProfilePage, {uid: user.uid});
    userProfileModal.present();
    userProfileModal.onDidDismiss(data => {

    });
  }

  onCancel() {
    console.log("HERE");
    this.viewCtrl.dismiss();
  }

}
