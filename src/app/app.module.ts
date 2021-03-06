import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ChatsPage } from '../pages/chats/chats';
import { OverflowMenuPage } from '../pages/overflow-menu/overflow-menu';
import { IonicStorageModule } from '@ionic/storage';
import { ContactsPage } from '../pages/contacts/contacts'
import { ChatPage } from '../pages/chat/chat'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';
import { AuthProvider } from '../providers/auth/auth';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { httpInterceptorProviders } from '../providers/http-interceptors/interceptor-providers';
import { FcmServiceProvider } from '../providers/fcm-service/fcm-service';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ContactsPage,
    ChatPage,
    HomePage,
    OverflowMenuPage,
    ChatsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ContactsPage,
    ChatPage,
    OverflowMenuPage,
    ChatsPage,

  ],
  providers: [
    BackgroundMode,
    LocalNotifications,
    FCM,
    httpInterceptorProviders,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    FcmServiceProvider,
    ChatServiceProvider,
    FcmServiceProvider
  ]
})
export class AppModule { }
