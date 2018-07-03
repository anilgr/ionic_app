import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthProvider {
  public bearerToken;
  public isLoggingIn = false;
  public isSigningUp = false;
  public loggedIn = false;
  public currentUser = {};
  private baseUrl: string = "http://localhost:8081";
  constructor(public http: Http, private storage: Storage) {

  }

  public signUp(data) {
    return new Promise((resolve, reject)=> {
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.isSigningUp = true;
      this.http.post(this.baseUrl + "/auth/signup", JSON.stringify(data), options)
        .subscribe(res => {
          console.log("successfuly signed up:" + res);
          this.isSigningUp = false;
          resolve();
        }, (err) => {
          console.log("could not signup");
          reject();
        });
    });
  }
  public logout() {
    return new Promise((resolve, reject) => {
      console.log("logged out?");
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.baseUrl + "/auth/logout", JSON.stringify(), options)
        .subscribe(res => {
          console.log(res._body);
          this.storage.remove('access_token');
          resolve();
        }, err => {
          console.log("could not logout: error occured");
          reject();
        })
    })
  }
  public login(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.baseUrl + "/auth/login", JSON.stringify(data), options)
        .subscribe(res => {
          let data = JSON.parse(res._body);
          console.log(data.access_token);
          this.bearerToken = data.access_token;
          this.storage.set('access_token', data.access_token);
          console.log("successfuly logged in:" + res._body);
          this.isLoggingIn = false;
          this.loggedIn = true;
          this.currentUser.uid = data.uid;
          resolve();
          // this.currentUser.uid = res._body;

        }, (err) => {
          this.isLoggingIn = false;
          reject("could not log in please try again...")
          console.log("could not log in please try again");
        })
    })

  }
}
