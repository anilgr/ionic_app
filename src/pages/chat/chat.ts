import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatServiceProvider } from "../../providers/chat-service/chat-service"
import { AuthProvider } from "../../providers/auth/auth"
import { Utility } from "../../app/utility/utility"
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  messages: any[] = [];
  messageInput: string;
  constructor(public auth: AuthProvider, public chatService: ChatServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.chatService.getConversation(this.navParams.get("uid")).subscribe((messages) => {
      this.messages = messages;
      this.messages.forEach((msg)=>{
        msg.time = Utility.formatAMPM(new Date(msg.timestamp));
      })
      this.content.scrollToBottom(0);
    })


  }
  scrollToDown(delay) {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, delay);
  }

  sendMessage() {
    this.messages.push({
      message: this.messageInput,
      isLeft: false
    });
    this.scrollToDown(100);
    this.chatService.sendMessage({
      message: this.messageInput,
      recieverId: this.navParams.get("uid"),
      senderId: this.auth.currentUser.uid,
      timestamp: new Date().toString(),
    });
    this.messageInput = "";
  }
  ionViewDidLoad() {
    this.scrollToDown(800);
  }

}
