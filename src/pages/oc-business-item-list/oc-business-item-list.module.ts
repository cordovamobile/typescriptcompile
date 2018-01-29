import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessItemListPage } from './oc-business-item-list';

@NgModule({
  declarations: [
    OcBusinessItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessItemListPage),
  ],
})
export class OcBusinessItemListPageModule {}
