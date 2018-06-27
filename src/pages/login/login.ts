import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from "../../providers/auth/auth"
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  constructor(public auth:AuthProvider, public navCtrl: NavController, public navParams: NavParams) {

  }
  login(){
    this.auth.isLoggingIn = true;
    //this method has to be synchronized or return login status;
    this.auth.login({username:"anilgr.agr@gmail.com",
    password:"anil5gr123"});
    console.log(this.auth.isLoggedIn);
  }
  openSignup(){
    this.navCtrl.push(SignupPage);
  }

}
