
import { Component } from '@angular/core';
import { Nav, LoadingController, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { LoginPage } from '../../pages/login/login';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';
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

}
