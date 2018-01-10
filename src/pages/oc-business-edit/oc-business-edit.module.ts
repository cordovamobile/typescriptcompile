import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessEditPage } from './oc-business-edit';

@NgModule({
  declarations: [
    OcBusinessEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessEditPage),
  ],
})
export class OcBusinessEditPageModule {}
