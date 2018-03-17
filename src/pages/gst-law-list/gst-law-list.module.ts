import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GstLawListPage } from './gst-law-list';

@NgModule({
  declarations: [
    GstLawListPage,
  ],
  imports: [
    IonicPageModule.forChild(GstLawListPage),
  ],
})
export class GstLawListPageModule {}
