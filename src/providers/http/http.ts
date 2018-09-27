import { Injectable } from '@angular/core';

import firebase from 'firebase';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor() {
  }

  createAccount(user): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }
}
