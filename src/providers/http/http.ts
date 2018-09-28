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

  constructor(private user: UserProvider) {
  }

  createAccount(user): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  saveUser(): Promise<any> {
    let database = firebase.database().ref('user-accounts/' + this.user.user.uid).set({
      email: this.user.user.email,
      entries: [{
        date: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate()
        },
        text: "This is a sample entry",
        feeling: 'poor'
      }]
    })
  }

  getUserData() {
    let database = firebase.database().ref('user-accounts/' + this.user.user.uid);
    return database.once('value');
  }
}
