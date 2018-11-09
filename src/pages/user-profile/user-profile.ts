import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ForumProvider } from '../../providers/stores/forum';
import { LoadProvider } from '../../providers/load/load';
import { UserProvider } from '../../providers/stores/user';
import { ChatPage } from '../chat/chat';
import { ChatProvider } from '../../providers/chat/chat';
import { CommentsPage } from '../comments/comments';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  uid = null;
  user = {
    fullName: '',
    myStory: '',
    avatar_image: null,
    uid: '',
    token: null
  };
  posts = [];
  chosenPicture = null;
  connected = false;
  connectionCount = 0;
  connectionKey = null;
  toggled = false;
  searchbarValue = null;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private http: HttpProvider, public forum: ForumProvider, public loader: LoadProvider, public userData: UserProvider, public modalCtrl: ModalController, public chatService: ChatProvider) {
   this.uid = navParams.get('uid');
  }

  async ionViewWillLoad() {
    this.loader.createLoader();
    this.loader.presentLoader();
    let data = await this.http.getOtherUserData(this.uid);
    
    this.user = data.val();
    console.log(this.user);
    for (let i = 0; i < this.userData.connections.length; i++) {
      if (this.userData.connections[i].uid === this.user.uid) {
        if (this.userData.connections[i].accepted === true || this.userData.connections[i].accepted === undefined) {
          this.connected = true;
        }
      }
    }
    let avatar = await this.http.getUserAvatar(this.uid);
    this.chosenPicture = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
      
    this.getPosts();
    this.loadConnectionData();
  }

  async loadConnectionData() {
    this.connectionCount = 0;
    let connection = await this.http.getOtherUserConnectionData(this.uid);
    for (let key in connection.val()) {
      this.connectionCount++;
      this.connectionKey = key;
    }
  }


  getPosts() {
    this.posts = [];
    for (let i = 0; i < this.forum.posts.length; i++) {
      if (this.forum.posts[i].uid === this.uid) {
        this.posts.push(this.forum.posts[i]);
      }
    }
    this.loader.dismissLoader();
  }

  sendMessage() {
    this.chatService.currentChatPairId = this.chatService.createPairId(this.user, this.userData);
    this.chatService.currentChatPartner = this.userData;
    const chatModal = this.modalCtrl.create(ChatPage);
    chatModal.present();
    chatModal.onDidDismiss(data => {
      
    });
  }
 
  async addAsConnection() {
    this.loader.createLoader();
    this.loader.presentLoader();
    if (!this.connected) {
      //this.http.sendConnectionNotification(this.userData.token);
      await this.http.addConnectionRequest(this.uid, this.userData.user);
      this.connected = true;
    } else {
      await this.http.removeConnectionRequest(this.uid, this.connectionKey);
      this.connected = false;
    }
    this.loadConnectionData();
    this.loader.dismissLoader();
  }

  async likePost(post) {
    this.loader.createLoader();
    this.loader.presentLoader();
    let likes = await this.forum.getPostLikes();
    if (likes === null) {
      post.likes++;
      await this.http.updatePostLikes(post, this.userData.user.uid, false);
    } else {
      let liked = false;
      for (let i = 0; i < likes.length; i++) {
        for (let postKey in likes[i]) {
          if (postKey === post.key) {
            liked = likes[i][postKey].liked;
            if (liked) {
              post.likes--;
            } else {
              post.likes++;
            }
            break;
          }
        }
      }
      await this.http.updatePostLikes(post, this.userData.user.uid, liked);
    }
    await this.getPosts(); 
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  seeComments(post) {
    let commentsModal = this.modalCtrl.create(CommentsPage, {post: post});
    commentsModal.present();
    commentsModal.onDidDismiss(data => {
      
    });
  }

}
