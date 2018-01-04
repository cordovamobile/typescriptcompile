
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/**
 * Generated class for the UserDetailsSavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details-save',
  templateUrl: 'user-details-save.html',
})
export class UserDetailsSavePage {
	
	current_ui: string;
	ca_firm_details: any;
	tax_consultancy_details: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.current_ui = 'question';
		
		this.ca_firm_details = {};
		this.tax_consultancy_details = {};
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserDetailsSavePage');
	}
	
	change_ui(ui) {
		this.current_ui = ui;
	}
	
	save_details(business_type) {
		
		var user_details;
		var bu_type;
		
		if( business_type == 'CA Firm' ) {
			
			user_details = this.ca_firm_details;
			user_details.business_type = business_type;
			
			bu_type = 'CA';
			
		}
		
		if( business_type == 'Tax Consultancy' ) {
			
			user_details = this.tax_consultancy_details;
			user_details.business_type = business_type;
			
			bu_type = 'OC';
			
		}
		
		
		
		//alert('You have logged in successfully.');
		localStorage.setItem("user_details", JSON.stringify( user_details ));
		
		var userdata = JSON.parse(localStorage.getItem("userdata"));
		userdata.bu_type = bu_type;
		localStorage.setItem("userdata", JSON.stringify( userdata ));
		
		this.nav.setRoot( DashboardPage );
		
	}
	
	
	
}
