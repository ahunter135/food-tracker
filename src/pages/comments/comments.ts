import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/stores/user';
import moment from 'moment';
import { HttpProvider } from '../../providers/http/http';
import { LoadProvider } from '../../providers/load/load';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  post = null;
  comment = {
    avatar_image: this.user.avatar_image,
    user_name: this.user.fullName,
    posted: null,
    text: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider, public http: HttpProvider, public viewCtrl: ViewController, public loader: LoadProvider) {
    this.post = navParams.get('post');
    console.log(this.post);
    if (this.post.comments === undefined) this.post.comments = [];
    for (let i = 0; i < this.post.comments.length; i++) {
      this.post.comments[i].time_since = moment(this.post.comments[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
    }
  }

  async updatePostComments(refresher) {
    let key = this.post.key;
    let data = await this.http.getPostData(this.post);
    this.post = data.val();
    this.post.key = key;
    if (this.post.comments === undefined) this.post.comments = [];
    for (let i = 0; i < this.post.comments.length; i++) {
      this.post.comments[i].time_since = moment(this.post.comments[i].posted, 'MMMM Do YYYY, h:mm:ss a').fromNow();
    }
    if (refresher !== null) refresher.complete();
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async postComment() {
    this.loader.createLoader();
    this.loader.presentLoader();
    this.comment.posted = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.post.comments.push(this.comment);
    for (let i = 0; i < this.post.comments.length; i++) {
      if (this.post.comments[i].time_since !== undefined) this.post.comments[i].time_since = null;
    }
    await this.http.updatePostComments(this.post);
    this.updatePostComments(null);
    this.comment = {
      avatar_image: this.user.avatar_image,
      user_name: this.user.fullName,
      posted: null,
      text: ''
    };
    this.loader.dismissLoader();
  }

}
