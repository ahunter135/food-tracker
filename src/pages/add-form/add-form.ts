import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-form',
  templateUrl: 'add-form.html'
})
export class AddFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  cancelModal() {
    this.viewCtrl.dismiss();
  }
}
