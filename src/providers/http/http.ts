import { Injectable } from '@angular/core';
import { UserProvider } from '../stores/user';
import moment from 'moment';

import firebase from 'firebase';
import { HTTP } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { UUID } from 'angular2-uuid';

@Injectable()
export class HttpProvider {

  databaseRef = null;

  constructor(private user: UserProvider, private httpClient: HTTP, public events: Events) {
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
    this.databaseRef.ref('user-accounts/' + uid).set({
      email: email,
      fullName: 'Enter your name here',
      myStory: 'This is the place to tell your story',
      entries: [],
      items: [],
      role: 1,
      token: this.user.token
    });
  }

  getUserData() {
    let uid = null;
    if (this.user.user !== null) uid = this.user.user.uid;
    else return false;
    let database = this.databaseRef.ref('user-accounts/' + uid);
    return database.once('value');
  }

  getUserEntries() {

  }

  getUserItems() {
    
  }

  getFreeWeekend() {
    let self = this;
    let database = this.databaseRef.ref('free-weekend');
    database.on('value', async function(snapshot) {
      console.log("HERE");
      self.events.publish('free:weekend', snapshot);
    })
  }

  getOtherUserData(uid) {
    let database = this.databaseRef.ref('user-accounts/'+uid);
    return database.once('value');
  }

  async getForumData() {
    let self = this;
    let database = this.databaseRef.ref('posts');
    database.on('value', async function(snapshot) {
      self.events.publish('forum:load', snapshot);
    })
  }

  getUserAccounts() {
    let database = this.databaseRef.ref('user-accounts');
    return database.once('value');
  }

  getUserAvatar(uid) {
    let database = this.databaseRef.ref('user-avatars/' + uid);
    return database.once('value');
  }

  async getPostData(post) {
    let dbRef = this.databaseRef.ref('posts/'+post.key);
    return dbRef.once('value');
  }

  async getPostLikes() {
    let database = this.databaseRef.ref('postLikes');
    return database.once('value');
  }

  async uploadImage(file) {
    let today = moment().format('YYYYMMDD');
    let storageRef = firebase.storage().ref();
    let avatarImageRef = storageRef.child('avatar-images/'+this.user.user.uid + '/' + this.user.user.uid + '_' + today + '_avatar.jpg');
    let uploadTask = await avatarImageRef.putString(file, 'base64');
    return uploadTask;
  }

  async uploadPostImage(file) {
    let uuid = UUID.UUID();
    let storageRef = firebase.storage().ref();
    let avatarImageRef = storageRef.child('post-images/'+this.user.user.uid + '/' + this.user.user.uid + '_' + uuid + '_post.jpg');
    let uploadTask = await avatarImageRef.putString(file, 'base64');
    return uploadTask;
  }

  async removeImage(file) {
    let storageRef = firebase.storage().refFromURL(file);
    await storageRef.delete();
  }

  async getUserConnections() {
    let self = this;
    let database = this.databaseRef.ref('connections/' + this.user.user.uid);
    database.on('value', async function(snapshot) {
      self.events.publish('connections:load', snapshot);
    })
  }

  async getUserChats() {
    let sentChats = [];
    let receivedChats = [];

    let sentRef = await firebase.firestore().collection('chats').where('sender.uid', '==', this.user.user.uid).get();
    for (let sentDoc of sentRef.docs) {
        sentChats.push(sentDoc.data());
    }

    let receivedRef = await firebase.firestore().collection('chats').where('receiver.uid', '==', this.user.user.uid).get();
    for (let receivedDoc of receivedRef.docs) {
        receivedChats.push(receivedDoc.data());
    }
    let allArray = [...sentChats, ...receivedChats];
    let unique_array = [];
    for(let i = 0;i < allArray.length; i++){
        if(unique_array.indexOf(allArray[i]) == -1){
            unique_array.push(allArray[i])
        }
    }

    this.events.publish('chats:data', unique_array);
  }

  async getOtherUserConnectionData(requestedUID) {
    return this.databaseRef.ref('connections/'+requestedUID).once('value');
  }

  async postForumPost(post) {
    let dbRef = this.databaseRef.ref('posts/');
    let newRef = dbRef.push(post);
  }

  async updatePostLikes(post, uid, liked) {
    this.databaseRef.ref('posts/'+post.key).update({
      likes: post.likes
    })
    this.databaseRef.ref('postLikes/'+uid+'/'+post.key).update({
      liked: !liked
    })
  }

  setUserAvatar(uid, avatar_image) {
    this.databaseRef.ref('user-avatars/' + uid).update({
      avatar_image: avatar_image
    });
  }

  async updateUser() {
    let uid = null;
    if (this.user.user !== null) uid = this.user.user.uid;
    else return false;
    this.databaseRef.ref('user-accounts/' + uid).update({
      email: this.user.email,
      entries: this.user.entries,
      items: this.user.items,
      myStory: this.user.myStory,
      fullName: this.user.fullName,
      role: this.user.role,
      token: this.user.token
    });
  }

  async updatePostComments(post) {
    this.databaseRef.ref('posts/'+post.key).update({
      comments: post.comments
    })
  }

  async deletePost(post) {
    await this.databaseRef.ref('posts/'+post.key).remove();
  }

  async sendConnectionNotification(token) {
    
  }

  async addConnectionRequest(requestedUID, user) {
    this.databaseRef.ref('connections/'+requestedUID).push({
      connectionUID: user.user.uid,
      fullName: user.fullName,
      posted: moment().format('MMMM Do YYYY, h:mm a')
    });
  }

  async removeConnectionRequest(requestedUID, key) {
    this.databaseRef.ref('connections/' + requestedUID + '/' + key).update({
      accepted: false
    });
    this.databaseRef.ref('connections/' + this.user.user.uid + '/' + key).update({
      accepted: false
    });
  }

  async replyToConnectionRequest(connection) {
    this.databaseRef.ref('connections/'+this.user.user.uid+'/'+connection.key).update({
      accepted: connection.accepted
    });
    this.databaseRef.ref('connections/'+connection.connectionUID+'/'+connection.key).update({
      accepted: connection.accepted,
      connectionUID: this.user.user.uid,
      fullName: this.user.fullName,
      posted: moment().format('MMMM Do YYYY, h:mm a')
    });
  }
}
