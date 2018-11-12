import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ForumProvider } from '../../providers/stores/forum';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UserProvider } from '../../providers/stores/user';
import { UUID } from 'angular2-uuid';
import moment from 'moment';
import { CommentsPage } from '../comments/comments';
import { UserProfilePage } from '../user-profile/user-profile';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-public-forum',
  templateUrl: 'public-forum.html',
})
export class PublicForumPage {
  posts = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public forum: ForumProvider, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider, public user: UserProvider) {
  }
  
  async ionViewDidEnter() {
    this.posts = this.forum.posts;
    
    this.configurePosts();
  }

  async addPost() {
    let addPostModal = this.modalCtrl.create(AddPost);
    addPostModal.present();
    addPostModal.onDidDismiss(async data => {
      this.posts = this.forum.posts;
      this.configurePosts();
    });
  }

  configurePosts() {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].comments === undefined) this.posts[i].comment_amount = 0;
      else this.posts[i].comment_amount = this.posts[i].comments.length;
    }
    this.loader.dismissLoader();
  }

  async likePost(post) {
    this.loader.createLoader();
    this.loader.presentLoader();
    let likes = await this.forum.getPostLikes();
    if (likes === null) {
      post.likes++;
      await this.http.updatePostLikes(post, this.user.user.uid, false);
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
      await this.http.updatePostLikes(post, this.user.user.uid, liked);
    }
    await this.configurePosts(); 
  }

  async addComment(post) {
    let commentsModal = this.modalCtrl.create(CommentsPage, {post: post});
    commentsModal.present();
    commentsModal.onDidDismiss(async data => {
      
    });
  }

  async doRefresh(refresher) {
    this.posts = this.forum.posts;
    this.configurePosts();
    refresher.complete();
  }

  showUserProfile(post) {
   if (post.uid !== this.user.user.uid) {
    let userProfileModal = this.modalCtrl.create(UserProfilePage, {uid: post.uid});
    userProfileModal.present();
    userProfileModal.onDidDismiss(data => {});
   } else {
    this.navCtrl.parent.select(1);
   }
  }
}



@Component({
  selector: 'add-post',
  templateUrl: 'addPost.html'
})
export class AddPost {

  entry = {
    id: '',
    avatar_image: (this.user.avatar_image ? this.user.avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b'),
    user_name: this.user.fullName,
    uid: '',
    text: '',
    comments: [],
    likes: 0,
    posted: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
 constructor(public viewCtrl: ViewController, private http: HttpProvider, public loader: LoadProvider, public user: UserProvider,public nativeAudio: NativeAudio) {
 }

 async submit() {
  this.nativeAudio.play('post', () => console.log('uniqueId1 is done playing'));
   this.entry.id = UUID.UUID();
   this.entry.uid = this.user.user.uid;
   this.loader.createLoader();
   this.loader.presentLoader();
   await this.http.postForumPost(this.entry);
   this.viewCtrl.dismiss();
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }
}
