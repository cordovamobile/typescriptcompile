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
import { OcDashboardPage } from '../pages/oc-dashboard/oc-dashboard';
import { CaClientAddPage } from '../pages/ca-client-add/ca-client-add';
import { CaClientDashboardPage } from '../pages/ca-client-dashboard/ca-client-dashboard';
import { CaClientEditPage } from '../pages/ca-client-edit/ca-client-edit';
import { OcBusinessAddPage } from '../pages/oc-business-add/oc-business-add';
import { OcBusinessDashboardPage } from '../pages/oc-business-dashboard/oc-business-dashboard';
import { OcBusinessEditPage } from '../pages/oc-business-edit/oc-business-edit';


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
		OcDashboardPage,
		CaClientAddPage,
		CaClientDashboardPage,
		CaClientEditPage,
		OcBusinessAddPage,
		OcBusinessDashboardPage,
		OcBusinessEditPage,
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
		OcDashboardPage,
		CaClientAddPage,
		CaClientDashboardPage,
		CaClientEditPage,
		OcBusinessAddPage,
		OcBusinessDashboardPage,
		OcBusinessEditPage,
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
