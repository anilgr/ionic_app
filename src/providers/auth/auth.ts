import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthProvider {
  public bearerToken;
  public refreshhToken;
  public isLoggingIn = false;
  public isSigningUp = false;
  public loggedIn = false;
  public currentUser = {};
  private baseUrl: string = "http://localhost:8081";
  constructor(public http: HttpClient, private storage: Storage) {
  }
  public async refreshToken() {
    let headers = new HttpHeaders();
    var token = this.getRefreshToken()
    let options = {

      headers: headers.set('refresh_token', token)
    }
    try {
      let res = await this.http.get(this.baseUrl + "/refresh_token", options).toPromise();

      this.storage.set("access_token", res.access_token);
      this.bearerToken = res.access_token;
      this.tokenIssueTime = new Date();
      console.log("token refreshed");
    }
    catch (err) {
      console.log("error refreshing token");
      console.log(err)

    }

  }
  getRefreshToken() {
    // return await this.storage.get('refresh_token');
    return this.refreshhToken;
  }
  getAccessToken() {
    return this.bearerToken;
  }
  async checkAccessToken() {
    let diffMillis = (new Date()) - this.tokenIssueTime;
    console.log(diffMillis)
    let diffMin = Math.floor((diffMillis / 1000) / 60)
    console.log("token time:" + diffMin)
    if (diffMin > 1) {
      console.log("refreshing token")
      await this.refreshToken();
    }
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
      this.http.post(this.baseUrl + "/auth/logout", {}, options)
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
          this.refreshhToken = data.refresh_token;
          this.tokenIssueTime = new Date();
          this.storage.set('access_token', data.access_token);
          this.storage.set('refresh_token', data.refresh_token);
          console.log("successfuly logged in:" + res);
          this.isLoggingIn = false;
          this.loggedIn = true;
          this.currentUser.uid = data.uid;
          console.log("accesstoken:" + data.access_token + "||" + "refreshToken:" + data.refresh_token)
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
