import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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

  constructor(public auth:AuthProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }
  close(){
    this.viewCtrl.dismiss();
  }
}
