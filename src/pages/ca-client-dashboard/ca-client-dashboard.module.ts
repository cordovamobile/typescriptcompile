import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientDashboardPage } from './ca-client-dashboard';

@NgModule({
  declarations: [
    CaClientDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientDashboardPage),
  ],
})
export class CaClientDashboardPageModule {}
