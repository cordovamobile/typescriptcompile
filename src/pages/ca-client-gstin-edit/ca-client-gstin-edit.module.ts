import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientGstinEditPage } from './ca-client-gstin-edit';

@NgModule({
  declarations: [
    CaClientGstinEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientGstinEditPage),
  ],
})
export class CaClientGstinEditPageModule {}
