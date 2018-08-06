import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { Storage } from '@ionic/storage';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { ChatsPage } from '../pages/chats/chats';
import { BackgroundMode } from '@ionic-native/background-mode';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') navCtrl: NavController
  rootPage: any;
  private baseUrl: string = "http://10.0.2.2:8081";


  constructor(private chatService: ChatServiceProvider,
    public events: Events,
    private https: HttpClient,
    private backgroundMode: BackgroundMode,
    public auth: AuthProvider,
    private storage: Storage,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    }
    );
    this.backgroundMode.enable();
    console.log("fdsf+" + this.backgroundMode.isEnabled())
    storage.get('note').then((val) => {
      console.log("notification from back " + val)
    })
    storage.get('access_token').then((val) => {
      console.log(val)
      if (val == null) {
        this.rootPage = LoginPage
      }
      else {
        this.auth.checkAccessToken().then(() => {
          this.rootPage = ChatsPage;
          // this.initFCM();
        });

      }

    })

  }


}
