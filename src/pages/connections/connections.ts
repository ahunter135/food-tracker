import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UserProfilePage } from '../user-profile/user-profile';

/**
 * Generated class for the ConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {

  connections = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public user: UserProvider, private http: HttpProvider, public loader: LoadProvider, public modalCtrl: ModalController) {
  }

  async ionViewWillEnter() {
    for (let i = 0; i < this.user.connections.length; i++) {
      if (this.user.connections[i].accepted || this.user.connections[i].accepted === undefined) {
        let avatar = await this.http.getUserAvatar(this.user.connections[i].connectionUID);
        this.user.connections[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
        this.connections.push(this.user.connections[i]);
      }
    }
  }

  async acceptConnectionRequest(connection) {
    this.loader.createLoader();
    this.loader.presentLoader();
    connection.accepted = true;
    delete connection.avatar_image;
    await this.http.replyToConnectionRequest(connection);
    this.loader.dismissLoader();
  }

  async denyConnectionRequest(connection) {
    this.loader.createLoader();
    this.loader.presentLoader();
    connection.accepted = false;
    delete connection.avatar_image;
    await this.http.replyToConnectionRequest(connection);
    let index = this.connections.indexOf(connection);
    this.connections.splice(index, 1);
    this.loader.dismissLoader();
  }

  showUserProfile(connection) {
    if (connection.connectionUID !== this.user.user.uid) {
     let userProfileModal = this.modalCtrl.create(UserProfilePage, {uid: connection.connectionUID});
     userProfileModal.present();
     userProfileModal.onDidDismiss(data => {});
    } else {
     this.navCtrl.parent.select(1);
    }
   }
}
