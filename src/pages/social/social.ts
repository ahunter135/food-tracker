import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PublicForumPage } from '../public-forum/public-forum';
import { ForumProvider } from '../../providers/stores/forum';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { Storage } from '@ionic/storage';
import { RateServiceProvider } from '../../providers/rate-service/rate-service';
import { ChatlistPage } from '../chatlist/chatlist';

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
      <ion-tab tabIcon="ios-contacts" [root]="chatsPage"></ion-tab>
    </ion-tabs>
`})
export class SocialPage {
  rootPage = ProfilePage;
  chatPage = PublicForumPage;
  chatsPage = ChatlistPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private forum: ForumProvider, private http: HttpProvider, public loader: LoadProvider, private storage: Storage, public rateService: RateServiceProvider) {
  }

  async ionViewWillLoad() {
    if (this.loader.isLoading) this.loader.dismissLoader();
  }

  async ionViewDidLoad() {
    let data = await this.storage.get('user-reviewed');
    if (!data || data === null) {
      this.rateService.promptForRating(false);
    }
  }

}
