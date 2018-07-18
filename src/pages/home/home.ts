import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsPage } from "../contacts/contacts";
import { PopoverController } from 'ionic-angular';
import { OverflowMenuPage } from '../overflow-menu/overflow-menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root:any = ContactsPage;
  tab2Root:any = ContactsPage;
  tab3Root:any = ContactsPage;
  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController) {

  }
ionViewDidLoad(){
  console.log("dflsdkjfldsk")
}
presentPopover(myEvent) {
 let popover = this.popoverCtrl.create(OverflowMenuPage);
 popover.present({
   ev: myEvent
 });
}
}
