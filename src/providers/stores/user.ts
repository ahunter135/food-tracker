import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {

  user = null;
  loggedIn: false;
  items = [];
  entries = [];

  constructor(private storage: Storage) {}

  async set() {
    this.user = firebase.auth().currentUser;
    this.setLoginFlag(true);
    this.storage.set('User', this.user);
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

  async clear() {
    this.user = null;
    this.loggedIn = null;
  }
}
