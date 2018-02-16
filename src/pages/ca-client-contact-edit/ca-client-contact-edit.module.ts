import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientContactEditPage } from './ca-client-contact-edit';

@NgModule({
  declarations: [
    CaClientContactEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientContactEditPage),
  ],
})
export class CaClientContactEditPageModule {}
