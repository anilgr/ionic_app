import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
import { AuthProvider } from "../../providers/auth/auth"
/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  private contacts:User[] = [];
  constructor(public authProvider:AuthProvider, public http:Http, public navCtrl:NavController, public navParams:NavParams) {
    authProvider.getUsers();
    this.contacts = authProvider.users;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
