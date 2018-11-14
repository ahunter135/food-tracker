import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { LoadProvider } from '../../providers/load/load';
import { Crop } from '@ionic-native/crop';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile {

  // You can get this data from your API. This is a dumb data for being an example.
  public user_data = {
    profile_img: "https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b",
    name_surname: '',
    username: '',
    website: '',
    description: '',
    email: '',
    phone: '',
    gender: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private camera: Camera, 
    private file: File,
    private loader: LoadProvider,
    public crop: Crop,
    public userData: UserProvider,
    private http: HttpProvider
    ) {}

  ionViewDidLoad() {
    let user = this.navParams.get('user');

    this.user_data.profile_img = user.avatar_image;
    this.user_data.name_surname = user.fullName;
    this.user_data.description = user.myStory;
    this.user_data.email = user.email;
  }

  selectAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: 1,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      correctOrientation: false
    }
    this.showCamera(options);
  }

  showCamera(options) {
    this.camera.getPicture(options).then(async (imageData) => {
      this.loader.createLoader();
      this.loader.presentLoader();
      console.log(imageData);
      let newImage = await this.crop.crop(imageData, {quality: 100});
      let newImageURL = await this.encodeImageUri(newImage);
      let data = await this.http.uploadImage(newImageURL);
      this.user_data.profile_img = data.downloadURL;
      this.loader.dismissLoader();
    }).catch((err) => {
      console.log(err);
    })
  }

  async encodeImageUri(filePath) {
    let fileName = filePath.split('/').pop();
    let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
    fileName = fileName.split('?');

    let base64string = await this.file.readAsDataURL(path, fileName[0]);
    base64string = base64string.split(',').pop();

    return base64string;
  };

  async saveProfile() {
    this.loader.createLoader();
    this.loader.presentLoader();
    console.log(this.user_data);
    this.userData.fullName = this.user_data.name_surname;
    this.userData.myStory = this.user_data.description;
    this.userData.avatar_image = this.user_data.profile_img;
    await this.http.updateUser();
    await this.http.setUserAvatar(this.userData.user.uid, this.userData.avatar_image);

    this.loader.dismissLoader();
    this.viewCtrl.dismiss();
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

}
