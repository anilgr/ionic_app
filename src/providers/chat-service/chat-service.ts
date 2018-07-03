import { Http, Headers, RequestOptions } from '@angular/http';
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
  users:User[] = [];
  private baseUrl: string = "http://localhost:8081";
  constructor(private storage:Storage,public http: Http, public auth:AuthProvider) {

  }

  public  getUsers(){
      let headers = new Headers();
      headers.append("Authorization", "Bearer "+this.storage.get('access_token'));
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl + "/users", options)
      .map(res => {
        let parsedContactList = JSON.parse(res._body);
        this.users = [];
        for(var key in parsedContactList){
          parsedContactList[key].uid = key;
          this.users.push(new User(key, parsedContactList[key].username, parsedContactList[key].email ));
          console.log("uid:"+key+"\nusername:"+parsedContactList[key].username+"\n\n");

        }
        return this.users;

      });


  }
  public sendMessage(message){
    let headers = new Headers();

    headers.append('Content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.baseUrl + "/messages", JSON.stringify(message), options)
    .subscribe((res)=>{
      console.log(res);
    })
  }

}
