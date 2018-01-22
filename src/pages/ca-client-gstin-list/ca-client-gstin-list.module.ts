import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientGstinListPage } from './ca-client-gstin-list';

@NgModule({
  declarations: [
    CaClientGstinListPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientGstinListPage),
  ],
})
export class CaClientGstinListPageModule {}
