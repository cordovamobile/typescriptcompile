import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { Observable } from "rxjs";

/* Pages to be linked in the menu */
import { HomePage } from '../pages/home/home';
import { PostListPage } from '../pages/post-list/post-list';
import { PostListByCategoryPage } from '../pages/post-list-by-category/post-list-by-category';
import { PostSinglePage } from '../pages/post-single/post-single';
import { LoginPage } from '../pages/login/login';

/* Providers that store global variables */
import { ApplicationService } from '../providers/application-service';
import { Dataprovider } from '../providers/dataprovider';
import { UserDetailsSavePage } from '../pages/user-details-save/user-details-save';
import { CaDashboardPage } from '../pages/ca-dashboard/ca-dashboard';
import { OcDashboardPage } from '../pages/oc-dashboard/oc-dashboard';

import { CaClientDashboardPage } from '../pages/ca-client-dashboard/ca-client-dashboard';
import { OcBusinessDashboardPage } from '../pages/oc-business-dashboard/oc-business-dashboard';

@Component({
	templateUrl: 'app.html',
	providers: [ApplicationService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
	
	public logged_in: boolean;
	
	public components: any;

	constructor(
		public platform: Platform, 
		public statusBar: StatusBar, 
		public splashScreen: SplashScreen,
		
		public menuCtrl: MenuController,
		public events: Events,
		public applicationservice: ApplicationService,
		public dataprovider: Dataprovider
	) {
		this.initializeApp();
		
		
		/* Calling the login check function */
		this.applicationservice.logged_in_or_not();
		
		/* This is useless here as user might not been logged in yet */
		//this.applicationservice.get_clients_or_businesses();
		
		this.logged_in_or_not();
		
		
		
		/* SUBSCRIBING EVENT : For Login Logout */
		events.subscribe('set_logged_in', (logged_in) => {
			console.log('Event of MyAPP Class called.\nName of event: "set_logged_in"\nParameter passed: logged_in='+logged_in);
			this.logged_in = logged_in;
		});
		
		
		/* List of pages for menu */
		this.components = {
			HomePage : HomePage,
			PostListPage : PostListPage,
			PostListByCategoryPage : PostListByCategoryPage,
			LoginPage : LoginPage,
			UserDetailsSavePage : UserDetailsSavePage,
			CaDashboardPage : CaDashboardPage,
			OcDashboardPage : OcDashboardPage,
		};

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
	
	
	logged_in_or_not() {
		if (localStorage.getItem("userdata") !== null) {
			var userdata = JSON.parse( localStorage.getItem("userdata") )
			if( 
					typeof(userdata.logged_in) != "undefined" 
				&&	typeof(userdata.token) != "undefined" 
				&&	userdata.logged_in == true 
			) {
				this.logged_in = true;
				/* setTimeout(function(){ $j('.logged_out_menu_item').hide(); }, 500); */
			}
		} else {
				this.logged_in = false;
				/* setTimeout(function(){ $j('.logged_in_menu_item').hide(); }, 500); */
		}
	}
	
	
	
	logout() {
		localStorage.removeItem("userdata");
		//alert('You have been logged out successfully!');
		//this.navCtrl.push( LoginPage );
		this.nav.setRoot(LoginPage);
		
		this.logged_in = false;
	}
	

	openComponent(component) {
		//alert( component );
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		
		if( component == 'HomePage' ) {
			this.nav.setRoot(this.components[component]);
		} else {
			//this.nav.push(this.components[component]);
			this.nav.setRoot(this.components[component]);
		}
	}
	

	openPostListByCategory(id,name='') {
		localStorage.setItem('list_by_category_page_category',JSON.stringify({id:id,name:name}));
		this.nav.setRoot(PostListByCategoryPage);
	}
	
	
	openDashboard() {
		
		var redirect_page;
		
		var userdata = JSON.parse( localStorage.getItem("userdata") );
		
		
		if( typeof userdata.bu_type == 'undefined' ) { // If login_count does not exist
			redirect_page = UserDetailsSavePage;
		} else {
			if( userdata.bu_type == 'CA' ) {
				redirect_page = CaDashboardPage;
			} else if( userdata.bu_type == 'OC' ) {
				redirect_page = OcDashboardPage;
			}
		}
			
		this.nav.setRoot( redirect_page );
	}
	
	
	current_client_or_business_changed(c) {
		console.log( JSON.stringify(c) );
		
		var redirect_page;
		
		var userdata = JSON.parse( localStorage.getItem("userdata") );
		
		
		if( typeof userdata.bu_type == 'undefined' ) { // If login_count does not exist
			redirect_page = UserDetailsSavePage;
		} else {
			if( userdata.bu_type == 'CA' ) {
				redirect_page = CaClientDashboardPage;
			} else if( userdata.bu_type == 'OC' ) {
				redirect_page = OcBusinessDashboardPage;
			}
		}
		
		this.nav.setRoot( redirect_page , { "client" : c } );
		this.menuCtrl.close();
	}
	
	
	
	
}
