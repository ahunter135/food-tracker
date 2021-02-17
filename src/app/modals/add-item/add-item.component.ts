import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

  item = <any>{};
  feeling;
  constructor(private modalCtrl: ModalController, private storage: StorageService) { }

  ngOnInit() {}

  submit() {
    if (!this.feeling || !this.item.name) return;
    if (this.feeling == 0 ) {
      this.item.feeling = 'Awful';
      this.item.icon = 'alert';
     }
    else if (this.feeling == 1) {
      this.item.feeling = 'Okay';
      this.item.icon = 'thumbs-up';
     }
    else {
      this.item.feeling = 'Great';
      this.item.icon = 'happy';
   }
    this.item.id = uuid();
    console.log(this.storage.user);
    this.storage.user.items.push(this.item);
    this.dismiss();
    this.storage.updateUser();
  }

  dismiss() {
    this.modalCtrl.dismiss();
   }
}
