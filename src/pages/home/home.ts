import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, ViewController } from 'ionic-angular';

import { UserProvider } from '../../providers/stores/user';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';
import { UUID } from 'angular2-uuid';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public modalCtrl: ModalController, private userData: UserProvider, private http: HttpProvider, public loader: LoadProvider) {
  }

  ionViewWillLoad() {
    this.user = this.userData.user;
    this.events.publish('user:created', this.user.email);
  }

  loadEntries() {
    this.userData.entries = this.data.entries;
    this.loader.dismissLoader();
    this.isLoading = false;
    for (let i = 0; i < this.data.entries.length; i++) {
      this.entriesDateArray.push(this.data.entries[i].date);
      if (this.compareDates(this.data.entries[i].date, this.today)) this.entryList.push(this.data.entries[i]);
    }
  }

  clearEntries() {
    this.entryList = [];
    this.entriesDateArray = [];
  }

  async ionViewDidLoad() {
    let temp = await this.http.getUserData();
    if (temp) {
      this.data = temp.val();
      if (this.data.entries === undefined || this.data.entries === null) this.data.entries = []; 
      if (this.data.items === undefined || this.data.items === null) this.userData.items = [];
      else this.userData.items = this.data.items;

      this.loadEntries();
    }
  }

  onDaySelect(event) {
    this.entryList = [];
    for (let i = 0; i < this.data.entries.length; i++) {
      if (this.compareDates(this.data.entries[i].date, event)) this.entryList.push(this.data.entries[i]);
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
    });
  }

  editItem(entry) {
    let editItemModal = this.modalCtrl.create(EditEntry, { entry: entry });
    editItemModal.present();
    editItemModal.onDidDismiss(data => {
      this.clearEntries();
      this.loadEntries();
    });
  }

  deleteItem(entry) {
    for (let i = 0; i < this.userData.entries.length; i++) {
      if (this.userData.entries[i].id === entry.id) {
        this.userData.entries.splice(i, 1);
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
 constructor(public viewCtrl: ViewController, params: NavParams, public userData: UserProvider, private http: HttpProvider) {
   this.entry.date = {
     date: params.get('today').date,
     month: params.get('today').month,
     year: params.get('today').year
   }
 }

 submit() {
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
 constructor(public viewCtrl: ViewController, params: NavParams, public userData: UserProvider, private http: HttpProvider) {
   this.entry = params.get('entry');
 }

 submit() {
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
