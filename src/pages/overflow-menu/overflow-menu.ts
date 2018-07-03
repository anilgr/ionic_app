import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../login/login";

/**
 * Generated class for the OverflowMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overflow-menu',
  templateUrl: 'overflow-menu.html',
})
export class OverflowMenuPage {

  constructor(public app:App,public auth:AuthProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }
  logout(){
    this.auth.logout().then(()=>{
    this.app.getRootNav().setRoot(LoginPage)
    this.viewCtrl.dismiss();
    });
  }
  close(){

  }
}
