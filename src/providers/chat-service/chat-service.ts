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
  private baseUrl: string = "http://localhost:8081";
  constructor(private storage: Storage, public http: HttpClient, public auth: AuthProvider) {

  }
  public getConversation(friend){

    let params = new HttpParams()
    .set('person2', friend)
    console.log(params)
    let options = {
      observe: 'response',
      params:params
    };
    return this.http.get(this.baseUrl + "/messages/"+this.auth.currentUser.uid, options)
    .map((res)=>{
      return res.body;
    })

  }
  public getUsers() {
    let options = {
      observe: 'response'
    };
    return this.http.get(this.baseUrl + "/users", options)
      .map(res => {
        let parsedContactList = res.body;
        this.users = [];
        for (var key in parsedContactList) {
          parsedContactList[key].uid = key;
          this.users.push(new User(key, parsedContactList[key].username, parsedContactList[key].email));


        }
        return this.users;

      });


  }
async sendMessage(message) {
    await this.auth.checkAccessToken();
    let options = {
      observe: 'response',
      responseType:'text'
    };
    this.http.post(this.baseUrl + "/messages", JSON.stringify(message), options)
      .subscribe((res) => {
      })
  }

}
