import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from "../../providers/auth/auth";
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';
import { ContactsPage } from "../contacts/contacts";
import { ToastController } from 'ionic-angular';
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
  constructor(private toastCtrl: ToastController, public popoverCtrl: PopoverController, public auth:AuthProvider, public navCtrl: NavController, public navParams: NavParams) {

  }


  login(){
    this.auth.isLoggingIn = true;
    //this method has to be synchronized or return login status;
    this.auth.login({username:"anilgr.agr@gmail.com",
    password:"anil5gr123"}).then(()=>{
      this.navCtrl.push(ContactsPage)
    }).catch((err)=>{
      this.toastCtrl.create({
        message:err,
        duration:3000,
        position:'bottom'
      }).present();
      this.username = "";
      this.password = "";
    });
    console.log(this.auth.isLoggedIn);
  }
  openSignup(){
    this.navCtrl.push(SignupPage);
  }

}
