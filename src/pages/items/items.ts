import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ItemSliding } from 'ionic-angular';
import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { UUID } from 'angular2-uuid';
import { LoadProvider } from '../../providers/load/load';


/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  showDelete = false;
  itemList = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserProvider, public modalCtrl: ModalController, private http: HttpProvider, public loader: LoadProvider) {
  }

  loadItems() {
    this.itemList = this.userData.items;
  }

  clearItems() {
    this.itemList = [];
  }

  ionViewWillLoad() {
    this.loadItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  addItem() {
    let addItemModal = this.modalCtrl.create(AddItems);
    addItemModal.present();
    addItemModal.onDidDismiss(data => {
      this.clearItems();
      this.loadItems();
      if (this.loader.isLoading) this.loader.dismissLoader();
    });
  }

  removeItem(item) {
    this.loader.createLoader();
    this.loader.presentLoader();
    for (let i = 0; i < this.userData.items.length; i++) {
      if (this.userData.items[i].id === item.id) {
        this.userData.items.splice(i, 1);
        this.http.updateUser();
        this.clearItems();
        this.loadItems();
        break;
      }
    }
    if (this.loader.isLoading) this.loader.dismissLoader();
  }
}

@Component({
  selector: 'add-items',
  templateUrl: 'addItems.html'
})
export class AddItems {
  item = {
    id: '',
    name: '',
    feeling: '',
    icon: ''
  }
  text = '';
  feeling = 0;
 constructor(public viewCtrl: ViewController, public userData: UserProvider, private http: HttpProvider, public loader: LoadProvider) {
  
 }

 submit() {
   this.loader.createLoader();
   this.loader.presentLoader();
   if (this.feeling === 0 ) {
     this.item.feeling = 'Awful';
     this.item.icon = 'alert';
    }
   else if (this.feeling === 1) {
     this.item.feeling = 'Okay';
     this.item.icon = 'thumbs-up';
    }
   else {
     this.item.feeling = 'Great';
     this.item.icon = 'happy';
  }
  this.item.id = UUID.UUID();
  this.userData.items.push(this.item);
  this.http.updateUser();
  this.viewCtrl.dismiss();
 }

 dismiss() {
  this.viewCtrl.dismiss();
 }

}
