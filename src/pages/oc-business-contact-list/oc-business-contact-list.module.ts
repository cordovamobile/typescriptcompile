import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessContactListPage } from './oc-business-contact-list';

@NgModule({
  declarations: [
    OcBusinessContactListPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessContactListPage),
  ],
})
export class OcBusinessContactListPageModule {}
