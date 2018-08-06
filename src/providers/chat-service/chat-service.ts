import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User, Chat } from "../../app/model/model";

import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Storage } from '@ionic/storage';
import { Utility } from "../../app/utility/utility"
import { FCM } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  this.localNotifications.schedule({
    id: 1,
    text: 'background notification',
    sound:'file://sound.mp3',
    data: { secret: "gjhgjhgjhgjh" }
  });
*/
@Injectable()
export class ChatServiceProvider {
  users: User[] = [];
  endKey = {};
  chats: Chat[] = [];
  isNewConversation;
  private baseUrl: string = "http://10.0.2.2:8081";
  constructor(private localNotifications: LocalNotifications, private fcm: FCM, private storage: Storage, private https: HttpClient, private auth: AuthProvider) {
  }

  public loadChatsList() {
    this.chats = [];

    return this.https.get(this.baseUrl + "/conversations/" + this.auth.currentUser.uid)
      .map((res) => {
        let data = res;
        for (var i = 0; i < data["length"]; i++) {
          let convtn = data[i];
          let chat = new Chat();
          chat.lastMessage = convtn.lastMessage;
          chat.lastMessage.time = Utility.formatAMPM(new Date(chat.lastMessage.timestamp))
          chat.reciever = convtn.reciever;
          this.chats.push(chat);
        }
        return this.chats;
      }).toPromise();
  }
  async getUserById(userId) {
    var usr;
    if (this.users.length > 0) {

      this.users.forEach((user) => {

        if (user.uid == userId) {
          usr = user;
        }

      })
    } else {
      await this.getUsers()
      usr = await this.getUserById(userId);

    }
    return usr;
  }
  public getConversation(reciverId) {
    let params = new HttpParams()
      .set('person2', reciverId)
      .set('endKey', this.endKey[reciverId])
    let options = {
      params: params
    };
    return this.https.get(this.baseUrl + "/messages/" + this.auth.currentUser.uid, options)
      .map((res) => {
        return res;
      })

  }
  async getUsers() {
    await this.auth.checkAccessToken();
    return this.https.get(this.baseUrl + "/users")
      .map(res => {
        let parsedContactList = res;
        this.users = [];

        for (var key in parsedContactList) {
          if (key == this.auth.currentUser.uid) continue;
          parsedContactList[key].uid = key;
          this.users.push(new User(key, parsedContactList[key].username, parsedContactList[key].email));


        }
        return this.users;

      }).toPromise();


  }
  async sendMessage(message) {
    await this.auth.checkAccessToken();

    let data = {
      messageData: message,
      isNewConversation: this.isNewConversation,
    }
    this.https.post(this.baseUrl + "/messages", JSON.stringify(data))
      .subscribe((res) => {
        if (this.isNewConversation = true)
          this.isNewConversation = false;
      })
  }

}
