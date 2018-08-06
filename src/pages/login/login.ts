import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from "../../providers/auth/auth";
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';
import { ContactsPage } from "../contacts/contacts";
import { Storage } from '@ionic/storage';
import { ChatsPage } from "../chats/chats";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FcmServiceProvider } from "../../providers/fcm-service/fcm-service";
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  private baseUrl: string = "http://10.0.2.2:8081";

  constructor(private https: HttpClient,
    private fcmService:FcmServiceProvider,
    private events: Events,
    private localNotifications: LocalNotifications,
    private chatService: ChatServiceProvider,
    private toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public auth: AuthProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams){

  }


  login() {
    this.auth.isLoggingIn = true;
    //this method has to be synchronized or return login status;
    this.auth.login({
      username: this.username,
      password: "123456"
    }).then(() => {
      this.navCtrl.setRoot(ChatsPage);
      this.initFCM();
    }).catch((err) => {
      this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'bottom'
      }).present();
      this.username = "";
      this.password = "";
    });
  }
  openSignup() {
    this.navCtrl.push(SignupPage);
  }
  public initFCM() {

    this.fcmService.init();
    this.fcmService.onNotification().subscribe(async (data) => {
      if (data.wasTapped) {
        console.log("Received in background");
        console.log(data);
      } else {
        let page = this.navCtrl.getActive();
        console.log(page)
        if (page.name == "ChatPage" && page.instance.navParams.get("uid") == data.senderId) {
          this.events.publish('new_message_' + page.instance.navParams.get("uid"), data);
        }
        else {
          this.localNotifications.schedule({
            id: 1,
            title: (await this.chatService.getUserById(data.senderId)).username,
            text: data.message,
            sound: 'file://sound.mp3',
            data: { secret: "gjhgjhgjhgjh" }
          });
        }
        console.log("Received in foreground");
        console.log(JSON.stringify(data))

      };
    });

  }

}
