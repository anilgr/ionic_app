import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FcmServiceProvider } from '../../providers/fcm-service/fcm-service';
import { LoginPage } from "../login/login";
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the OverflowMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overflow-menu',
  templateUrl: 'overflow-menu.html',
})
export class OverflowMenuPage {

  constructor(private toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public app: App, public auth: AuthProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public fcmService:FcmServiceProvider,
    public navParams: NavParams) {

  }
  logout() {
    this.auth.logout().then(() => {
    this.app.getRootNav().setRoot(LoginPage)
    this.fcmService.unsubscribe();
    this.viewCtrl.dismiss();
    })
      .catch((err) => {
        this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }
  close() {

  }
}
