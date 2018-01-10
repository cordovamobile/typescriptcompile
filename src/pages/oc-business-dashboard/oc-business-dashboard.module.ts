import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcBusinessDashboardPage } from './oc-business-dashboard';

@NgModule({
  declarations: [
    OcBusinessDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(OcBusinessDashboardPage),
  ],
})
export class OcBusinessDashboardPageModule {}
