import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadProvider } from '../../providers/load/load';
import { ForumProvider } from '../../providers/stores/forum';
import { CommentsPage } from '../comments/comments';
import { SearchPage } from '../search/search';
import { ConnectionsPage } from '../connections/connections';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = null;
  posts = [];
  showEdit = false;
  profile = {
    fullName: '',
    myStory: ''
  }
  connections = 0;
  placeholder = './assets/imgs/default-avatar.jpg';
  chosenPicture = null;
  toggled = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public userData: UserProvider, private http: HttpProvider, public actionSheetCtrl: ActionSheetController, private camera: Camera, public loader: LoadProvider, public forum: ForumProvider, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  }

  ionViewWillLoad() {
    this.updateUser();
    this.chosenPicture = (this.userData.avatar_image !== null ? this.userData.avatar_image : null);
  }

  ionViewDidEnter() {
    this.updateUser();
  }

  updateUser() {
    this.connections = 0;
    this.posts = [];
    this.user = this.userData;
    for (let i = 0; i < this.forum.posts.length; i++) {
      if (this.forum.posts[i].uid === this.user.user.uid) {
        this.posts.push(this.forum.posts[i]);
      }
    }
    for (let i = 0; i < this.user.connections.length; i++) {
      if (this.user.connections[i].accepted) {
        this.connections++;
      }
    }
  }

  async submitEdit() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.userData.fullName = (this.profile.fullName === '' ? this.userData.fullName : this.profile.fullName);
    this.userData.myStory = (this.profile.myStory === '' ? this.userData.myStory : this.profile.myStory);

    await this.http.updateUser();
    await this.http.setUserAvatar(this.userData.user.uid, this.userData.avatar_image);
    this.showEdit = false;
    this.loader.dismissLoader();
  }

  selectAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: 1,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      correctOrientation: true,
      targetHeight: 500,
      targetWidth: 500
    }
    this.showCamera(options);
  }

  showCamera(options) {
    this.camera.getPicture(options).then(async (imageData) => {
      this.loader.createLoader();
      this.loader.presentLoader();
      let data = await this.http.uploadImage(imageData);
      this.userData.user.avatar_image = data.downloadURL;
      this.chosenPicture = data.downloadURL;
      this.loader.dismissLoader();
    }).catch((err) => {
      console.log(err);
    })
  }

  seeComments(post) {
    let commentsModal = this.modalCtrl.create(CommentsPage, {post: post});
    commentsModal.present();
    commentsModal.onDidDismiss(data => {
      
    });
  }

  deletePost(post) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Post?',
      message: 'Are you sure you would like to delete your forum post?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.loader.createLoader();
            this.loader.presentLoader();
            await this.http.deletePost(post);
            await this.http.getForumData().then(async (data) => {
              let dataArray = await this.forum.convertDataToArray(data);
              this.forum.setPosts(dataArray);
            });
            this.updateUser();
            this.loader.dismissLoader();
          }
        }
      ]
    })
    confirm.present();
  }
   
  showSearch() {
    let searchModal = this.modalCtrl.create(SearchPage);
    searchModal.present();
    searchModal.onDidDismiss(data => {

    });
  }

  showConnections() {
    const connectionModal = this.modalCtrl.create(ConnectionsPage);
    connectionModal.present();
    connectionModal.onDidDismiss(data => {
      
    });
  }

}
