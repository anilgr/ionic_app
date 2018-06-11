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
  baseUrl: string = "http://localhost:8081";
  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams) {
    this.http.get(this.baseUrl + "/contacts")
      .subscribe(res => {
        for(var key in JSON.parse(res._body)){
          console.log("uid:"+key+"\nusername:"+JSON.parse(res._body)[key].username+"\n\n");
        }
      }, (err) => {
        console.log("could not fetch contact list");
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
