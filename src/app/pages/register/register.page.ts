import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email;
  password;
  loading = false;
  constructor(private storage: StorageService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  login() {
    if (this.loading) return;
    else this.loading = true;
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(async response => {
      response.user.sendEmailVerification();
      this.storage.createUser(response.user.email, response.user.uid, "");
      this.loading = false;
      this.navCtrl.pop();
    })
    .catch(error => {
      this.loading = false;
      alert(error);
    });
  }

}
