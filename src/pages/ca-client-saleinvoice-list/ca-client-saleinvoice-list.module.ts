import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaClientSaleinvoiceListPage } from './ca-client-saleinvoice-list';

@NgModule({
  declarations: [
    CaClientSaleinvoiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(CaClientSaleinvoiceListPage),
  ],
})
export class CaClientSaleinvoiceListPageModule {}
