import { Injectable } from '@angular/core';
import moment from 'moment';
import { HttpProvider } from '../http/http';

@Injectable()
export class ForumProvider {

  posts = [];
  postLikes = null;

  constructor(private http: HttpProvider) {}

  setPosts(data) {
      if (data !== null) this.posts = data;
      this.posts.reverse();
  }

  async getPostLikes() {
    let data = await this.http.getPostLikes();
    this.postLikes = this.convertDataToArray(data);
    return this.postLikes;
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
