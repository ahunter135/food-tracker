import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Pipe } from '@angular/core';
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
import { ResetPassword } from '../pages/login/login';
import { SocialPage } from '../pages/social/social';
import { PublicForumPage } from '../pages/public-forum/public-forum';
import { ConnectionsPage } from '../pages/connections/connections';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddPost } from '../pages/public-forum/public-forum';
import { CommentsPage } from '../pages/comments/comments';
import { AppRate } from '@ionic-native/app-rate';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FCM } from '@ionic-native/fcm';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP } from '@ionic-native/http';
import { Crashlytics, Answers } from '@ionic-native/fabric';
import { LoadProvider } from '../providers/load/load';
import { HttpProvider } from '../providers/http/http';
import { UserProvider } from '../providers/stores/user';
import { ForumProvider } from '../providers/stores/forum';

import { RateServiceProvider } from '../providers/rate-service/rate-service';
import { Camera } from '@ionic-native/camera';
import { ChatPage } from '../pages/chat/chat';
import { ChatProvider } from '../providers/chat/chat';
import { PipesModule } from '../pipes/pipes.module';
import { SearchPage } from '../pages/search/search';
import { NativeAudio } from '@ionic-native/native-audio';
import { FirebaseConfig } from '@ionic-native/firebase-config';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoadPage,
    SignUpPage,
    LoginPage,
    AddEntry,
    EditEntry,
    ResetPassword,
    SocialPage,
    PublicForumPage,
    ConnectionsPage,
    AddItems,
    CommentsPage,
    UserProfilePage,
    AddPost,
    ItemsPage,
    ProfilePage,
    ChatPage,
    SearchPage,
    ChatlistPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(HomePage),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    PipesModule
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
    SocialPage,
    ResetPassword,
    PublicForumPage,
    ConnectionsPage,
    CommentsPage,
    AddItems,
    AddPost,
    ItemsPage,
    UserProfilePage,
    ProfilePage,
    ChatPage,
    SearchPage,
    ChatlistPage
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
    UserProvider,
    RateServiceProvider,
    ForumProvider,
    Camera,
    AppRate,
    Crashlytics,
    Answers,
    ChatProvider,
    NativeAudio,
    FirebaseConfig
  ]
})
export class AppModule {}
