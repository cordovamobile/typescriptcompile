import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientEditPage } from './ca-client-edit';

@NgModule({
  declarations: [
    CaClientEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientEditPage),
  ],
})
export class CaClientEditPageModule {}
