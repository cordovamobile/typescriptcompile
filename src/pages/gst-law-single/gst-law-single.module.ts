import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GstLawSinglePage } from './gst-law-single';

@NgModule({
  declarations: [
    GstLawSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(GstLawSinglePage),
  ],
})
export class GstLawSinglePageModule {}
