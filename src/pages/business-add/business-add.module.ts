import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessAddPage } from './business-add';

@NgModule({
  declarations: [
    BusinessAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessAddPage),
  ],
})
export class BusinessAddPageModule {}
