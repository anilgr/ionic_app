import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
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
  isNewConversation;
  private baseUrl: string = "http://localhost:8081";
  constructor(private storage: Storage, public http: HttpClient, public auth: AuthProvider) {

  }
  public getConversation(friend){
    console.log("endKey:"+this.endKey[friend])
    let params = new HttpParams()
    .set('person2', friend)
    .set('endKey', this.endKey[friend])
    console.log(params)
    let options = {
      observe: 'response',
      params:params
    };
    return this.http.get(this.baseUrl + "/messages/"+this.auth.currentUser.uid, options)
    .map((res)=>{
      console.log(res.body)
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
          if(key == this.auth.currentUser.uid)continue;
          parsedContactList[key].uid = key;
          this.users.push(new User(key, parsedContactList[key].username, parsedContactList[key].email));


        }
        return this.users;

      }).toPromise();


  }
async sendMessage(message) {
  console.log("isNew:"+this.isNewConversation)
    await this.auth.checkAccessToken();
    let options = {
      observe: 'response',
      responseType:'text'
     };
    let data = {
      messageData:message,
      isNewConversation:this.isNewConversation,
    }
    this.http.post(this.baseUrl + "/messages", JSON.stringify(data), options)
      .subscribe((res) => {
        console.log(res);
        if(this.isNewConversation = true)
        this.isNewConversation = false;
      })
  }

}
