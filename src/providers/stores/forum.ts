import { Injectable } from '@angular/core';
import moment from 'moment';
import { HttpProvider } from '../http/http';
import { UserProvider } from './user';

@Injectable()
export class ForumProvider {

  posts = [];
  postLikes = null;
  usersPostCount = 0;

  constructor(private http: HttpProvider, private user: UserProvider) {}

  async setPosts(data) {
      if (data !== null) this.posts = data;
      this.posts.reverse();
      await this.getUserPostsCount();
  }

  async getPostLikes() {
    let data = await this.http.getPostLikes();
    this.postLikes = this.convertDataToArray(data);
    return this.postLikes;
  }

  async getUserPostsCount() {
    this.usersPostCount = 0;
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].uid === this.user.user.uid) {
        this.usersPostCount++;
      }
    }
    return this.usersPostCount;
  }

  async convertDataToArray(data) {
    let keys = [];
    let arr = [];
    data.forEach(function(item) {
      let itemVal = item.val();
      itemVal.key = item.key;
      keys.push(itemVal);
    });
    for (let i = 0; i < keys.length; i++) {
      keys[i].time_since = moment(keys[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
      let avatar = await this.http.getUserAvatar(keys[i].uid);
      keys[i].avatar_image = (avatar.val() !== null ? avatar.val().avatar_image : 'https://firebasestorage.googleapis.com/v0/b/foodtracker-8cd65.appspot.com/o/default-avatar.jpg?alt=media&token=e0eb897f-23d7-496d-8a8f-9b158f92655b');
      arr.push(keys[i]);
    }
    return arr;
  }
}
