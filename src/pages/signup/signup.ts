import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContactsPage } from "../contacts/contacts";
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
//
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    let data ={
      username: this.username,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword
    };

  let options = new RequestOptions({ headers: headers });
    this.http.post(this.baseUrl+"/signup",JSON.stringify(data), options)
    .subscribe(res => {
      console.log("successfuly signed up:"+res);
      this.navCtrl.push(ContactsPage);
    }, (err) => {
      console.log("could not signup");
    })
  }
}
