import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessSinglePage } from './oc-business-single';

@NgModule({
  declarations: [
    OcBusinessSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessSinglePage),
  ],
})
export class OcBusinessSinglePageModule {}
