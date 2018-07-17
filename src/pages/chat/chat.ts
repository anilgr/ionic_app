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
  }
  ionViewWillEnter() {
      this.loadMessages();


  }
  ionViewDidLeave() {
    this.chatService.endKey[this.navParams.get("uid")] = undefined;
  }
  loadMessages(infiniteScroll) {
    this.chatService.getConversation(this.navParams.get("uid")).subscribe((list) => {
      console.log(list.length);
      if(infiniteScroll != undefined)
      {
        if(list.length == 1)
        {
          infiniteScroll.enable(false);
        }
        infiniteScroll.complete();
      }
      else{
        if(this.messages.length == 0)
        {
          this.chatService.isNewConversation = true;
        }
        else{
          this.chatService.isNewConversation = false;

        }
      }
      if(list[0])
      this.chatService.endKey[this.navParams.get("uid")] = list[0].id;
      list.forEach((msg) => {
        msg.time = Utility.formatAMPM(new Date(msg.timestamp));

      })
      list.pop()
      this.messages = list.concat(this.messages);

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
      isLeft: false,
      time: Utility.formatAMPM(new Date())

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
