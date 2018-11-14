import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ActionSheetController, AlertController, ModalController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadProvider } from '../../providers/load/load';
import { ForumProvider } from '../../providers/stores/forum';
import { CommentsPage } from '../comments/comments';
import { SearchPage } from '../search/search';
import { ConnectionsPage } from '../connections/connections';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { EditProfile } from '../edit-profile/edit-profile';

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
  postsCount = 0;
  showEdit = false;
  profile = {
    fullName: '',
    myStory: ''
  }
  connections = 0;
  placeholder = './assets/imgs/default-avatar.jpg';
  chosenPicture = null;
  toggled = false;
  uploadedPhoto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController, 
    public userData: UserProvider, 
    private http: HttpProvider, 
    public actionSheetCtrl: ActionSheetController, 
    
    public loader: LoadProvider, 
    public forum: ForumProvider, 
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController, 
    public events: Events
    ) {}

  ionViewWillLoad() {
    this.updateUser();
    this.chosenPicture = (this.userData.avatar_image !== null ? this.userData.avatar_image : null);
  }

  ionViewDidEnter() {
    this.updateUser();
  }

  updateUser() {
    this.connections = 0;
    this.user = this.userData;
    this.postsCount = this.forum.usersPostCount;

    for (let i = 0; i < this.user.connections.length; i++) {
      if (this.user.connections[i].accepted) {
        this.connections++;
      }
    }
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
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: async () => {
            this.loader.createLoader();
            this.loader.presentLoader();
            await this.http.deletePost(post);
            this.postsCount--;
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

  showEditModal() {
    const editModal = this.modalCtrl.create(EditProfile, {user: this.user});
    editModal.present();
    editModal.onDidDismiss(data => {
      this.chosenPicture = this.userData.avatar_image;
      this.events.publish('user:avatar', this.chosenPicture);
    });
  }

}
