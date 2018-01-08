import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientAddPage } from './ca-client-add';

@NgModule({
  declarations: [
    CaClientAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientAddPage),
  ],
})
export class CaClientAddPageModule {}
