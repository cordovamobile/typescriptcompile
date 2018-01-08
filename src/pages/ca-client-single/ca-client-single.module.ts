import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientSinglePage } from './ca-client-single';

@NgModule({
  declarations: [
    CaClientSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientSinglePage),
  ],
})
export class CaClientSinglePageModule {}
