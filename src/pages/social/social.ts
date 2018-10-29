import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PublicForumPage } from '../public-forum/public-forum';
import { ConnectionsPage } from '../connections/connections';
/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-social',
  template: `
    <ion-tabs class="tabs-basic" selectedIndex="1">
      <ion-tab tabIcon="ios-chatbubbles" [root]="chatPage"></ion-tab>
      <ion-tab tabIcon="ios-person" [root]="rootPage"></ion-tab>
      <ion-tab tabIcon="ios-contacts" [root]="connectionPage"></ion-tab>
    </ion-tabs>
`})
export class SocialPage {
  rootPage = ProfilePage;
  chatPage = PublicForumPage;
  connectionPage = ConnectionsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
