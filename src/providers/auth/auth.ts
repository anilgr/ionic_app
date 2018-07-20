import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/model";
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthProvider {
  public bearerToken;
  public refreshhToken;
  public isLoggingIn = false;
  public isSigningUp = false;
  public loggedIn = false;
  public currentUser: User = {};
  private baseUrl: string = "http://localhost:8081";
  constructor(public http: HttpClient, private storage: Storage) {
    storage.get('access_token').then((val) => {
      this.loggedIn = true;
      this.bearerToken = val;

    })
    storage.get('refresh_token').then((val) => { this.refreshhToken = val; })
    storage.get('token_issue_time').then((val) => { this.tokenIssueTime = new Date(val); })
    storage.get('user_id').then((val) => { this.currentUser.uid = val; })
  }

  public async refreshToken() {
    let headers = new HttpHeaders();
    var token = this.getRefreshToken()
    let options = {
      headers: headers.set('refresh_token', token)
    }
    try {
      let res = await this.http.get(this.baseUrl + "/refresh_token", options).toPromise();

      this.storage.set('access_token', res.access_token);
      this.storage.set('refresh_token', res.refresh_token);
      this.storage.set('token_issue_time', res.issued_at);

      this.bearerToken = res.access_token;
      this.tokenIssueTime = new Date();
      console.log("token refreshed");
    }
    catch (err) {
      console.log("error refreshing token");
    }

  }
  getRefreshToken() {
    return this.refreshhToken;
  }
  getAccessToken() {
    return this.bearerToken;
  }
  async checkAccessToken() {
    let diffMillis = (new Date()) - this.tokenIssueTime;
    let diffMin = Math.floor((diffMillis / 1000) / 60)
    if (diffMin > 1) {
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
      let options = {
        observe: 'response',
        responseType: 'text',
      };
      this.http.post(this.baseUrl + "/auth/logout", {}, options)
        .subscribe(res => {
          this.storage.remove('access_token');
          this.storage.remove('refresh_token');
          this.storage.remove('token_issue_time');
          this.storage.remove('user_id');
          resolve();
        }, err => {
          console.log("could not logout, error occured:" + err.message);
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
          this.bearerToken = data.access_token;
          this.refreshhToken = data.refresh_token;
          this.tokenIssueTime = new Date();
          this.isLoggingIn = false;
          this.loggedIn = true;
          this.currentUser.uid = data.uid;
          this.storage.set('access_token', data.access_token);
          this.storage.set('refresh_token', data.refresh_token);
          this.storage.set('token_issue_time', this.tokenIssueTime);
          this.storage.set('user_id', data.uid);
          resolve();
        }, (err) => {
          this.isLoggingIn = false;
          reject("could not log in please try again...")
          console.log("could not log in please try again");
        })
    })

  }
}
