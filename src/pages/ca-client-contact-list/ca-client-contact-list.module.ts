import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientContactListPage } from './ca-client-contact-list';

@NgModule({
  declarations: [
    CaClientContactListPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientContactListPage),
  ],
})
export class CaClientContactListPageModule {}
