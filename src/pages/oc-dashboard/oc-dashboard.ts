
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { OcBusinessAddPage } from '../../pages/oc-business-add/oc-business-add';
//import { OcBusinessDashboardPage } from '../../pages/oc-business-dashboard/oc-business-dashboard';
import { OcBusinessItemListPage } from '../../pages/oc-business-item-list/oc-business-item-list';
import { OcBusinessGstinAddPage } from '../../pages/oc-business-gstin-add/oc-business-gstin-add';
/*
import { BusinessAddPage } from '../../pages/business-add/business-add';
import { BusinessListPage } from '../../pages/business-list/business-list';
*/

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-ca-dashboard',
	templateUrl: 'ca-dashboard.html',
})
export class CaDashboardPage {
	
	business: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public applicationservice: ApplicationService
	) {
		
		
		
		this.business = [];
		/* 
		this.business_list = [
			{
				"buid": "48",
				"business_name": "uttam kumar singh",
				"pan": "DAOPK0909A",
				"email_address": "",
				"primary_contact_person": "uttam kumar",
				"primary_contact_personph": "9015954550",
				"bu_type": "CA"
			},
			{
				"buid": "55",
				"business_name": "Vipin Gupta",
				"pan": "QWEPG9887U",
				"email_address": "Vipin.kumar@kapspro.com",
				"primary_contact_person": "Vipin",
				"primary_contact_personph": "1234567898",
				"bu_type": "CA"
			},
			{
				"buid": "63",
				"business_name": "abc5",
				"pan": "bgapr",
				"email_address": null,
				"primary_contact_person": null,
				"primary_contact_personph": null,
				"bu_type": "oc"
			}
		];
		*/
		
		
		this.applicationservice.get_business_or_businesses();
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/trunk/api/getbusinessbyid/' + self.applicationservice.userdata.api_token, 
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status != 'failed' ) { // If success
					
					self.business = response;
					
				} else {
					
					let toast = self.toastCtrl.create({
						message:	response.message,
						duration:	10000,
						cssClass:	"toast-success"
					});
					toast.present();
					
				}
				
				

			}
		);
		
		
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
	}
	
	open_business_dashboard_page(c) {
		this.applicationservice.current_client_or_business_set(c);
		
		//this.nav.setRoot( OcBusinessDashboardPage , { "business" : c } );
		//this.nav.setRoot( OcBusinessItemListPage , { "business" : c } );
	}
	
	open_business_add_page() {
		this.nav.push(OcBusinessAddPage);
	}
	
	/*
	goto_business_add_page() {
		this.nav.push( BusinessAddPage );
	}
	
	goto_business_list_page() {
		this.nav.push( BusinessListPage );
	}
	*/
	
	openPage( page , business ) {
		var redirect;
		if( page == 'OcBusinessGstinAddPage' ) {
			redirect = OcBusinessGstinAddPage;
		}
		this.navCtrl.push( redirect, { "business" : business } );
	}
	
}
