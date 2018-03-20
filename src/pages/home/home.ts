
import { Component } from '@angular/core';
import { Nav, LoadingController, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { LoginPage } from '../../pages/login/login';
import { UserDetailsSavePage } from '../../pages/user-details-save/user-details-save';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';
import { OcDashboardPage } from '../../pages/oc-dashboard/oc-dashboard';
import { PostListByCategoryPage } from '../../pages/post-list-by-category/post-list-by-category';
import { HbUniversityPage } from '../../pages/hb-university/hb-university';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService,
		public loading: LoadingController
	) {
		
	}
	
	openPage(p) {
		
		var redirect = {};
		var parameters = {};
		if( p == 'CaDashboardPage' ) {
			if( this.application_service.logged_in_or_not() ) {
				redirect = CaDashboardPage;
			} else {
				redirect = LoginPage;
			}
		}
		if( p == 'NewsPage' ) {
			redirect = PostListByCategoryPage;
			parameters = {id:70,name:'News'};
			localStorage.setItem('list_by_category_page_category',JSON.stringify({id:70,name:'News'}));
		}
		if( p == 'HbUniversityPage' ) {
			redirect = HbUniversityPage;
			parameters = {};
		}
		
		if( redirect ) {
			this.nav.setRoot(redirect,parameters);
		}
		
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

}
