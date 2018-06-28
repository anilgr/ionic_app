import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverflowMenuPage } from './overflow-menu';

@NgModule({
  declarations: [
    OverflowMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(OverflowMenuPage),
  ],
})
export class OverflowMenuPageModule {}
