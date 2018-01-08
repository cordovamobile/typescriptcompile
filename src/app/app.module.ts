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
import { CaClientSinglePage } from '../pages/ca-client-single/ca-client-single';


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
		CaClientSinglePage,
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
		CaClientSinglePage,
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
