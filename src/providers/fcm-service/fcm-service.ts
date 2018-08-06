import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { AuthProvider } from "../../providers/auth/auth";

/*
  Generated class for the FcmServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmServiceProvider {
  private baseUrl: string = "http://10.0.2.2:8081";
  public token;

  constructor(public fcm: FCM,
    public http: HttpClient,
    public auth: AuthProvider,
  ) {
     this.fcm.getToken().then((token) => {
      this.token = token;
    })
  }
  init() {
    this.fcm.getToken().then((token) => {
      this.registerFCMToken(token)
    })
      .catch(err => {
        console.log(err)
      })
    this.fcm.onTokenRefresh().subscribe((token) => {
      this.registerFCMToken(token)
    });
  }
  getToken() {
    return this.token;
  }
  onNotification() {
    return this.fcm.onNotification();
  }
  registerFCMToken(token) {
    console.log("fcm token:" + token);
    this.http.post(this.baseUrl + "/fcm", {
      userID: this.auth.currentUser.uid,
      token: token
    })
      .subscribe((res) => {
        console.log("fcm token sent to server")
      }, (err) => {
        console.log("error sending token to the server")
      })
  }
  unsubscribe(){
    console.log("unsubscribe from notifications")
    this.http.post(this.baseUrl+"/fcm/unsubscribe",{
        userID: this.auth.currentUser.uid,
        token: this.token
      }
     )
     .subscribe((res) => {
       console.log("unsubscribed")
     }, (err) => {
       console.log("error unsubscribing")
     })
  }
}
