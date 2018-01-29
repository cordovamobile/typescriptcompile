import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessItemAddPage } from './oc-business-item-add';

@NgModule({
  declarations: [
    OcBusinessItemAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessItemAddPage),
  ],
})
export class OcBusinessItemAddPageModule {}
