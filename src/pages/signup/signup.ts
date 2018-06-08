import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  baseUrl: string = "http://localhost:8081";
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    console.log(this.username + " " +
      this.password + " " +
      this.email + " " +
      this.confirmPassword);
    //log values in server
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    // headers.append('Accept', 'text / html, application / xhtml + xml, application / xml; q = 0.9,*/*;q=0.8');
    // headers.append("Access-Control-Allow-Origin","*")
    // headers.append('Accept-Language', 'en-us,en;q=0.5');
    // headers.append('Accept-Encoding', 'gzip,deflate');

    // headers.append('Accept-Charset', 'ISO-8859-1,utf-8;q=0.7,*;q=0.7');

    // Accept: text / html, application / xhtml + xml, application / xml; q = 0.9,*/*;q=0.8
    // Accept-Language: en-us,en;q=0.5
    // Accept-Encoding: gzip,deflate
   // Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    let data ={
      username: "this.username",
      password: "this.password",
      email: "this.email",
      confirmPassword: "this.confirmPassword"
    };
    // let options = new RequestOptions({ headers: headers });
    this.http.post(this.baseUrl+"/signup",JSON.stringify(data), headers)
    .subscribe(res => {
      console.log("successfuly signed up:"+res);
    }, (err) => {
      console.log("could not signup");
    })
  }
}
