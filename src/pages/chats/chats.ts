import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';
import { ContactsPage } from '../contacts/contacts'
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats=[
    {username:"dummychat"},
    {username:"dummychat"},
    {username:"dummychat"}
  ]
  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  presentPopover(myEvent) {
   let popover = this.popoverCtrl.create(OverflowMenuPage);
   popover.present({
     ev: myEvent
   });
  }
  openContacts(){
    this.navCtrl.push(ContactsPage);
  }
}
