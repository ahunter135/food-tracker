import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/stores/user';
import { ChatPage } from '../chat/chat';
import { LoadProvider } from '../../providers/load/load';

/**
 * Generated class for the ChatlistpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {
  chats;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider, private chatService: ChatProvider, public modalCtrl: ModalController, public user: UserProvider, public loader: LoadProvider) {
  }

  async ionViewWillEnter() {
    this.chats = [];
    for (let i = 0; i < this.user.chatUsers.length; i++) {
      for (let j = 0; j < this.user.chats.length; j++) {
        if (this.user.chats[j].uid === this.user.chatUsers[i]) {
          this.user.chats[j].time = new Date(this.user.chats[j].time).toLocaleTimeString();
          this.chats.push(this.user.chats[j]);
          break;
        }
      }
    }
  }

  sendMessage(chat) {
    this.chatService.currentChatPairId = this.chatService.createPairId(this.user, chat);
    this.chatService.currentChatPartner = chat;
    const chatModal = this.modalCtrl.create(ChatPage);
    chatModal.present();
    chatModal.onDidDismiss(data => {
      
    });
  }

}
