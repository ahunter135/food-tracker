import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {

  user: null;
  loggedIn: false;

  constructor(private storage: Storage) {}

  async set(user) {
    this.user = user;
    this.setLoginFlag(true);
  }

  async get() {
    return this.user;
  }

  async setLoginFlag(flag) {
    this.loggedIn = flag;
    await this.storage.set('LoggedIn', this.loggedIn);
  }

  async load() {
    this.user = await this.get();
  }

}
