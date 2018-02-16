import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientContactAddPage } from './ca-client-contact-add';

@NgModule({
  declarations: [
    CaClientContactAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientContactAddPage),
  ],
})
export class CaClientContactAddPageModule {}
