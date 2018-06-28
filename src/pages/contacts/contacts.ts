import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../app/model/user";
import { AuthProvider } from "../../providers/auth/auth"
import { ChatServiceProvider } from "../../providers/chat-service/chat-service"
import { ChatPage } from "../chat/chat";
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';

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
  constructor(public popoverCtrl: PopoverController, public chatService:ChatServiceProvider, public authProvider:AuthProvider, public http:Http, public navCtrl:NavController, public navParams:NavParams) {
    chatService.getUsers().subscribe((users)=>{
      this.contacts = users;
    });

  }
  presentPopover(myEvent) {
   let popover = this.popoverCtrl.create(OverflowMenuPage);
   popover.present({
     ev: myEvent
   });
 }
  openChat(contact){
    console.log(contact);
    this.navCtrl.push(ChatPage,contact);
  }
}
