import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessAddPage } from './oc-business-add';

@NgModule({
  declarations: [
    OcBusinessAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessAddPage),
  ],
})
export class OcBusinessAddPageModule {}
