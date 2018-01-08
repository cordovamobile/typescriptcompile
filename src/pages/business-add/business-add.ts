
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

//import { BusinessListPage } from '../../pages/business-list/business-list';
import { CaDashboardPage } from '../../pages/ca-dashboard/ca-dashboard';

/**
 * Generated class for the BusinessAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-add',
  templateUrl: 'business-add.html',
})
export class BusinessAddPage {
	
	business: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		this.business = {};
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BusinessAddPage');
	}
	
	save_business() {
		
		
		var userdata = JSON.parse( localStorage.getItem("userdata") );
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'post',
			'programming/hbgstapi/api/addbusiness',
			{
				business_name : self.business.business_name,
				pan : self.business.pan,
				primary_contact_person : self.business.primary_contact_person,
				primary_contact_personph : self.business.primary_contact_personph,
				bu_type : userdata.bu_type
			},
			'Saving businesses details...',
			false, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status == 'success' ) {
					
					
					self.nav.setRoot( CaDashboardPage );
					
					
				} else {
					/*
					self.login_form.email = '';
					self.login_form.password = '';
					self.login_form.view_password = false;
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					*/
				}
				
				

			}
		);
		
		
		
	}

}
