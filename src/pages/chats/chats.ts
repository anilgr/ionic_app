import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';
import { ContactsPage } from '../contacts/contacts'
import { ChatServiceProvider } from "../../providers/chat-service/chat-service"
import { ChatPage } from "../chat/chat";

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
  chats = []
  constructor(public chatService: ChatServiceProvider, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewWillEnter() {
    this.chatService.loadChatsList().then((chatz) => {
      this.chats = chatz;
    });
  }

  openChat(contact) {
    this.navCtrl.push(ChatPage, contact)
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(OverflowMenuPage);
    popover.present({
      ev: myEvent
    });
  }
  openContacts() {
    this.navCtrl.push(ContactsPage);
  }
}
