import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OverflowMenuPage } from '../pages/overflow-menu/overflow-menu';
import { IonicStorageModule } from '@ionic/storage';
import { ContactsPage } from '../pages/contacts/contacts'
import { ChatPage } from '../pages/chat/chat'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AuthProvider } from '../providers/auth/auth';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { httpInterceptorProviders } from '../providers/http-interceptors/interceptor-providers';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ContactsPage,
    ChatPage,
    OverflowMenuPage,
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

  ],
  providers: [
    httpInterceptorProviders,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    ChatServiceProvider
  ]
})
export class AppModule { }
