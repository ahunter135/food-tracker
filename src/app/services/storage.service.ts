import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  data;
  user = <any>{
    items: []
  };
  databaseRef = null;

  constructor() {
    //this.clearStorage();
  }

  async setItem(obj) {
    await Storage.set(obj);
  }

  async getItem(key) {
    const ret = await Storage.get({ key: key });
    const obj = JSON.parse(ret.value);

    return obj
  }

  async removeItem(key) {
    await Storage.remove({ key: key });
  }

  async getKeys() {
    const { keys } = await Storage.keys();

    return keys
  }

  async clearStorage() {
    await Storage.clear();
  }

  async setData(data) {
    this.data = data;
  }

  async getData() {
    return this.data;
  }

  async createUser(email, uid, token) {
    await this.databaseRef.ref('user-accounts/' + uid).set({
      email: email,
      fullName: 'Enter your name here',
      myStory: 'This is the place to tell your story',
      entries: [],
      items: [],
      role: 1,
      token: token
    });
  }

  async updateUser() {
    let uid = null;
    if (this.user !== null) uid = this.user.uid;
    else return false;
    this.databaseRef.ref('user-accounts/' + uid).update({
      email: this.user.email,
      entries: this.user.entries ? this.user.entries : [],
      items: this.user.items ? this.user.items : [],
      myStory: this.user.myStory,
      fullName: this.user.fullName,
      role: this.user.role,
      token: this.user.token ? this.user.token : ""
    });
  }

  async getUserData() {
    let uid = null;
    if (this.user !== null) uid = this.user.uid;
    else return false;
    let database = this.databaseRef.ref('user-accounts/' + uid);
    let temp = await database.once('value');
    console.log(temp.val());
    if (!temp.val()) return;
    this.user.items = (temp.val().items === undefined ? [] : temp.val().items);
    this.user.entries = (temp.val().entries === undefined ? [] : temp.val().entries);
    this.user.fullName = temp.val().fullName;
    this.user.myStory = temp.val().myStory;
    this.user.role = temp.val().role;
    this.user.email = this.user.email;
  }
}
