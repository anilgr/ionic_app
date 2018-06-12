import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private isLoggedIn;
  private currentUser;
  users:User[] = [];
  private baseUrl: string = "http://localhost:8081";
  constructor(public http: Http) {

  }
  public  getUsers(){
    return new Promise(function(resolve, reject){
      this.http.get(this.baseUrl + "/contacts")
      .subscribe(res => {
        let parsedContactList = JSON.parse(res._body);
        for(var key in parsedContactList){
          parsedContactList[key].uid = key;
          this.users.push(new User(key, parsedContactList[key].username, parsedContactList[key].email ));
          console.log("uid:"+key+"\nusername:"+parsedContactList[key].username+"\n\n");

        }


      }, (err) => {
        console.log("could not fetch contact list");
      });
    })

  }
  public signUp(data){
      console.log("called s")
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
      this.http.post(this.baseUrl+"/signup",JSON.stringify(data), options)
      .subscribe(res => {
        console.log("successfuly signed up:"+res);

      }, (err) => {
        console.log("could not signup");
      })
  }
}
