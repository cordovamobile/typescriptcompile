
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { OcBusinessAddPage } from '../../pages/oc-business-add/oc-business-add';
import { OcBusinessDashboardPage } from '../../pages/oc-business-dashboard/oc-business-dashboard';
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
	selector: 'page-oc-dashboard',
	templateUrl: 'oc-dashboard.html',
})
export class OcDashboardPage {
	
	userdata: any;
	businesss: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		
		
		this.businesss = [];
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
		
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/api/getbusinessbyid/' + self.application_service.userdata.api_token, 
			{},
			'',
			true, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				if( response.status != 'failed' ) { // If success
					
					self.businesss = response;
					
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
		this.navCtrl.push( OcBusinessDashboardPage, { "business" : c } );
	}
	
	open_business_add_page(c) {
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
	
}
