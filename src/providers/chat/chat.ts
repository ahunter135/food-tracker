import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  db = null;
  users = null;
  chats = null;

  currentChatPairId;
  currentChatPartner;

  constructor() {
    this.db = firebase.firestore();
    this.users = this.db.collection('users');
    this.chats = this.db.collection('chats');
  }

  addUser(payload) {
    return this.users.add(payload);
  }

  addChat(chat) {
    console.log(chat);
    return this.chats.add(chat);
  }

  createPairId(user1, user2) {
    let pairId;
    if (user1.fullName < user2.fullName) {
      pairId = `${user1.email}|${user2.email}`;
    } else {
      pairId = `${user2.email}|${user1.email}`;
    }

    return pairId;
  }

}
