import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientItemListPage } from './ca-client-item-list';

@NgModule({
  declarations: [
    CaClientItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientItemListPage),
  ],
})
export class CaClientItemListPageModule {}
