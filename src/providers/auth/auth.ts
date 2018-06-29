import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";

@Injectable()
export class AuthProvider {
  public bearerToken;
  public isLoggingIn = false;
  public loggedIn = false;
  private currentUser = {};
  private baseUrl: string = "http://localhost:8081";
  constructor(public http: Http) {

  }

  public signUp(data){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let options = new RequestOptions({ headers: headers});
       this.http.post(this.baseUrl+"/auth/signup",JSON.stringify(data), options)
      .subscribe(res => {
        console.log("successfuly signed up:"+res);

      }, (err) => {
        console.log("could not signup");
      })
  }

public login(data){
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      let options = new RequestOptions({ headers: headers});
       this.http.post(this.baseUrl+"/auth/login",JSON.stringify(data), options)
        .subscribe(res => {
          let data = JSON.parse(res._body);
          console.log(data.access_token);
          this.bearerToken = data.access_token;
          console.log("successfuly logged in:"+res._body);
          this.isLoggingIn = false;
          this.loggedIn = true;
          resolve();
          // this.currentUser.uid = res._body;

        }, (err) => {
          console.log("could not log in");
        })
    })

  }
}
