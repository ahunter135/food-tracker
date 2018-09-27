import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CalendarModule } from 'ionic3-calendar-en';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddFormPage } from '../pages/add-form/add-form';
import { LoadPage } from '../pages/load/load';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FCM } from '@ionic-native/fcm';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP } from '@ionic-native/http';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoadProvider } from '../providers/load/load';
import { HttpProvider } from '../providers/http/http';
import { UserProvider } from '../providers/stores/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddFormPage,
    LoadPage,
    SignUpPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddFormPage,
    LoadPage,
    SignUpPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppPurchase,
    FCM,
    LoadProvider,
    HTTP,
    HttpProvider,
    GooglePlus,
    UserProvider
  ]
})
export class AppModule {}
