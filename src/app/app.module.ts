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
import { DashboardPage } from '../pages/dashboard/dashboard';
import { BusinessAddPage } from '../pages/business-add/business-add';
import { BusinessListPage } from '../pages/business-list/business-list';


/* Providers */
//import { ApplicationService } from '../providers/application-service';
import { Dataprovider } from '../providers/dataprovider';

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
		DashboardPage,
		BusinessAddPage,
		BusinessListPage,
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
		DashboardPage,
		BusinessAddPage,
		BusinessListPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler,
		},
		Dataprovider,
	]
})
export class AppModule {}
