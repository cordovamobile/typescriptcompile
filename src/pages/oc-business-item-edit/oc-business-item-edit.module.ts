import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessItemEditPage } from './oc-business-item-edit';

@NgModule({
  declarations: [
    OcBusinessItemEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessItemEditPage),
  ],
})
export class OcBusinessItemEditPageModule {}
