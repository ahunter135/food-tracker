import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the RateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RateServiceProvider {

  constructor(public platform: Platform, private appRate: AppRate, private storage: Storage) {
    appRate.preferences.usesUntilPrompt = 4;
    appRate.preferences.callbacks.onRateDialogShow = (buttonIndex) => {
      this.storage.set('user-reviewed', true);
    }
  }

  ionViewWillLoad() {
    
  }

  promptForRating(rate) {
    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=com.ionicframework.tracker210235'
    };
    this.appRate.promptForRating(rate);
  }

}
