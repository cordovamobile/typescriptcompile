import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientGstinAddPage } from './ca-client-gstin-add';

@NgModule({
  declarations: [
    CaClientGstinAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientGstinAddPage),
  ],
})
export class CaClientGstinAddPageModule {}
