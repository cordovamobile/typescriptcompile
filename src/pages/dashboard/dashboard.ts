
import { Component } from '@angular/core';
import { Nav, /*IonicPage,*/ NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';

import { Dataprovider } from '../../providers/dataprovider';
import { ApplicationService } from '../../providers/application-service';

import { BusinessAddPage } from '../../pages/business-add/business-add';
import { BusinessListPage } from '../../pages/business-list/business-list';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-dashboard',
	templateUrl: 'dashboard.html',
})
export class DashboardPage {
	
	business_list: any;
	busiess_or_client: string;
	busiess_or_client_plural: string;
	name: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public dataprovider: Dataprovider,			
		public toastCtrl: ToastController,
		public alertCtrl: AlertController ,
		public nav: Nav,
		public application_service: ApplicationService
	) {
		
		
		var userdata = JSON.parse(localStorage.getItem("userdata"));
		if( userdata.bu_type == 'CA' ) {
			this.busiess_or_client = 'Client';
			this.busiess_or_client_plural = 'Clients';
		} else {
			this.busiess_or_client = 'Business';
			this.busiess_or_client_plural = 'Businesses';
		}
		this.name = userdata.full_name;
		
		
		
		
		this.business_list = [];
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
		
		
		var userdata = JSON.parse( localStorage.getItem("userdata") );
		var user_id = userdata.api_token;
		
		
		
		var self = this;

		console.log('requestAPI being called...');
		self.dataprovider.requestAPI(
			'get',
			'programming/hbgstapi/api/getbusinesslist/' + user_id, 
			{},
			'Getting businesses list...',
			false, /* Token To Not Be Sent To API */
			
			function(response) {
				
				/* Logging 'Request Has Responded' event */
				console.log( 'requestAPI responded...' );
				console.log( 'requestAPI Response: "' + JSON.stringify( response ) + '"' );
				console.log( 'requestAPI Response Type: ' + response.status );
				
				
				//if( response.status == 'success' ) {
					
					
					self.business_list = response;
					
					
					
					
				//} else {
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
				//}
				
				

			}
		);
		
		
		
		
		
		
		
		
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
	}
	
	goto_business_add_page() {
		this.nav.push( BusinessAddPage );
	}
	
	goto_business_list_page() {
		this.nav.push( BusinessListPage );
	}

}
