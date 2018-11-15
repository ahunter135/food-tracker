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
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-public-forum',
  templateUrl: 'public-forum.html',
})
export class PublicForumPage {
  entry = {
    id: '',
    avatar_image: (this.user.avatar_image ? this.user.avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b'),
    user_name: this.user.fullName,
    uid: '',
    text: '',
    comments: [],
    likes: 0,
    image: null,
    posted: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
  liked = false;
  uploadedImage = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public forum: ForumProvider, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider, public user: UserProvider, public nativeAudio: NativeAudio) {
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
          if (postKey === post.key && likes[i].key === this.user.user.uid) {
            liked = likes[i][postKey].liked;
            break;
          }
        }
      }
      console.log(liked);
      if (liked) {
        post.likes--;
        post.liked = false;
      } else {
        post.likes++;
        post.liked = true;
      }
      await this.http.updatePostLikes(post, this.user.user.uid, liked);
    }
    this.loader.dismissLoader();
  }

  async addComment(post) {
    let commentsModal = this.modalCtrl.create(CommentsPage, {post: post});
    commentsModal.present();
    commentsModal.onDidDismiss(async data => {
      
    });
  }

  async doRefresh(refresher) {
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
  async submit() {
    this.nativeAudio.play('post', () => console.log('uniqueId1 is done playing'));
     this.entry.id = UUID.UUID();
     this.entry.uid = this.user.user.uid;
     this.loader.createLoader();
     this.loader.presentLoader();
     await this.http.postForumPost(this.entry);
     this.entry = {
      id: '',
      avatar_image: (this.user.avatar_image ? this.user.avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b'),
      user_name: this.user.fullName,
      uid: '',
      text: '',
      comments: [],
      likes: 0,
      image: null,
      posted: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    this.loader.dismissLoader();
   }

   addImage() {
    let addPostModal = this.modalCtrl.create(AddPost);
    addPostModal.present();
    addPostModal.onDidDismiss(async data => {
      if (data) this.entry.image = data;
    });
   }

   removePhoto() {
    this.http.removeImage(this.entry.image);
    this.entry.image = null;
   }
}



@Component({
  selector: 'add-post',
  templateUrl: 'addPost.html'
})
export class AddPost {
  image;
  loadProgress = 0;
 constructor(
   public viewCtrl: ViewController, 
  private imagePicker: ImagePicker, 
  private file: File,
  private http: HttpProvider,
  private loader: LoadProvider
  ) {
 }

 async ionViewDidLoad() {
   this.loader.createLoader();
   this.loader.presentLoader();
  let permission = await this.imagePicker.hasReadPermission();
  console.log(permission);
  if (permission) {
    let options = {
      maximumImagesCount: 1,
      width: 1080,
      height: 1080,
      quality: 100
    };
    this.imagePicker.getPictures(options).then(async (results) => {
      this.loadProgress += 33;
      let base64string = await this.encodeImageUri(results[0]);
      this.loadProgress += 33;
      let data = await this.http.uploadPostImage(base64string);
      this.loadProgress = 100;
      this.loader.dismissLoader();
      this.viewCtrl.dismiss(data.downloadURL);
    }, (err) => { });
  } else {
    let permission = this.imagePicker.requestReadPermission();
    this.loader.dismissLoader();
    this.viewCtrl.dismiss();
  }
 }

  async encodeImageUri(filePath) {
    let fileName = filePath.split('/').pop();
    let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
    fileName = fileName.split('?');

    let base64string = await this.file.readAsDataURL(path, fileName[0]);
    base64string = base64string.split(',').pop();

    return base64string;
  };

}
