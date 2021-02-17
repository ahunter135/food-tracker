import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddItemComponent } from '../modals/add-item/add-item.component';
import { StorageService } from '../services/storage.service';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import Fuse from 'fuse.js'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public itemList = [];
  public searching = false;
  public entryList = [];
  
  max = moment().format("YYYY-MM-DD");
  today = moment().format("YYYY-MM-DD");
  public entry = <any>{
    date: this.today,
    bms: 0
  };
  constructor(private activatedRoute: ActivatedRoute, private storage: StorageService, private router: Router,
    private modalCtrl: ModalController, private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    var loggedIn = await this.storage.getItem("loggedInTracker");
    if (loggedIn == undefined) {
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    } else {
      if (!loggedIn.uid) {
        this.router.navigate(['/login'], {
          replaceUrl: true
        }); 
      }
    }
    this.storage.user = loggedIn;

    this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    console.log("HERE");
    await this.storage.getUserData();
    this.itemList = this.storage.user.items ? this.storage.user.items : [];
    this.entryList = this.storage.user.entries ? this.storage.user.entries : [];
    this.entryList.sort(this.custom_sort);
  }

  custom_sort(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

  resetSearch() {
    this.searching = false;
    this.itemList = this.storage.user.items;
  }

  async addItem() {
    let modal = await this.modalCtrl.create({
      component: AddItemComponent
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    return;
  }

  async removeItem(item) {
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].id == item.id) {
        this.itemList.splice(i,1);
        this.storage.user.items = this.itemList;
        break;
      }
    }
    this.storage.updateUser();
  }

  async removeEntry(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete Entry',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          for (let i = 0; i < this.entryList.length; i++) {
            if (this.entryList[i].id == item.id) {
              this.entryList.splice(i,1);
              this.storage.user.entries = this.entryList;
              break;
            }
          }
          this.storage.updateUser();
        }
      }]
    });

    actionSheet.present();
  }

  async search(event) {
    if (event == '' || event == undefined) {
      this.resetSearch();
      return;
    }
    this.itemList = this.storage.user.items;
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ['name', 'feeling']
    }
    
    const fuse = new Fuse(this.itemList, options)
    
    const result = fuse.search(event);
    console.log(result);
    this.itemList = [];
    for (let i = 0; i < result.length; i++) {
      this.itemList.push(result[i].item);
    }
  }

  async doRefresh(event) {
    await this.storage.getUserData();
    this.itemList = this.storage.user.items ? this.storage.user.items : [];
    this.entryList = this.storage.user.entries ? this.storage.user.entries : [];
    event.target.complete();
  }

  async submitEntry() {
    this.entry.id = uuid();
    this.storage.user.entries.push(this.entry);
    this.storage.updateUser();
    this.clearEntry();
  }

  clearEntry() {
    this.entry = <any>{
      date: this.today,
      bms: 0
    }
  }
}
