import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatServiceProvider } from "../../providers/chat-service/chat-service"
import { AuthProvider } from "../../providers/auth/auth"
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages: any[] = [];
  messageInput: string;
  constructor(public auth: AuthProvider, public chatService: ChatServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
   this.chatService.getConversation(this.navParams.get("uid")).subscribe((messages)=>{this.messages = messages})

  }
  sendMessage() {
    this.messages.push({message:this.messageInput,
    isLeft:false});

    this.chatService.sendMessage({
      message: this.messageInput,
      recieverId: this.navParams.get("uid"),
      senderId: this.auth.currentUser.uid,
      timestamp: new Date().toString(),
    });
    this.messageInput = "";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
