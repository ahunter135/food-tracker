import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Keyboard } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/stores/user';
import firebase from 'firebase';
import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  chats = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser = this.user;
  invertedChatPairId = this.chatuser.email+'|'+this.chatpartner.email;
  message;
  chatPayload;
  intervalScroll;
  @ViewChild("content") content: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatProvider, public user: UserProvider, public viewCtrl: ViewController, public nativeAudio: NativeAudio, public keyboard: Keyboard) {
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLoad() {
    this.updateChats();
  }

  updateChats() {
    let self = this;
    firebase.firestore().collection('chats').where("pair", "==", this.chatService.currentChatPairId).onSnapshot(function(querySnapshot) {
      self.chats = [];
      querySnapshot.forEach(function(doc) {
        self.chats.push(doc.data());
      });
      console.log(self.chats);
      self.content.scrollToBottom(300);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addChat() {
    let receiver = this.chatpartner;
    let sender = {
      fullName: this.chatuser.fullName,
      avatar_image: this.chatuser.avatar_image,
      email: this.chatuser.email,
      token: this.chatuser.token,
      uid: this.chatuser.user.uid
    }

    if (this.message && this.message !== "") {
      this.chatPayload = {
        message: this.message,
        sender: sender,
        receiver: receiver,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };
      this.message = "";

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          this.nativeAudio.play('message', () => console.log('uniqueId1 is done playing'));
        })
        .catch(err => {
          //Clear message box
          this.message = this.chatPayload.message;
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  }

  checkKeyboard() {
    if (this.keyboard.isOpen()) {
      this.content.scrollToBottom(300);
    }
  }

}
