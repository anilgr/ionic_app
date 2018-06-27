import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContactsPage } from "../contacts/contacts";
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
  constructor(public authProvider:AuthProvider , public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    console.log("called signuppp")
    let data ={
      // username: this.username,
      // password: this.password,
      // email: this.email,
      // confirmPassword: this.confirmPassword
      username:"raj",
      password: "123456",
      email: "anilgr.agr@gmail.com",
      confirmPassword: "123456"
    };

    this.authProvider.signUp(data);
  }
  list(){
    this.navCtrl.push(ContactsPage);
  }
}
