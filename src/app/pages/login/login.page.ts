import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;
  loading = false;
  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  async login() {
    if (this.loading) return;
    else this.loading = true;
    try {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(async response => {
      if (!response.user.emailVerified) {
        alert("Please make sure your email is validated");
        this.loading = false;
        return;
      }
      let loginResponse = { key: "loggedInTracker", value: JSON.stringify(response.user) };
      await this.storage.setItem(loginResponse);
      this.loading = false;
      this.router.navigate(['/folder/Directory'], {
        replaceUrl: true
      });
    })
    .catch(error => {
      this.loading = false;
      alert(error);
    });
    } catch (error) {
      alert("Please make sure both fields are correct");
      this.loading = false;
    }
  }
}
