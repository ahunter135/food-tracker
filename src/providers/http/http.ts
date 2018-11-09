import { Injectable } from '@angular/core';
import { UserProvider } from '../stores/user';
import moment from 'moment';

import firebase from 'firebase';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class HttpProvider {

  databaseRef = null;

  constructor(private user: UserProvider, private httpClient: HTTP) {
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

  getOtherUserData(uid) {
    let database = this.databaseRef.ref('user-accounts/'+uid);
    return database.once('value');
  }

  getForumData() {
    let database = this.databaseRef.ref('posts');
    return database.once('value');
  }

  getUserAccounts() {
    let database = this.databaseRef.ref('user-accounts');
    return database.once('value');
  }

  getUserAvatar(uid) {
    let database = this.databaseRef.ref('user-avatars/' + uid);
    return database.once('value');
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
    this.databaseRef.ref('user-accounts/' + uid).set({
      email: this.user.user.email,
      entries: this.user.entries,
      items: this.user.items,
      myStory: this.user.myStory,
      fullName: this.user.fullName,
      role: this.user.role,
      token: this.user.token
    });
  }

  async uploadImage(file) {
    let today = moment().format('YYYYMMDD');
    let storageRef = firebase.storage().ref();
    let avatarImageRef = storageRef.child('avatar-images/'+this.user.user.uid + '/' + this.user.user.uid + '_' + today + '_avatar.jpg');
    let uploadTask = await avatarImageRef.putString(file, 'base64');
    return uploadTask;
  }

  async getPostData(post) {
    let dbRef = this.databaseRef.ref('posts/'+post.key);
    return dbRef.once('value');
  }

  async getPostLikes() {
    let database = this.databaseRef.ref('postLikes');
    return database.once('value');
  }

  async getUserConnections() {
    let database = this.databaseRef.ref('connections/' + this.user.user.uid);
    return database.once('value');
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
      connectionUID: user.uid,
      avatar_image: user.avatar_image,
      fullName: user.fullName,
      posted: moment().format('MMMM Do YYYY, h:mm a')
    });
  }

  async getOtherUserConnectionData(requestedUID) {
    return this.databaseRef.ref('connections/'+requestedUID).once('value');
  }

  async removeConnectionRequest(requestedUID, key) {
    this.databaseRef.ref('connections/' + requestedUID + '/' + key).update({
      accepted: false
    });
  }

  async replyToConnectionRequest(connection) {
    this.databaseRef.ref('connections/'+this.user.user.uid+'/'+connection.key).update({
      accepted: connection.accepted
    });
    this.databaseRef.ref('connections/'+connection.connectionUID+'/'+connection.key).update({
      accepted: connection.accepted,
      avatar_image: this.user.user.avatar_image,
      connectionUID: this.user.user.uid,
      fullName: this.user.user.fullName,
      posted: moment().format('MMMM Do YYYY, h:mm a')
    });
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
    return unique_array;
  }
}
