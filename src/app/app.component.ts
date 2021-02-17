import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase';
import { StorageService } from './services/storage.service';
import { AdMob } from '@admob-plus/ionic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  banner;
  public appPages = [
    {
      title: 'Directory',
      url: '/folder/Directory',
      icon: 'mail'
    },
    {
      title: 'Journal',
      url: '/folder/Journal',
      icon: 'paper-plane'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private admob: AdMob
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.databaseRef = firebase.database();
      // Use matchMedia to check the user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

      toggleDarkTheme(!prefersDark.matches);

      // Listen for changes to the prefers-color-scheme media query
      prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

      // Add or remove the "dark" class based on if the media query matches
      function toggleDarkTheme(shouldAdd) {
        document.body.classList.toggle('dark', false);
      }

      await this.setupAds();
    });
  }

  async setupAds() {
      await this.admob.start();

      this.banner = new this.admob.BannerAd({
        adUnitId: this.platform.is('ios') ? 'ca-app-pub-8417638044172769/2148472806' : 'ca-app-pub-8417638044172769/6516939139',
      });
      await this.banner.show();
  }

  ngOnInit() {}
}
