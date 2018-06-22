import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadProvider {

  loader = null;

  constructor(public loadingCtrl: LoadingController) {
    
  }

  createLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="cssload-container">
                    <div class="cssload-whirlpool"></div>
                </div>`,
      cssClass: 'loader'
    });
  }

  presentLoader() {
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

}
