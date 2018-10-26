import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { CalendarModule } from '../calendar/calendar.module';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEntry } from '../pages/home/home';
import { EditEntry } from '../pages/home/home';
import { AddItems } from '../pages/items/items';
import { LoadPage } from '../pages/load/load';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { ItemsPage } from '../pages/items/items';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FCM } from '@ionic-native/fcm';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP } from '@ionic-native/http';

import { LoadProvider } from '../providers/load/load';
import { HttpProvider } from '../providers/http/http';
import { UserProvider } from '../providers/stores/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoadPage,
    SignUpPage,
    LoginPage,
    AddEntry,
    EditEntry,
    AddItems,
    ItemsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(HomePage),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoadPage,
    SignUpPage,
    LoginPage,
    AddEntry,
    EditEntry,
    AddItems,
    ItemsPage,
    ProfilePage
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
    UserProvider
  ]
})
export class AppModule {}
