import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UUID } from 'angular2-uuid';
import { RateServiceProvider } from '../../providers/rate-service/rate-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = null;
  data = null;
  isLoading = true;
  entriesDateArray = [];
  entryList = [];
  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  };
  selectedDate = this.today;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public modalCtrl: ModalController, private userData: UserProvider, private http: HttpProvider, public loader: LoadProvider, public rateService: RateServiceProvider, private storage: Storage) {
  }

  ionViewWillLoad() {
    this.user = this.userData;
  }

  async ionViewDidLoad() {
    this.loadEntries();
  }

  loadEntries() {
    this.isLoading = false;
    for (let i = 0; i < this.user.entries.length; i++) {
      this.entriesDateArray.push(this.user.entries[i].date);
      if (this.compareDates(this.user.entries[i].date, this.today)) this.entryList.push(this.user.entries[i]);
    }
    if (this.loader.isLoading) this.loader.dismissLoader();
  }

  clearEntries() {
    this.entryList = [];
    this.entriesDateArray = [];
  }

  onDaySelect(event) {
    this.entryList = [];
    for (let i = 0; i < this.user.entries.length; i++) {
      if (this.compareDates(this.user.entries[i].date, event)) this.entryList.push(this.user.entries[i]);
    }
    this.selectedDate = event;
  }

  compareDates(list1, list2) {
    return (list1.year === list2.year && list1.month === list2.month && list1.date === list2.date);
  }

  addItem() {
    let addItemModal = this.modalCtrl.create(AddEntry, { today: this.selectedDate });
    addItemModal.present();
    addItemModal.onDidDismiss(data => {
      this.clearEntries();
      this.loadEntries();
      if (this.loader.isLoading) this.loader.dismissLoader();
    });
  }

  editItem(entry) {
    let editItemModal = this.modalCtrl.create(EditEntry, { entry: entry });
    editItemModal.present();
    editItemModal.onDidDismiss(data => {
      this.clearEntries();
      this.loadEntries();
      if (this.loader.isLoading) this.loader.dismissLoader();
    });
  }

  deleteItem(entry) {
    for (let i = 0; i < this.user.entries.length; i++) {
      if (this.user.entries[i].id === entry.id) {
        this.user.entries.splice(i, 1);
        this.http.updateUser();
        this.clearEntries();
        this.loadEntries();
        break;
      }
    }
  }
}

@Component({
  selector: 'add-item',
  templateUrl: 'addItem.html'
})
export class AddEntry {
  entry = {
    id: '',
    text: '',
    bms: 0,
    date: {}
  }
 constructor(public viewCtrl: ViewController, params: NavParams, public userData: UserProvider, private http: HttpProvider, public loader: LoadProvider) {
   this.entry.date = {
     date: params.get('today').date,
     month: params.get('today').month,
     year: params.get('today').year
   }
 }

 async submit() {
   this.loader.createLoader();
   this.loader.presentLoader();
   this.entry.id = UUID.UUID();
   this.userData.entries.push(this.entry);
   this.http.updateUser();
   
   this.viewCtrl.dismiss();
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}

@Component({
  selector: 'edit-item',
  templateUrl: 'editItem.html'
})
export class EditEntry {
  entry = {
    id: '',
    text: '',
    bms: 0,
    date: {}
  }
 constructor(public viewCtrl: ViewController, params: NavParams, public userData: UserProvider, private http: HttpProvider, public loader: LoadProvider) {
   this.entry = params.get('entry');
 }

 submit() {
  this.loader.createLoader();
  this.loader.presentLoader();
  for (let i = 0; i < this.userData.entries.length; i++) {
    if (this.userData.entries[i].id === this.entry.id) {
      this.userData.entries[i] = this.entry;
      this.http.updateUser();
      this.viewCtrl.dismiss();
      break;
    }
  }
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}
