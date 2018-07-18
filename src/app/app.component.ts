import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { ChatsPage } from '../pages/chats/chats';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public auth: AuthProvider, private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
    console.log(auth.loggedIn)

    storage.get('access_token').then((val) => {
    console.log(val)
      if(val == null)
      {
        this.rootPage = LoginPage
      }
      else{
        this.auth.checkAccessToken().then(()=>{
           this.rootPage = ChatsPage;

        });

      }

    })

  }
}
