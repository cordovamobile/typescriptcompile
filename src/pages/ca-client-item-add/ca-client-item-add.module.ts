import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientItemAddPage } from './ca-client-item-add';

@NgModule({
  declarations: [
    CaClientItemAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientItemAddPage),
  ],
})
export class CaClientItemAddPageModule {}
