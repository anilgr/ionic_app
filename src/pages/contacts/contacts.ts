import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
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
  contacts = [];
  baseUrl: string = "http://localhost:8081";
  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams) {
    this.http.get(this.baseUrl + "/contacts")
      .subscribe(res => {
        let tempContacts = JSON.parse(res._body);
        for(var key in tempContacts){
          tempContacts[key].uid = key;
          this.contacts.push(tempContacts[key]);
          console.log("uid:"+key+"\nusername:"+tempContacts[key].username+"\n\n");
        }
      }, (err) => {
        console.log("could not fetch contact list");
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
