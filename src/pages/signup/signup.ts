import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContactsPage } from "../contacts/contacts";
import { LoginPage } from "../login/login";

import { AuthProvider } from "../../providers/auth/auth"
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
  constructor(public auth:AuthProvider , public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }
  signUp() {
    console.log("called signuppp")
    let data ={
      username: this.username,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword
    };

    this.auth.signUp(data).then(()=>{
      this.navCtrl.setRoot(LoginPage);
    });
  }
  list(){
    this.navCtrl.push(ContactsPage);
  }
}
