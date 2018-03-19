import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessContactAddPage } from './oc-business-contact-add';

@NgModule({
  declarations: [
    OcBusinessContactAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessContactAddPage),
  ],
})
export class OcBusinessContactAddPageModule {}
