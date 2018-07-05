import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(public http: HttpClient, private storage: Storage) {
  }

  public signUp(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      let options = { headers: headers };
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

      let options = {
        observe: 'response',
        responseType: 'text',
      };
      this.http.post(this.baseUrl + "/auth/logout",{}, options)
        .subscribe(res => {
          console.log(res.body);
          this.storage.remove('access_token');
          resolve();
        }, err => {
          console.log("could not logout: error occured:" + err.message);
          reject();
        })
    })
  }
  public login(data) {
    return new Promise((resolve, reject) => {
      let options = {
        observe: 'response',
      };
      this.http.post(this.baseUrl + "/auth/login", data, options)
        .subscribe(res => {
          let data = res.body;
          console.log(data.access_token);
          this.bearerToken = data.access_token;
          this.storage.set('access_token', data.access_token);
          console.log("successfuly logged in:" + res);
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
