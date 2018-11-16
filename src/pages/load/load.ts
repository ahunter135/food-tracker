import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController, ModalController } from 'ionic-angular';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { LoginPage } from '../login/login';

import firebase from "firebase";

import { LoadProvider } from '../../providers/load/load';
import { HttpProvider } from '../../providers/http/http';
import { UserProvider } from '../../providers/stores/user';
import { ForumProvider } from '../../providers/stores/forum';
import { HomePage } from '../home/home';
import { ChatlistPage } from '../chatlist/chatlist';
import { ChatPage } from '../chat/chat';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  purchases = null;
  loadProgress = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: LoadProvider, private iap: InAppPurchase, private events: Events, public viewCtrl: ViewController, private http: HttpProvider, public user: UserProvider, public forum: ForumProvider, public modalCtrl: ModalController, public chatService: ChatProvider) {
  }

  async ionViewWillLoad() {
  }

  ionViewDidLoad() {
    this.doInitialSetup();
  }

  async loadForum() {
    this.events.subscribe('forum:load', async (forum) => {
      let dataArray = await this.forum.convertDataToArray(forum);
      await this.forum.setPosts(dataArray);
    });
  }

  async getUserConnections() {
    this.events.subscribe('connections:load', async (connections) => {
      let keys = [];

      connections.forEach(function(item) {
        let itemVal = item.val();
        itemVal.key = item.key;
        keys.push(itemVal);
      });
      
      this.user.connections = (keys.length === 0 ? [] : keys);
    });
  }

  async freeWeekend() {
    this.events.subscribe('free:weekend', async (flag) => {
      this.user.freeWeekend = flag.val();
    });
  }

  async chatData() {
    this.events.subscribe('chats:data', async(chatsID) => {
      for (let i = 0; i < chatsID.length; i++) {
        let userInfo = await this.http.getOtherUserData((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid));
        let userAvatar = await this.http.getUserAvatar((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid));
        let chat = {
          fullName: userInfo.val().fullName,
          avatar_image: userAvatar.val().avatar_image,
          uid: ((chatsID[i].receiver.uid !== this.user.user.uid ? chatsID[i].receiver.uid : chatsID[i].sender.uid)),
          token: userInfo.val().token,
          email: userInfo.val().email,
          message: chatsID[i].message,
          pair: chatsID[i].pair,
          time: chatsID[i].time
        };
        this.user.chats.push(chat);
        if (this.user.chatUsers.indexOf(chat.uid) === -1) this.user.chatUsers.push(chat.uid);
      }
    });
  }

  async loadUserData(user) {
    this.user.user = user;
    this.http.getForumData();
    this.loadForum();
    this.loadProgress += 20;
    
    this.http.getFreeWeekend();
    this.freeWeekend();
    
    this.http.getUserConnections();
    this.getUserConnections();
    this.loadProgress += 20;
    
    let avatar = await this.http.getUserAvatar(this.user.user.uid);
    this.loadProgress += 20;
    
    this.user.avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : "https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b");
    this.events.publish('user:avatar', this.user.avatar_image);

    this.events.publish('user:created', this.user.user.email);

    let temp = await this.http.getUserData();
    this.loadProgress += 20;

    this.user.items = (temp.val().items === undefined ? [] : temp.val().items);
    this.user.entries = (temp.val().entries === undefined ? [] : temp.val().entries);
    this.user.fullName = temp.val().fullName;
    this.user.myStory = temp.val().myStory;
    this.user.role = temp.val().role;
    this.user.email = this.user.user.email;

    this.chatData();

    this.http.getUserChats();
    this.loadProgress += 20;
    
    return;
  }

  async doInitialSetup() {
    this.events.subscribe('user:set', async (user) => {
      await this.loadUserData(user);
      console.log("User Found");
      let percentLeft = 100 - this.loadProgress;
      if (this.loadProgress < 100) this.loadProgress += percentLeft;
      if (user.emailVerified) {
        if (this.user.notifications.clicked && this.user.notifications.content.uid) {
          this.chatService.currentChatPairId = this.chatService.createPairId(this.user, this.user.notifications.content);
          console.log(this.chatService.currentChatPairId);
          this.chatService.currentChatPartner = this.user.notifications.content;
          const chatModal = this.modalCtrl.create(ChatPage);
          chatModal.present();
          chatModal.onDidDismiss(data => {
            
          });
        } else {
          this.navCtrl.setRoot(HomePage);
        }
      }
      else this.navCtrl.setRoot(LoginPage);
    });
    this.events.subscribe('user:not-set', (user) => {
      console.log("User NOT Found");
      this.loadProgress = 100;
      this.user.user = user;
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
