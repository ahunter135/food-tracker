import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  url = "https://hidden-stream-54770.herokuapp.com/";
  constructor(private http: HTTP) {
  }

  createAccount(user) {
    let promise = new Promise((resolve, reject) => {
      var headers = new Headers();
      var options = new RequestOptions({ headers: headers });
      this.http.setDataSerializer('json');
      this.http.post(this.url + 'createAccount', {
        username: user.username,
        password: user.password,
        fullName: user.fullName,
        email: user.email,
        backup: {}
      }, {
          'Content-Type': 'application/json; charset=utf-8'
        })
        .then(data => {
          if (data.status == 200) {
            resolve(200);
          }
        })
        .catch(err => {
          reject(400);
        });
    });

    return promise;
  }

}
