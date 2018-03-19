import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessContactEditPage } from './oc-business-contact-edit';

@NgModule({
  declarations: [
    OcBusinessContactEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessContactEditPage),
  ],
})
export class OcBusinessContactEditPageModule {}
