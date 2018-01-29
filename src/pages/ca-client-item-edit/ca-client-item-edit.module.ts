import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientItemEditPage } from './ca-client-item-edit';

@NgModule({
  declarations: [
    CaClientItemEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientItemEditPage),
  ],
})
export class CaClientItemEditPageModule {}
