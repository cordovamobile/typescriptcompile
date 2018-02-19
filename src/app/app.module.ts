/* Angular Components */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

/* App Compoent */
import { MyApp } from './app.component';


/* Pages */
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserDetailsSavePage } from '../pages/user-details-save/user-details-save';

import { CaDashboardPage } from '../pages/ca-dashboard/ca-dashboard';
import { CaClientAddPage } from '../pages/ca-client-add/ca-client-add';
import { CaClientDashboardPage } from '../pages/ca-client-dashboard/ca-client-dashboard';
import { CaClientEditPage } from '../pages/ca-client-edit/ca-client-edit';
import { CaClientGstinAddPage } from '../pages/ca-client-gstin-add/ca-client-gstin-add';
import { CaClientGstinListPage } from '../pages/ca-client-gstin-list/ca-client-gstin-list';
import { CaClientGstinEditPage } from '../pages/ca-client-gstin-edit/ca-client-gstin-edit';
import { CaClientItemAddPage } from '../pages/ca-client-item-add/ca-client-item-add';
import { CaClientItemListPage } from '../pages/ca-client-item-list/ca-client-item-list';
import { CaClientItemEditPage } from '../pages/ca-client-item-edit/ca-client-item-edit';
import { CaClientContactAddPage } from '../pages/ca-client-contact-add/ca-client-contact-add';
import { CaClientContactListPage } from '../pages/ca-client-contact-list/ca-client-contact-list';
import { CaClientContactEditPage } from '../pages/ca-client-contact-edit/ca-client-contact-edit';
import { CaClientSaleinvoiceAddPage } from '../pages/ca-client-saleinvoice-add/ca-client-saleinvoice-add';
import { CaClientSaleinvoiceListPage } from '../pages/ca-client-saleinvoice-list/ca-client-saleinvoice-list';
import { CaClientSaleinvoiceEditPage } from '../pages/ca-client-saleinvoice-edit/ca-client-saleinvoice-edit';

import { OcDashboardPage } from '../pages/oc-dashboard/oc-dashboard';
import { OcBusinessAddPage } from '../pages/oc-business-add/oc-business-add';
import { OcBusinessDashboardPage } from '../pages/oc-business-dashboard/oc-business-dashboard';
import { OcBusinessEditPage } from '../pages/oc-business-edit/oc-business-edit';
import { OcBusinessGstinAddPage } from '../pages/oc-business-gstin-add/oc-business-gstin-add';
import { OcBusinessGstinListPage } from '../pages/oc-business-gstin-list/oc-business-gstin-list';
import { OcBusinessGstinEditPage } from '../pages/oc-business-gstin-edit/oc-business-gstin-edit';
import { OcBusinessItemAddPage } from '../pages/oc-business-item-add/oc-business-item-add';
import { OcBusinessItemListPage } from '../pages/oc-business-item-list/oc-business-item-list';
import { OcBusinessItemEditPage } from '../pages/oc-business-item-edit/oc-business-item-edit';


/* Providers */
//import { ApplicationService } from '../providers/application-service';
import { Dataprovider } from '../providers/dataprovider';
import { ApplicationService } from '../providers/application-service';

/* Angular Modules */
import { HttpModule } from '@angular/http';

/* Ionic Native Plugins */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		UserDetailsSavePage,
		
		CaDashboardPage,
		CaClientAddPage,
		CaClientDashboardPage,
		CaClientEditPage,
		CaClientGstinAddPage,
		CaClientGstinListPage,
		CaClientGstinEditPage,
		CaClientItemAddPage,
		CaClientItemListPage,
		CaClientItemEditPage,
		CaClientContactAddPage,
		CaClientContactListPage,
		CaClientContactEditPage,
		CaClientSaleinvoiceAddPage,
		CaClientSaleinvoiceListPage,
		CaClientSaleinvoiceEditPage,
		
		OcDashboardPage,
		OcBusinessAddPage,
		OcBusinessDashboardPage,
		OcBusinessEditPage,
		OcBusinessGstinAddPage,
		OcBusinessGstinListPage,
		OcBusinessGstinEditPage,
		OcBusinessItemAddPage,
		OcBusinessItemListPage,
		OcBusinessItemEditPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpModule,
	],
	bootstrap: [
		IonicApp,
	],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		UserDetailsSavePage,
		
		CaDashboardPage,
		CaClientAddPage,
		CaClientDashboardPage,
		CaClientEditPage,
		CaClientGstinAddPage,
		CaClientGstinListPage,
		CaClientGstinEditPage,
		CaClientItemAddPage,
		CaClientItemListPage,
		CaClientItemEditPage,
		CaClientContactAddPage,
		CaClientContactListPage,
		CaClientContactEditPage,
		CaClientSaleinvoiceAddPage,
		CaClientSaleinvoiceListPage,
		CaClientSaleinvoiceEditPage,
		
		OcDashboardPage,
		OcBusinessAddPage,
		OcBusinessDashboardPage,
		OcBusinessEditPage,
		OcBusinessGstinAddPage,
		OcBusinessGstinListPage,
		OcBusinessGstinEditPage,
		OcBusinessItemAddPage,
		OcBusinessItemListPage,
		OcBusinessItemEditPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler,
		},
		Dataprovider,
		ApplicationService,
	]
})
export class AppModule {}
