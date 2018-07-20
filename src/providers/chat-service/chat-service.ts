import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User, Chat } from "../../app/model/model";

import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {
  users: User[] = [];
  endKey = {};
  chats: Chat[] = [];
  isNewConversation;
  private baseUrl: string = "http://localhost:8081";
  constructor(private storage: Storage, public http: HttpClient, public auth: AuthProvider) {

  }
  public loadChatsList() {
    this.chats = [];
    let options = {
      observe: 'response',
    }
    return this.http.get(this.baseUrl + "/conversations/"+this.auth.currentUser.uid, options)
      .map(async (res) => {
        let data = res.body;
        for (var i = 0; i < data.length; i++) {
          let convtn = data[i];
          let chat = new Chat();
          chat.lastMessage = convtn.lastMessage;
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
      observe: 'response',
      params: params
    };
    return this.http.get(this.baseUrl + "/messages/" + this.auth.currentUser.uid, options)
      .map((res) => {
        return res.body;
      })

  }
  async getUsers() {
    await this.auth.checkAccessToken();
    let options = {
      observe: 'response'
    };
    return this.http.get(this.baseUrl + "/users", options)
      .map(res => {
        let parsedContactList = res.body;
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
    let options = {
      observe: 'response',
      responseType: 'text'
    };
    let data = {
      messageData: message,
      isNewConversation: this.isNewConversation,
    }
    this.http.post(this.baseUrl + "/messages", JSON.stringify(data), options)
      .subscribe((res) => {
        if (this.isNewConversation = true)
          this.isNewConversation = false;
      })
  }

}
