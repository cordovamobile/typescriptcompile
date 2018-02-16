import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientContactSinglePage } from './ca-client-contact-single';

@NgModule({
  declarations: [
    CaClientContactSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientContactSinglePage),
  ],
})
export class CaClientContactSinglePageModule {}
