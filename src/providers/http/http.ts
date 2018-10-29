import { Injectable } from '@angular/core';
import { UserProvider } from '../stores/user';

import firebase from 'firebase';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  ref = null;

  constructor(private user: UserProvider) {
  }

  createAccount(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }
  
  sendEmailValidation() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification();
  }

  login(user){
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  createUser(email, uid) {
    firebase.database().ref('user-accounts/' + uid).set({
      email: email,
      fullName: 'Enter your name here',
      myStory: 'This is the place to tell your story',
      entries: [],
      items: [],
      role: 1
    });
  }

  getUserData() {
    let uid = null;
    if (this.user.user !== null) uid = this.user.user.uid;
    else return false;
    let database = firebase.database().ref('user-accounts/' + uid);
    return database.once('value');
  }

  async updateUser() {
    let uid = null;
    if (this.user.user !== null) uid = this.user.user.uid;
    else return false;
    console.log(this.user.user);
    firebase.database().ref('user-accounts/' + uid).set({
      email: this.user.user.email,
      entries: this.user.entries,
      items: this.user.items,
      myStory: this.user.user.myStory,
      fullName: this.user.user.fullName

    });
  }
}
