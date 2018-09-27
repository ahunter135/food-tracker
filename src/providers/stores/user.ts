import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  user: null;
  loggedIn: false;

  constructor(private storage: Storage) {}

  set(user) {
    this.user = user;
  }

  async get() {
    return await this.storage.get('User');
  }

  async setLoginFlag(flag) {
    this.loggedIn = flag;
    await this.storage.set('LoggedIn', this.loggedIn);
  }

  async store() {
    await this.storage.set('User', JSON.stringify(this.user))
  }

  async load() {
    this.user = await this.get();
    this.user = JSON.parse(this.user);
  }

}
