import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
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
  private baseUrl: string = "http://localhost:8081";
  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams) {
    this.list();
  }
  private list(){
    this.http.get(this.baseUrl + "/contacts")
      .subscribe(res => {
        let parsedContactList = JSON.parse(res._body);
        for(var key in parsedContactList){
          parsedContactList[key].uid = key;
          this.contacts.push(new User(key, parsedContactList[key].username, parsedContactList[key].email ));
          console.log("uid:"+key+"\nusername:"+parsedContactList[key].username+"\n\n");

        }
      }, (err) => {
        console.log("could not fetch contact list");
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
